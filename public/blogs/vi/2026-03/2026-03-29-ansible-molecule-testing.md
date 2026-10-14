---
slug: hpc-ansible-molecule-playbook-testing
title: "Kiểm thử playbook Ansible cho HPC bằng Molecule: từ Vagrant thủ công đến CI/CD"
description: "Cách chuyển quy trình kiểm thử playbook Ansible cho HPC từ chạy Vagrant thủ công sang Molecule với Docker, rồi tích hợp vào GitHub Actions CI/CD, lấy ví dụ là việc dựng cụm Slurm."
authors: [vieomics]
tags: [hpc, ansible, slurm, testing, molecule, ci-cd, docker]
image: ./imgs/hpc-ansible-molecule-playbook-testing.png
---

Kiểm thử playbook Ansible cho cụm HPC không hề đơn giản. Cách làm thủ công với Vagrant vẫn dùng được, nhưng gỡ lỗi trên cả node controller lẫn worker tốn thời gian ở mỗi vòng lặp. Molecule cung cấp một khung kiểm thử tự động, có thể lặp lại, giúp xác thực cấu hình của playbook trước khi triển khai. Bài viết này trình bày cách chúng tôi chuyển từ kiểm thử Vagrant thủ công sang Molecule, rồi tích hợp vào GitHub Actions CI/CD, lấy ví dụ là việc dựng cụm Slurm.

<!--truncate-->

## 1. Thách thức kiểm thử: Vagrant thủ công so với Molecule

### 1.1. Kiểm thử thủ công với Vagrant

Khi một playbook Ansible cho HPC mới được phát triển — ví dụ cho cụm Slurm — một lựa chọn là kiểm thử bằng tay:

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

**Vấn đề của cách làm này:**
- Vòng phản hồi chậm (VM mất 5-10 phút để khởi động, playbook mất hơn 20 phút để chạy)
- Phải xác minh trạng thái bằng tay (service có chạy không? config có đúng không?)
- Khó phát hiện hồi quy (regression) khi chỉnh sửa playbook
- Không tái lập được giữa các thành viên trong nhóm hay hệ thống CI/CD

### 1.2. Kiểm thử với Molecule

Molecule tự động hóa phần lớn vòng đời kiểm thử bằng **container Docker** thay vì VM đầy đủ:

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

**Lợi ích chúng tôi quan sát được:**
- Phản hồi nhanh hơn: dưới 10 phút thay vì hơn 30 phút
- Xác minh tự động các trạng thái hệ thống quan trọng
- Hồi quy được phát hiện ngay trong pull request trước khi merge
- Tích hợp với GitHub Actions
- Tái lập được giữa các môi trường (Docker hành xử giống nhau trên các máy khác nhau)

---

## 2. Thiết lập Molecule cho playbook Ansible HPC

### 2.1. Cấu trúc cấu hình Molecule

Với dự án river-slurm, cấu trúc thư mục như sau:

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

### 2.2. Cấu hình Molecule: `molecule.yml`

Tệp này định nghĩa hạ tầng kiểm thử — cần tạo những container nào, cấu hình chúng ra sao và trình tự kiểm thử:

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

**Các điểm chính:**
- **Driver**: dùng Docker thay vì VM, nhanh hơn
- **Platforms**: định nghĩa hai node (controller và worker) kèm mạng
- **Provisioner**: Ansible áp dụng playbook và chạy kiểm chứng
- **Test sequence**: điều phối toàn bộ vòng đời

### 2.3. Playbook hội tụ: `converge.yml`

Playbook này chạy các role Ansible trên các container kiểm thử. Nó phản ánh việc triển khai production nhưng bỏ qua các phụ thuộc bên ngoài:

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

### 2.4. Playbook kiểm chứng: `verify.yml`

Sau khi hội tụ, playbook này **kiểm tra trạng thái hệ thống quan trọng**. Nội dung gồm:

**Trên controller:**
- `slurm.conf` và `slurmdbd.conf` tồn tại
- Các binary SLURM (`slurmctld`, `slurmdbd`) đã được cài
- Quyền của khóa MUNGE chính xác
- Người dùng test có thể SSH mà không cần job đang chạy (thiết lập PAM)
- `sinfo` trả về thông tin cụm
- Một job test có thể được submit và hoàn thành thành công

**Trên worker:**
- `slurm.conf` tồn tại
- Binary `slurmd` đã được cài
- Khóa MUNGE đã được đồng bộ
- Tài khoản người dùng test tồn tại
- Tệp kết quả job đã được tạo (bằng chứng job chạy trên worker này)

Ví dụ các task kiểm chứng:

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

## 3. Chạy Molecule cục bộ

### 3.1. Cài đặt bằng Pixi

Dự án river-slurm dùng **Pixi** để quản lý phụ thuộc một cách tái lập được:

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

Cài đặt và kiểm tra:

```bash
# Install Python tools via Pixi
pixi install

# Verify Molecule is available
pixi run molecule --version
```

### 3.2. Chạy toàn bộ bài kiểm thử cục bộ

```bash
# Install Ansible Galaxy roles (roles from community)
make install

# Run the full Molecule test
make test
```

**Trích đoạn output (một lần chạy thực tế):**

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

Đoạn này cho thấy pha **dependency** cài các role Galaxy, sau đó **converge** áp dụng playbook trên cả hai node. Mỗi task báo trạng thái (`ok`, `changed`, `failed`), phản ánh tính idempotent.

---

## 4. Vì sao Molecule thay thế kiểm thử thủ công

Tính tự động và khả năng lặp lại của Molecule giải quyết những điểm yếu chính của quy trình Vagrant thủ công:

| Khía cạnh | Vagrant thủ công | Molecule |
|--------|---|---|
| **Tốc độ** | Hơn 30 phút (khởi động VM + playbook + kiểm tra thủ công) | 10-15 phút (container Docker + xác minh tự động) |
| **Khả năng tái lập** | Phụ thuộc các bước thủ công | Tự động, giống nhau giữa các lần chạy |
| **Xác minh** | Kiểm tra SSH thủ công | Assert tự động trong verify.yml |
| **Sẵn sàng cho CI/CD** | Khó tích hợp | Hỗ trợ gốc GitHub Actions |
| **Gỡ lỗi** | Kiểm tra thủ công | Log + output Ansible |

---

## 5. Tích hợp GitHub Actions CI/CD

### 5.1. Tệp workflow: `.github/workflows/e2e.yaml`

Khi push lên `main` hoặc mở PR, GitHub Actions chạy Molecule:

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

### 5.2. Cách hoạt động

1. **Kích hoạt**: push lên `main` hoặc mở PR
2. **Runner**: runner GitHub Actions Ubuntu 24.04 (đã có Docker sẵn)
3. **Các bước**:
   - Checkout repository
   - Cài các role Ansible Galaxy (`make install`)
   - Cache artifact build SLURM (tăng tốc các lần chạy sau)
   - Vá molecule-docker cho tương thích Ansible 2.19
   - Chạy bài kiểm thử Molecule (`make test`)
4. **Kết quả**: pass/fail hiển thị trong trạng thái PR

### 5.3. Vì sao cache lại quan trọng

SLURM được biên dịch từ mã nguồn, khá chậm (khoảng 10 phút). Cache của GitHub Actions giữ lại artifact build giữa các lần chạy:

```yaml
- name: Cache Slurm build artifacts
  uses: actions/cache@v4
  with:
    path: /tmp/slurm-build-cache
    key: slurm-build-${{ hashFiles('roles/slurm-common/defaults/main.yml') }}
```

Nếu các giá trị mặc định của role (phiên bản SLURM) không đổi, cache sẽ hit và tiết kiệm khoảng 10 phút mỗi lần chạy.

---

## 6. Ví dụ: phát hiện một lỗi trong playbook

**Tình huống:** một thay đổi ở role `slurm-master` thêm tùy chọn cấu hình mới nhưng gây lỗi đánh máy trong template.

### Không dùng Molecule:

```bash
# You might not catch it until deploying to the real cluster
ansible-playbook -i inventories/hosts.prod.yml playbooks/slurm-cluster/slurm.yml
# ... wait 30 minutes, SSH to controller, check logs ...
# Error: /etc/slurm/slurm.conf has invalid syntax
# Rollback, fix, redeploy again
```

**Mất 1 giờ**

### Dùng Molecule:

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

**Mất 5 phút, phát hiện trước khi lên production**

---

## 7. Từ Vagrant đến Molecule rồi đến CI/CD

Quy trình kiểm thử trong dự án river-slurm tiến hóa qua ba giai đoạn:

### Giai đoạn 1: kiểm thử Vagrant thủ công (phản hồi chậm)
```bash
bash scripts/setup.sh 24.04 true
vagrant up
vagrant ssh controller-01
sinfo
vagrant destroy -f
```
- Trách nhiệm của lập trình viên
- Hơn 30 phút mỗi vòng lặp
- Không đảm bảo tái lập

### Giai đoạn 2: kiểm thử Molecule cục bộ (phản hồi nhanh)
```bash
make test
```
- Một lệnh, tự động hoàn toàn
- 10-15 phút
- Giống hệt CI/CD

### Giai đoạn 3: GitHub Actions CI/CD (merge có kiểm soát)
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
- Phát hiện hồi quy trước production
- Cộng tác nhóm dễ hơn
- Có dấu vết kiểm toán về những gì đã được kiểm thử

---

## 8. Những điểm chính

1. **Molecule thay thế kiểm thử Vagrant thủ công** — nhanh hơn, tự động, lặp lại được
2. **Container Docker thay vì VM** — dưới 10 phút thay vì hơn 30 phút
3. **Xác minh tự động** — kiểm tra config, service và cả việc thực thi job
4. **Tích hợp CI/CD** — GitHub Actions chạy Molecule trên mỗi PR
5. **Cache tăng tốc CI** — artifact build SLURM được cache giữa các lần chạy
6. **Cục bộ khớp với CI** — kiểm thử cục bộ bằng `make test`, và cùng nội dung đó chạy trên CI

Việc áp dụng Molecule giúp phát hiện lỗi cấu hình sớm hơn, giảm rủi ro triển khai và lặp nhanh hơn trên mã hạ tầng HPC.

---

## Tài liệu tham khảo

- [Tài liệu Molecule](https://molecule.readthedocs.io/)
- [Ansible Testing Best Practices](https://docs.ansible.com/ansible/latest/testing/index.html)
- [GitHub Actions with Docker](https://docs.github.com/en/actions/using-containerized-services/about-service-containers)
- [Repository river-slurm trên GitHub](https://github.com/gianglabs/river-slurm) — ví dụ hoàn chỉnh với Molecule, Vagrant và GitHub Actions
- [Xây dựng cụm Slurm HPC (Phần 1)](/blogs/how-to-build-slurm-hpc-part-1) — nền tảng để hiểu việc triển khai SLURM
- [Xây dựng cụm Slurm HPC (Phần 2)](/blogs/how-to-build-slurm-hpc-part-2) — triển khai production dựa trên Ansible
- [Chạy GitHub Actions cục bộ với act](/blogs/cicd-bioinformatics-act-local-github-action) — kiểm thử workflow GitHub Actions trước khi push
