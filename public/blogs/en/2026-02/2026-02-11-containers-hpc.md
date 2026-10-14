---
slug: containers-hpc-docker-singularity-apptainer
title: "Containers on HPC: from Docker to Singularity and Apptainer"
description: "Why Docker is a poor fit for shared HPC systems and how Docker rootless, Singularity, and Apptainer address the security, permission, and scheduler problems it creates."
authors: [vieomics]
tags: [hpc, docker, containers, singularity, apptainer]
image: ./imgs/intro.png
---

Container technologies are widely used for software deployment and reproducibility in scientific computing. Traditional Docker, however, has limitations in High-Performance Computing (HPC) environments. This post looks at why Docker is a poor fit on shared HPC systems and introduces the alternatives commonly used there: Docker rootless, Singularity, and Apptainer.

<!--truncate-->

## The Docker problem on HPC systems

### Why Docker doesn't work for normal users

Docker's security model makes it problematic for shared HPC systems.

**Docker requires root privileges** to run containers. Docker's daemon operates at the system level and needs elevated permissions to:

- Create network namespaces
- Mount filesystems
- Manage storage drivers
- Access hardware resources

On HPC systems with many users sharing resources, giving all users Docker access would create a security problem. A user with Docker access could:

- Escalate privileges to root
- Access other users' data through container mounts
- Consume large amounts of system resources
- Bypass resource quotas and scheduling policies

### A concrete example: Docker privilege escalation

The example below demonstrates how a regular user can escalate to root privileges using Docker:

```bash
# A normal user with docker group membership
whoami
# Output: regularuser

# User runs a container and mounts the entire root filesystem
docker run -v /:/host -it ubuntu:latest bash

# Inside the container, the user can access ALL system files as root
root@container# cat /host/etc/shadow
# This reveals root password hashes that should be inaccessible!

root@container# cat /host/root/.ssh/id_rsa
# Can steal other users' SSH keys

root@container# whoami
# Output: root (inside the container)

# User can write files as root
root@container# echo "malicious content" > /host/etc/cron.d/backdoor
```

**What happened here?**
- A regular user gained root-level access.
- The user accessed and modified system files (e.g. `/etc/shadow`, cron jobs).
- The user could install backdoors, steal credentials, and compromise the entire system.
- This escalation is not prevented by Docker; it follows from Docker's design.

```bash
# Another example: avoiding resource limits
# User runs a container with no resource restrictions
docker run -it --memory=unlimited --cpus=unlimited ubuntu:latest

# Inside the container, a fork bomb can exhaust the node
:(){ :|:& };:

# This can crash the entire HPC node, affecting all other users
```

**Why this is a problem:**
- Docker's daemon runs as root.
- Any user in the docker group can communicate with the daemon.
- The daemon will mount or execute anything the user requests.
- There is no way to prevent privilege escalation once docker group access is granted.

```bash
# Standard Docker setup (unsafe on shared systems)
sudo usermod -aG docker regularuser

# Now regularuser can:
docker run -v /:/host ...     # Access ANY file on the system
docker run --privileged ...   # Run as root
docker pull malicious:latest  # Download backdoored containers
```

This is why administrators typically do not grant docker group access on shared HPC systems.

```bash
# Typical Docker setup requires sudo
sudo docker run -it ubuntu:latest bash

# Even with docker group membership, this is a privilege escalation vector
docker run -it ubuntu:latest bash
```

### The governance challenge

HPC clusters are managed environments with:

- Security policies
- Resource allocation via job schedulers (Slurm, PBS)
- Multi-tenant workloads requiring isolation
- Audit trails for compliance

Docker's monolithic daemon architecture conflicts with these requirements. Administrators restrict Docker to prevent security breaches and resource conflicts.

## Solution 1: Docker rootless mode

### What is Docker rootless?

Docker rootless allows Docker to run without root privileges, addressing one layer of the privilege escalation problem. It uses user namespaces to isolate the daemon and containers.

### How to use Docker rootless

**Installation:**
```bash
# Install rootless Docker
curl https://get.docker.com/rootless | sh

# Verify installation
dockerd-rootless-setuptool.sh install

# Start the daemon
systemctl --user start docker
```

**Using rootless Docker:**
```bash
# No sudo needed!
docker run -it ubuntu:latest bash

# Check the user
docker run whoami
# Output: root (but it's a mapped non-root user)
```

### Advantages

- No root daemon required
- Better isolation than standard Docker
- Improved security posture
- Familiar Docker experience for users

### Limitations for HPC

- Still uses Docker's storage and networking model
- Not optimized for cluster environments
- Does not integrate with HPC schedulers (Slurm)
- Limited resource control mechanisms
- Performance overhead in some scenarios

Docker rootless is a step forward, but it does not resolve the mismatch between Docker's design and HPC requirements.

## Solution 2: Singularity (now Apptainer)

### The HPC-native container solution

Singularity was built for HPC environments. It addresses the security and scheduling problems Docker has on clusters. In 2021, it was open-sourced as **Apptainer** by the Linux Foundation.

### Why Singularity/Apptainer works well on HPC

**User-focused design:**
```bash
# Run as normal user, no daemon required
singularity run mycontainer.sif

# Direct execution without privilege escalation
singularity exec mycontainer.sif python script.py
```

**Container is a single file:**
```bash
# Portable and easy to manage
ls -lh mycontainer.sif
# Output: -rw-r--r--  1 user group 2.5G Feb 11 10:00 mycontainer.sif

# Copy between systems
cp mycontainer.sif /cluster/home/user/
```

**Preserves user identity and permissions:**
```bash
# Inside container, you're still yourself
singularity exec mycontainer.sif id
# Output: uid=1001(user) gid=1002(group)...

# Access your files as expected
singularity exec mycontainer.sif ls -la ~
```

### Installing Singularity/Apptainer with Pixi

Since Singularity/Apptainer are commonly used across HPC systems and bioinformatics workflows, one approach is to install them globally with **Pixi**, which is often simpler and more reliable than traditional package managers.

**Step 1: Install Pixi (if not already installed):**
```bash
# One-time setup
curl -fsSL https://pixi.sh/install.sh | bash

# Add pixi to your PATH to use in current shell, or open new shell to reload
export PATH="$HOME/.pixi/bin:$PATH"

# Verify pixi installation
pixi --version
```

**Step 2: Install Apptainer globally:**
```bash
# Simple one-liner - that's it!
pixi global install apptainer

# Verify installation
apptainer --version
```

**Step 3 (optional): install other common bioinformatics tools globally:**
```bash
# Install multiple tools at once
pixi global install apptainer -c conda-forge --expose apptainer

# All tools are now available system-wide
apptainer --version
```

**Benefits of this approach:**
- **Simple**: just `pixi global install apptainer`
- **No sudo required**: installs in user space
- **Works in many places**: Linux, macOS, HPC clusters
- **Recent dependencies**: gets recent versions from conda-forge
- **Reproducible**: lock files track exact versions if needed
- **Easy updates**: `pixi global upgrade apptainer`

**Verify the installation:**
```bash
# Check version
apptainer --version

# Run a test container from Docker Hub
apptainer run docker://ubuntu:22.04 echo "Apptainer works"

# List available sub-commands
apptainer --help
```

Once installed globally via Pixi, Apptainer is available to projects and users without activating an environment for each session.

### Building Singularity/Apptainer containers

You can build from Docker images or write native definition files.

**Method 1: convert a Docker image**
```bash
# Build directly from Docker Hub
apptainer build ubuntu.sif docker://ubuntu:22.04

# Build from existing Docker image
apptainer build myapp.sif docker://myregistry.com/myapp:latest
```

**Method 2: write a definition file**

Create `myapp.def`:
```singularity
Bootstrap: docker
From: ubuntu:22.04

%post
    apt-get update
    apt-get install -y python3 pip
    pip install numpy scipy

%environment
    export PATH=/usr/local/bin:$PATH

%runscript
    exec python3 "$@"

%help
    This container runs Python analysis scripts
```

Build it:
```bash
# Note: first build may require sudo, but running requires no special privileges
apptainer build myapp.sif myapp.def

# Run without any special privileges
apptainer run myapp.sif script.py
```

### Integrating with HPC job schedulers

**With Slurm:**
```bash
#!/bin/bash
#SBATCH --job-name=analysis
#SBATCH --ntasks=4
#SBATCH --mem=16GB
#SBATCH --time=01:00:00

# Run container through scheduler
apptainer run myapp.sif python /data/analysis.py
```

**With PBS:**
```bash
#!/bin/bash
#PBS -N analysis
#PBS -l select=1:ncpus=4:mem=16gb
#PBS -l walltime=01:00:00

cd $PBS_O_WORKDIR
apptainer run myapp.sif python /data/analysis.py
```

Singularity does not interfere with scheduler resource allocation; it uses standard system calls.

### Key Singularity/Apptainer features

| Feature                   | Singularity/Apptainer | Docker     | Docker Rootless |
| ------------------------- | --------------------- | ---------- | --------------- |
| No daemon required        | Yes                   | No         | No              |
| Single file format        | Yes                   | No         | No              |
| User identity preserved   | Yes                   | No         | Partial         |
| HPC scheduler integration | Yes                   | No         | No              |
| Permission isolation      | Yes                   | Limited    | Limited         |
| Resource control          | Via cgroups           | Native     | Limited         |
| Learning curve            | Moderate              | Low        | Low             |

## Practical comparison: running a bioinformatics pipeline

### With Docker (not recommended on HPC)
```bash
# Requires privileged setup
sudo docker run -v /data:/data myapp:latest \
  bwa mem reference.fa reads.fastq > output.sam
```

### With Docker rootless (better, still limited)
```bash
# No sudo, but still not HPC-optimized
docker run -v /data:/data myapp:latest \
  bwa mem reference.fa reads.fastq > output.sam
```

### With Singularity/Apptainer (HPC-ready)
```bash
# Simple, no special privileges, works with Slurm
singularity exec myapp.sif \
  bwa mem reference.fa reads.fastq > output.sam

# Or in a Slurm script
sbatch -N 1 --ntasks=8 --mem=32G myjob.sh
# (inside myjob.sh runs singularity as normal)
```

## Migration path: from Docker to Apptainer

### Step 1: identify your Docker images

```bash
# List your images
docker images
```

### Step 2: build Apptainer containers

```bash
# Convert existing Docker images
apptainer build myapp.sif docker://myregistry/myapp:latest

# Or build from Docker Compose
# First, build your Docker image
docker build -t myapp:latest .

# Then convert
apptainer build myapp.sif docker-daemon://myapp:latest
```

### Step 3: test locally

```bash
# Run and verify
apptainer run myapp.sif command
apptainer exec myapp.sif python script.py
```

### Step 4: deploy on HPC

```bash
# Copy to cluster
scp myapp.sif user@hpc-cluster:/home/user/

# Use in job scripts
sbatch my_job.sh
```

## Best practices for HPC containers

1. **Minimize image size** - large containers slow down transfer and startup
2. **Use caching layers efficiently** - order Dockerfile commands from least to most frequently changed
3. **Bind mount data** - keep data outside containers and use volume mounts
4. **Preserve user context** - avoid setting specific UIDs in production containers
5. **Test locally first** - verify on your machine before cluster deployment
6. **Version your containers** - use tags and keep definition files in version control
7. **Document dependencies** - include build instructions and software versions

## When to use what

| Scenario                 | Recommendation                           |
| ------------------------ | ---------------------------------------- |
| Local development        | Docker or Docker Desktop                 |
| Single-user HPC access   | Singularity/Apptainer                    |
| Multi-tenant HPC cluster | Singularity/Apptainer                    |
| Rootless requirement     | Docker rootless or Singularity/Apptainer |
| Kubernetes clusters      | Docker or similar (not HPC-focused)      |
| Maximum compatibility    | Singularity/Apptainer                    |

## Conclusion

Docker is well suited to development and cloud infrastructure, but HPC environments call for a different approach. Docker rootless improves Docker's security model but does not resolve HPC integration.

Singularity/Apptainer is a common choice for HPC because it:

- Runs without a daemon or root privileges
- Preserves user identity and permissions
- Integrates with job schedulers
- Uses portable single-file containers
- Was designed for scientific computing clusters

On HPC systems, Singularity/Apptainer is the more natural fit. For local development, Docker remains convenient; the image can then be converted to Singularity when deploying to the cluster.

## References

- Apptainer documentation: [apptainer.org/docs](https://apptainer.org/docs/)
- Singularity CE documentation: [singularity-ce.readthedocs.io](https://singularity-ce.readthedocs.io/)
- Docker rootless mode: [docs.docker.com/engine/security/rootless](https://docs.docker.com/engine/security/rootless/)
- Converting Docker images to Singularity/Apptainer: [apptainer.org/docs/user/main/docker_and_oci.html](https://apptainer.org/docs/user/main/docker_and_oci.html)
- Pixi: [pixi.sh](https://pixi.sh)
- Slurm workload manager: [slurm.schedmd.com](https://slurm.schedmd.com/)
