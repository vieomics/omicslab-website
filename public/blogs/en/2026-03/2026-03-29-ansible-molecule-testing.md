---
slug: hpc-ansible-molecule-playbook-testing
title: "Testing Ansible playbooks for HPC with Molecule: from manual Vagrant to CI/CD"
description: "How to move an HPC Ansible playbook test workflow from manual Vagrant runs to Molecule with Docker, and then to GitHub Actions CI/CD, using a Slurm cluster build as the example."
authors: [vieomics]
tags: [hpc, ansible, slurm, testing, molecule, ci-cd, docker]
image: ./imgs/hpc-ansible-molecule-playbook-testing.png
---

Testing Ansible playbooks for HPC clusters is not straightforward. A manual approach using Vagrant works, but debugging issues across controller and worker nodes takes time on every iteration. Molecule offers a repeatable, automated framework that validates a playbook's configuration before deployment. This post describes how we moved from manual Vagrant testing to Molecule, and then into GitHub Actions CI/CD, using a Slurm cluster build as the example.

<!--truncate-->

## 1. The testing challenge: manual Vagrant vs. Molecule

### 1.1. Manual testing with Vagrant

When an HPC Ansible playbook is first developed—say, for a Slurm cluster—one option is to test it by hand:

```bash
# Create local VMs and deploy cluster
bash scripts/setup.sh 24.04 true
vagrant up

# SSH to controller
vagrant ssh controller-01

# Check if services are running
sinfo  # SLURM info
scontrol show nodes

# SSH to worker
vagrant ssh worker-01

# Destroy when done
vagrant destroy -f
```

**Problems with this approach:**
- Slow feedback loop (VMs take 5-10 minutes to boot, playbook takes 20+ minutes to run)
- Manual verification of state (did the service start? is the config correct?)
- Hard to catch regressions when the playbook is modified
- Not reproducible across team members or CI/CD systems

### 1.2. Molecule testing

Molecule automates much of the test lifecycle using **Docker containers** instead of full VMs:

```bash
# Single command runs the full test
molecule test

# Automatically:
# 1. Spins up Docker containers (controller-01, worker-01)
# 2. Installs dependencies (ansible-galaxy)
# 3. Converges the playbook (runs Ansible)
# 4. Verifies state (checks config, services, job execution)
# 5. Cleans up containers
```

**Benefits we observed:**
- Faster feedback: less than 10 minutes instead of 30+ minutes
- Automated verification of critical system state
- Regressions are caught in pull requests before merging
- Integrates with GitHub Actions
- Reproducible across environments (Docker behaves the same on different machines)

---

## 2. Setting up Molecule for HPC Ansible playbooks

### 2.1. Molecule configuration structure

For the river-slurm project, the directory layout is as follows:

```
river-slurm/
├── molecule/
│   └── default/
│       ├── molecule.yml      # Test configuration
│       ├── converge.yml      # Ansible playbook to apply
│       └── verify.yml        # Post-convergence verification
├── roles/
│   ├── slurm-common/         # SLURM setup shared by all nodes
│   ├── slurm-master/         # SLURM controller specific
│   ├── slurm-worker/         # SLURM worker specific
│   └── account/              # User account management
├── Makefile
├── pixi.toml                 # Python/tool dependencies
└── .github/
    └── workflows/
        └── e2e.yaml          # GitHub Actions trigger
```

### 2.2. The Molecule configuration: `molecule.yml`

This file defines the test infrastructure—which containers to create, how to configure them, and the test sequence:

```yaml
---
driver:
    name: docker

platforms:
    - name: controller-01
      image: geerlingguy/docker-ubuntu2404-ansible:latest
      command: /lib/systemd/systemd
      privileged: true
      volumes:
          - /sys/fs/cgroup:/sys/fs/cgroup:rw
      networks:
          - name: slurm-net
      groups:
          - slurm_master
          - slurm

    - name: worker-01
      image: geerlingguy/docker-ubuntu2404-ansible:latest
      command: /lib/systemd/systemd
      privileged: true
      volumes:
          - /sys/fs/cgroup:/sys/fs/cgroup:rw
      networks:
          - name: slurm-net
      groups:
          - slurm_worker
          - slurm

provisioner:
    name: ansible
    playbooks:
        converge: converge.yml
        verify: verify.yml
    env:
        ANSIBLE_ROLES_PATH: "${MOLECULE_PROJECT_DIRECTORY}/roles"

scenario:
    test_sequence:
        - dependency    # Install Galaxy roles
        - create        # Spin up Docker containers
        - prepare       # Setup (skipped if no playbook)
        - converge      # Run Ansible playbook
        - verify        # Run verification checks
        - destroy       # Clean up containers
```

**Key points:**
- **Driver**: uses Docker instead of VMs, which is faster
- **Platforms**: defines two nodes (controller and worker) with networking
- **Provisioner**: Ansible applies the playbook and runs verification
- **Test sequence**: orchestrates the full lifecycle

### 2.3. The convergence playbook: `converge.yml`

This playbook runs the Ansible roles on the test containers. It mirrors the production deployment but leaves out external dependencies:

```yaml
---
# Molecule converge — runs the Slurm-relevant plays only.
# Roles that require external infrastructure (Docker daemon, NVIDIA GPU,
# NFS mounts between real VMs) are excluded so the test stays self-contained.

- name: All nodes
  hosts: all
  become: true
  become_user: root
  roles:
    - slurm-common

- name: Controller
  hosts: slurm_master
  become: true
  become_user: root
  roles:
    - slurm-master

- name: Worker
  hosts: slurm_worker
  become: true
  become_user: root
  roles:
    - slurm-worker

- name: All nodes
  hosts: all
  become: true
  become_user: root
  roles:
    - account
```

### 2.4. The verification playbook: `verify.yml`

After converge, this playbook **checks critical system state**. It covers:

**On the controller:**
- `slurm.conf` and `slurmdbd.conf` exist
- SLURM binaries (`slurmctld`, `slurmdbd`) are installed
- MUNGE key permissions are correct
- The test user can SSH without a live job (PAM setup)
- `sinfo` returns cluster info
- A test job can be submitted and completes successfully

**On the worker:**
- `slurm.conf` exists
- `slurmd` binary is installed
- MUNGE key is synchronized
- Test user account exists
- The job result file was created (evidence the job ran on this worker)

Example verification tasks:

```yaml
# ── Controller verification ────────────────────────────────────────────────
- name: Verify slurm-master (controller-01)
  hosts: slurm_master
  become: true
  tasks:
      - name: Check slurm.conf exists
        stat:
            path: /etc/slurm/slurm.conf
        register: slurm_conf
      - name: Assert slurm.conf is present
        assert:
            that: slurm_conf.stat.exists
            fail_msg: "/etc/slurm/slurm.conf not found"

      - name: Check slurmctld binary exists
        stat:
            path: /usr/local/sbin/slurmctld
        register: slurmctld_bin
      - name: Assert slurmctld binary is installed
        assert:
            that: slurmctld_bin.stat.exists
            fail_msg: "slurmctld binary not found"

      # Submit a test job as testuser
      - name: Write job script
        copy:
            dest: /home/testuser/job.sh
            content: |
                #!/bin/bash
                #SBATCH --job-name=mol-test
                #SBATCH --output=/home/testuser/scratch/slurm-%j.out
                touch /home/testuser/scratch/job_result.txt

      - name: Submit job as testuser
        command: /usr/local/bin/sbatch /home/testuser/job.sh
        become_user: testuser
        register: sbatch_out

      # Poll until job completes
      - name: Poll squeue until job completes (max 120 s)
        command: /usr/local/bin/squeue --job {{ slurm_job_id }} --noheader
        until: squeue_poll.stdout | trim == ""
        retries: 24
        delay: 5
```

---

## 3. Running Molecule locally

### 3.1. Installation with Pixi

The river-slurm project uses **Pixi** to manage dependencies reproducibly:

```bash
# pixi.toml defines Python, Ansible, Molecule, Docker
[dependencies]
python = "==3.11"

[pypi-dependencies]
ansible = ">=6.7.0"
molecule = ">=6.0.0"
molecule-docker = ">=2.1.0"
docker = ">=7.0.0"
```

Install and verify:

```bash
# Install Python tools via Pixi
pixi install

# Verify Molecule is available
pixi run molecule --version
```

### 3.2. Running the full test locally

```bash
# Install Ansible Galaxy roles (roles from community)
make install

# Run the full Molecule test
make test
```

**Output excerpt (an actual run):**

```
INFO    default ➜ discovery: scenario test matrix: dependency, create, prepare, converge, verify, destroy
INFO    default ➜ prerun: Performing prerun with role_name_check=0...
INFO    default ➜ dependency: Executing
Starting galaxy role install process
- robertdebock.java (4.2.0) is already installed, skipping.
- gantsign.golang (2.10.2) is already installed, skipping.
- geerlingguy.docker (7.1.0) is already installed, skipping.
- nvidia.nvidia_driver (v2.3.0) is already installed, skipping.
INFO    default ➜ dependency: Dependency completed successfully.
INFO    default ➜ create: Executing
INFO    default ➜ create: Executed: Skipped (Skipping, instances already created.)
INFO    default ➜ prepare: Executing
INFO    default ➜ prepare: Executed: Missing playbook (Remove from test_sequence to suppress)
INFO    default ➜ converge: Executing
INFO    default ➜ converge: Sanity checks: 'docker'

PLAY [All nodes] ***************************************************************

TASK [Gathering Facts] *********************************************************
ok: [controller-01]
ok: [worker-01]

TASK [slurm-common : Update apt cache] *****************************************
changed: [worker-01]
changed: [controller-01]

TASK [slurm-common : Install Slurm dependencies] *******************************
ok: [worker-01] => (item=build-essential)
ok: [controller-01] => (item=build-essential)
...
changed: [controller-01] => (item=libpam0g-dev)
changed: [worker-01] => (item=libdbus-1-dev)
changed: [controller-01] => (item=libev-dev)
changed: [worker-01] => (item=libevent-dev)
...
```

This shows the **dependency** phase installing Galaxy roles, then **converge** applying the playbook across both nodes. Tasks report a status (`ok`, `changed`, `failed`), which indicates idempotency.

---

## 4. Why Molecule replaces manual testing

Molecule's automation and repeatability address the main weaknesses of the manual Vagrant workflow:

| Aspect | Manual Vagrant | Molecule |
|--------|---|---|
| **Speed** | 30+ min (VM boot + playbook + manual checks) | 10-15 min (Docker containers + automated verification) |
| **Reproducibility** | Depends on manual steps | Automated, identical across runs |
| **Verification** | Manual SSH checks | Automated assertions in verify.yml |
| **CI/CD Ready** | Hard to integrate | Native GitHub Actions support |
| **Debugging** | Manual inspection | Logs + Ansible output |

---

## 5. GitHub Actions CI/CD integration

### 5.1. The workflow file: `.github/workflows/e2e.yaml`

On a push to `main` or when a PR is opened, GitHub Actions runs Molecule:

```yaml
---
name: e2e

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  molecule:
    name: Molecule e2e
    runs-on: ubuntu-24.04

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Ansible Galaxy roles
        run: make install

      - name: Cache Slurm build artifacts
        uses: actions/cache@v4
        with:
          path: /tmp/slurm-build-cache
          key: slurm-build-${{ hashFiles('roles/slurm-common/defaults/main.yml') }}

      - name: Patch molecule-docker boolean bug (ansible-core 2.19 compat)
        run: make fix-molecule-docker

      - name: Run Molecule
        run: make test
        env:
          MOLECULE_EPHEMERAL_DIRECTORY: /tmp/molecule
          DOCKER_HOST: unix:///var/run/docker.sock
```

### 5.2. How it works

1. **Trigger**: push to `main` or open a PR
2. **Runner**: Ubuntu 24.04 GitHub Actions runner (Docker is pre-installed)
3. **Steps**:
   - Checkout the repository
   - Install Ansible Galaxy roles (`make install`)
   - Cache SLURM build artifacts (speeds up later runs)
   - Patch molecule-docker for Ansible 2.19 compatibility
   - Run the Molecule test (`make test`)
4. **Result**: pass/fail appears in the PR status

### 5.3. Why caching matters

SLURM is compiled from source, which is slow (around 10 minutes). The GitHub Actions cache keeps build artifacts between runs:

```yaml
- name: Cache Slurm build artifacts
  uses: actions/cache@v4
  with:
    path: /tmp/slurm-build-cache
    key: slurm-build-${{ hashFiles('roles/slurm-common/defaults/main.yml') }}
```

If the role defaults (SLURM version) have not changed, the cache hits and saves around 10 minutes per run.

---

## 6. Example: catching a playbook bug

**Scenario:** a change to the `slurm-master` role adds a new config option but introduces a typo in the template.

### Without Molecule:

```bash
# You might not catch it until deploying to the real cluster
ansible-playbook -i inventories/hosts.prod.yml playbooks/slurm-cluster/slurm.yml
# ... wait 30 minutes, SSH to controller, check logs ...
# Error: /etc/slurm/slurm.conf has invalid syntax
# Rollback, fix, redeploy again
```

**Time lost: 1 hour**

### With Molecule:

```bash
# Before pushing to main, run locally
make test

# Molecule catches it immediately:
TASK [verify : Check slurm.conf syntax] *****
failed: [controller-01] => {
    "msg": "slurm.conf failed syntax check",
    "stderr": "Error on line 42: invalid token 'SLURM_TYPO'"
}

# Fix the typo, run again
make test
# Now it passes
git push
```

**Time lost: 5 minutes, caught before production**

---

## 7. From Vagrant to Molecule to CI/CD

The testing workflow in the river-slurm project evolved in three stages:

### Stage 1: manual Vagrant testing (slow feedback)
```bash
bash scripts/setup.sh 24.04 true
vagrant up
vagrant ssh controller-01
sinfo
vagrant destroy -f
```
- Developer responsibility
- 30+ minutes per iteration
- No reproducibility guarantee

### Stage 2: local Molecule testing (fast feedback)
```bash
make test
```
- One command, fully automated
- 10-15 minutes
- Identical to CI/CD

### Stage 3: GitHub Actions CI/CD (gated merges)
```
Pull Request opened
  ↓
GitHub Actions triggered
  ↓
Molecule test runs in CI
  ↓
Pass → Approve and merge
Fail → Fix and push again
```
- Catches regressions before production
- Easier team collaboration
- Audit trail of what was tested

---

## 8. Key takeaways

1. **Molecule replaces manual Vagrant testing** — faster, automated, repeatable
2. **Docker containers instead of VMs** — less than 10 minutes instead of 30+ minutes
3. **Automated verification** — checks config, services, and even job execution
4. **CI/CD integration** — GitHub Actions runs Molecule on every PR
5. **Caching speeds up CI** — SLURM build artifacts are cached between runs
6. **Local matches CI** — test locally with `make test`, and the same thing runs in CI

Adopting Molecule makes it easier to catch configuration bugs early, reduce deployment risk, and iterate faster on HPC infrastructure code.

---

## References

- [Molecule Documentation](https://molecule.readthedocs.io/)
- [Ansible Testing Best Practices](https://docs.ansible.com/ansible/latest/testing/index.html)
- [GitHub Actions with Docker](https://docs.github.com/en/actions/using-containerized-services/about-service-containers)
- [river-slurm GitHub Repository](https://github.com/gianglabs/river-slurm) — working example with Molecule, Vagrant, and GitHub Actions
- [Building a Slurm HPC Cluster (Part 1)](/en/blogs/how-to-build-slurm-hpc-part-1) — foundation for understanding SLURM deployment
- [Building a Slurm HPC Cluster (Part 2)](/en/blogs/how-to-build-slurm-hpc-part-2) — Ansible-based production deployment
- [Running GitHub Actions Locally with act](/en/blogs/cicd-bioinformatics-act-local-github-action) — test GitHub Actions workflows before pushing
- Cover image: [EFTA00000440 - Cluttered server room with numerous cables equipment and racks arranged on a white wall](https://commons.wikimedia.org/wiki/File:EFTA00000440_-_Cluttered_server_room_with_numerous_cables_equipment_and_racks_arranged_on_a_white_wall.jpg) — Federal Bureau of Investigation, Wikimedia Commons, Public domain
