---
slug: containers-hpc-docker-singularity-apptainer
title: "Container trên HPC: từ Docker đến Singularity và Apptainer"
description: "Vì sao Docker không phù hợp với hệ thống HPC dùng chung, và cách Docker rootless, Singularity cùng Apptainer giải quyết các vấn đề về bảo mật, quyền hạn và scheduler."
authors: [vieomics]
tags: [hpc, docker, containers, singularity, apptainer]
image: ./imgs/containers-hpc-docker-singularity-apptainer.png
---

Các công nghệ container được dùng rộng rãi để triển khai phần mềm và tái lập trong tính toán khoa học. Tuy nhiên, Docker truyền thống có những hạn chế trong môi trường High-Performance Computing (HPC). Bài này xem xét vì sao Docker không phù hợp với hệ thống HPC dùng chung, và giới thiệu những lựa chọn thay thế thường được dùng ở đó: Docker rootless, Singularity và Apptainer.

<!--truncate-->

## Vấn đề của Docker trên hệ thống HPC

### Vì sao Docker không dùng được cho người dùng thường

Mô hình bảo mật của Docker khiến nó gây trở ngại cho hệ thống HPC dùng chung.

**Docker cần quyền root** để chạy container. Daemon của Docker hoạt động ở cấp hệ thống và cần quyền cao hơn để:

- Tạo network namespace
- Mount filesystem
- Quản lý storage driver
- Truy cập tài nguyên phần cứng

Trên hệ thống HPC có nhiều người dùng chia sẻ tài nguyên, việc cấp quyền Docker cho tất cả người dùng sẽ tạo ra vấn đề bảo mật. Một người dùng có quyền Docker có thể:

- Nâng quyền lên root
- Truy cập dữ liệu của người dùng khác qua mount của container
- Tiêu thụ lượng lớn tài nguyên hệ thống
- Vượt qua quota tài nguyên và chính sách lập lịch

### Một ví dụ cụ thể: nâng quyền bằng Docker

Ví dụ dưới đây minh hoạ cách một người dùng thường có thể nâng quyền lên root bằng Docker:

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

**Điều gì đã xảy ra ở đây?**
- Một người dùng thường đã có quyền ngang root.
- Người dùng truy cập và sửa file hệ thống (ví dụ `/etc/shadow`, cron job).
- Người dùng có thể cài backdoor, lấy cắp thông tin xác thực và xâm phạm toàn bộ hệ thống.
- Việc nâng quyền này không bị Docker ngăn chặn; nó xuất phát từ chính thiết kế của Docker.

```bash
# Another example: avoiding resource limits
# User runs a container with no resource restrictions
docker run -it --memory=unlimited --cpus=unlimited ubuntu:latest

# Inside the container, a fork bomb can exhaust the node
:(){ :|:& };:

# This can crash the entire HPC node, affecting all other users
```

**Vì sao đây là vấn đề:**
- Daemon của Docker chạy bằng root.
- Bất kỳ người dùng nào trong nhóm docker đều có thể giao tiếp với daemon.
- Daemon sẽ mount hoặc thực thi bất cứ thứ gì người dùng yêu cầu.
- Không có cách nào ngăn việc nâng quyền một khi đã cấp quyền truy cập nhóm docker.

```bash
# Standard Docker setup (unsafe on shared systems)
sudo usermod -aG docker regularuser

# Now regularuser can:
docker run -v /:/host ...     # Access ANY file on the system
docker run --privileged ...   # Run as root
docker pull malicious:latest  # Download backdoored containers
```

Đó là lý do các quản trị viên thường không cấp quyền truy cập nhóm docker trên hệ thống HPC dùng chung.

```bash
# Typical Docker setup requires sudo
sudo docker run -it ubuntu:latest bash

# Even with docker group membership, this is a privilege escalation vector
docker run -it ubuntu:latest bash
```

### Thách thức về quản trị

Các cụm HPC là môi trường được quản lý với:

- Chính sách bảo mật
- Phân bổ tài nguyên qua job scheduler (Slurm, PBS)
- Workload nhiều người dùng cần cách ly
- Audit trail cho tuân thủ

Kiến trúc daemon đơn khối của Docker xung đột với những yêu cầu này. Quản trị viên hạn chế Docker để ngăn vi phạm bảo mật và xung đột tài nguyên.

## Giải pháp 1: Docker rootless

### Docker rootless là gì?

Docker rootless cho phép Docker chạy mà không cần quyền root, giải quyết một lớp của vấn đề nâng quyền. Nó dùng user namespace để cách ly daemon và container.

### Cách dùng Docker rootless

**Cài đặt:**
```bash
# Install rootless Docker
curl https://get.docker.com/rootless | sh

# Verify installation
dockerd-rootless-setuptool.sh install

# Start the daemon
systemctl --user start docker
```

**Dùng rootless Docker:**
```bash
# No sudo needed!
docker run -it ubuntu:latest bash

# Check the user
docker run whoami
# Output: root (but it's a mapped non-root user)
```

### Ưu điểm

- Không cần daemon chạy root
- Cách ly tốt hơn Docker tiêu chuẩn
- Tăng cường bảo mật
- Trải nghiệm Docker quen thuộc với người dùng

### Hạn chế với HPC

- Vẫn dùng mô hình storage và networking của Docker
- Không tối ưu cho môi trường cụm
- Không tích hợp với scheduler HPC (Slurm)
- Cơ chế kiểm soát tài nguyên còn hạn chế
- Có overhead hiệu năng trong một số trường hợp

Docker rootless là một bước tiến, nhưng chưa giải quyết được sự không khớp giữa thiết kế của Docker và yêu cầu của HPC.

## Giải pháp 2: Singularity (nay là Apptainer)

### Giải pháp container thuần HPC

Singularity được xây dựng cho môi trường HPC. Nó giải quyết các vấn đề bảo mật và lập lịch mà Docker gặp trên cụm. Năm 2021, nó được mở mã nguồn với tên **Apptainer** bởi Linux Foundation.

### Vì sao Singularity/Apptainer hoạt động tốt trên HPC

**Thiết kế hướng người dùng:**
```bash
# Run as normal user, no daemon required
singularity run mycontainer.sif

# Direct execution without privilege escalation
singularity exec mycontainer.sif python script.py
```

**Container là một file duy nhất:**
```bash
# Portable and easy to manage
ls -lh mycontainer.sif
# Output: -rw-r--r--  1 user group 2.5G Feb 11 10:00 mycontainer.sif

# Copy between systems
cp mycontainer.sif /cluster/home/user/
```

**Giữ nguyên danh tính và quyền của người dùng:**
```bash
# Inside container, you're still yourself
singularity exec mycontainer.sif id
# Output: uid=1001(user) gid=1002(group)...

# Access your files as expected
singularity exec mycontainer.sif ls -la ~
```

### Cài Singularity/Apptainer với Pixi

Vì Singularity/Apptainer được dùng phổ biến trên nhiều hệ thống HPC và workflow bioinformatics, một cách là cài chúng toàn cục bằng **Pixi**, thường đơn giản và đáng tin cậy hơn các trình quản lý gói truyền thống.

**Bước 1: Cài Pixi (nếu chưa có):**
```bash
# One-time setup
curl -fsSL https://pixi.sh/install.sh | bash

# Add pixi to your PATH to use in current shell, or open new shell to reload
export PATH="$HOME/.pixi/bin:$PATH"

# Verify pixi installation
pixi --version
```

**Bước 2: Cài Apptainer toàn cục:**
```bash
# Simple one-liner - that's it!
pixi global install apptainer

# Verify installation
apptainer --version
```

**Bước 3 (tuỳ chọn): cài các công cụ bioinformatics phổ biến khác toàn cục:**
```bash
# Install multiple tools at once
pixi global install apptainer -c conda-forge --expose apptainer

# All tools are now available system-wide
apptainer --version
```

**Lợi ích của cách này:**
- **Đơn giản**: chỉ cần `pixi global install apptainer`
- **Không cần sudo**: cài trong không gian người dùng
- **Hoạt động ở nhiều nơi**: Linux, macOS, cụm HPC
- **Phụ thuộc gần đây**: nhận phiên bản gần đây từ conda-forge
- **Tái lập**: file lock theo dõi phiên bản chính xác nếu cần
- **Cập nhật dễ**: `pixi global upgrade apptainer`

**Kiểm tra cài đặt:**
```bash
# Check version
apptainer --version

# Run a test container from Docker Hub
apptainer run docker://ubuntu:22.04 echo "Apptainer works"

# List available sub-commands
apptainer --help
```

Sau khi cài toàn cục qua Pixi, Apptainer sẵn có cho các dự án và người dùng mà không cần kích hoạt môi trường cho mỗi phiên.

### Build container Singularity/Apptainer

Bạn có thể build từ Docker image hoặc viết definition file gốc.

**Cách 1: chuyển đổi một Docker image**
```bash
# Build directly from Docker Hub
apptainer build ubuntu.sif docker://ubuntu:22.04

# Build from existing Docker image
apptainer build myapp.sif docker://myregistry.com/myapp:latest
```

**Cách 2: viết definition file**

Tạo `myapp.def`:
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

Build nó:
```bash
# Note: first build may require sudo, but running requires no special privileges
apptainer build myapp.sif myapp.def

# Run without any special privileges
apptainer run myapp.sif script.py
```

### Tích hợp với job scheduler HPC

**Với Slurm:**
```bash
#!/bin/bash
#SBATCH --job-name=analysis
#SBATCH --ntasks=4
#SBATCH --mem=16GB
#SBATCH --time=01:00:00

# Run container through scheduler
apptainer run myapp.sif python /data/analysis.py
```

**Với PBS:**
```bash
#!/bin/bash
#PBS -N analysis
#PBS -l select=1:ncpus=4:mem=16gb
#PBS -l walltime=01:00:00

cd $PBS_O_WORKDIR
apptainer run myapp.sif python /data/analysis.py
```

Singularity không can thiệp vào việc phân bổ tài nguyên của scheduler; nó dùng các system call tiêu chuẩn.

### Các tính năng chính của Singularity/Apptainer

| Feature                   | Singularity/Apptainer | Docker     | Docker Rootless |
| ------------------------- | --------------------- | ---------- | --------------- |
| No daemon required        | Yes                   | No         | No              |
| Single file format        | Yes                   | No         | No              |
| User identity preserved   | Yes                   | No         | Partial         |
| HPC scheduler integration | Yes                   | No         | No              |
| Permission isolation      | Yes                   | Limited    | Limited         |
| Resource control          | Via cgroups           | Native     | Limited         |
| Learning curve            | Moderate              | Low        | Low             |

## So sánh thực tế: chạy một pipeline bioinformatics

### Với Docker (không khuyến nghị trên HPC)
```bash
# Requires privileged setup
sudo docker run -v /data:/data myapp:latest \
  bwa mem reference.fa reads.fastq > output.sam
```

### Với Docker rootless (tốt hơn, vẫn còn hạn chế)
```bash
# No sudo, but still not HPC-optimized
docker run -v /data:/data myapp:latest \
  bwa mem reference.fa reads.fastq > output.sam
```

### Với Singularity/Apptainer (sẵn sàng cho HPC)
```bash
# Simple, no special privileges, works with Slurm
singularity exec myapp.sif \
  bwa mem reference.fa reads.fastq > output.sam

# Or in a Slurm script
sbatch -N 1 --ntasks=8 --mem=32G myjob.sh
# (inside myjob.sh runs singularity as normal)
```

## Lộ trình chuyển đổi: từ Docker sang Apptainer

### Bước 1: xác định các Docker image của bạn

```bash
# List your images
docker images
```

### Bước 2: build container Apptainer

```bash
# Convert existing Docker images
apptainer build myapp.sif docker://myregistry/myapp:latest

# Or build from Docker Compose
# First, build your Docker image
docker build -t myapp:latest .

# Then convert
apptainer build myapp.sif docker-daemon://myapp:latest
```

### Bước 3: kiểm tra cục bộ

```bash
# Run and verify
apptainer run myapp.sif command
apptainer exec myapp.sif python script.py
```

### Bước 4: triển khai trên HPC

```bash
# Copy to cluster
scp myapp.sif user@hpc-cluster:/home/user/

# Use in job scripts
sbatch my_job.sh
```

## Best practices cho container trên HPC

1. **Giảm kích thước image** - container lớn làm chậm việc truyền và khởi động
2. **Dùng caching layer hiệu quả** - sắp xếp lệnh trong Dockerfile từ ít thay đổi đến thường thay đổi nhất
3. **Bind mount dữ liệu** - giữ dữ liệu bên ngoài container và dùng volume mount
4. **Giữ ngữ cảnh người dùng** - tránh đặt UID cụ thể trong container production
5. **Kiểm tra cục bộ trước** - xác minh trên máy của bạn trước khi triển khai lên cụm
6. **Đánh phiên bản cho container** - dùng tag và giữ definition file trong version control
7. **Ghi lại phụ thuộc** - bao gồm hướng dẫn build và phiên bản phần mềm

## Khi nào dùng cái nào

| Scenario                 | Recommendation                           |
| ------------------------ | ---------------------------------------- |
| Local development        | Docker or Docker Desktop                 |
| Single-user HPC access   | Singularity/Apptainer                    |
| Multi-tenant HPC cluster | Singularity/Apptainer                    |
| Rootless requirement     | Docker rootless or Singularity/Apptainer |
| Kubernetes clusters      | Docker or similar (not HPC-focused)      |
| Maximum compatibility    | Singularity/Apptainer                    |

## Kết luận

Docker phù hợp với phát triển và hạ tầng cloud, nhưng môi trường HPC cần một cách tiếp cận khác. Docker rootless cải thiện mô hình bảo mật của Docker nhưng chưa giải quyết được việc tích hợp HPC.

Singularity/Apptainer là lựa chọn phổ biến cho HPC vì nó:

- Chạy không cần daemon hay quyền root
- Giữ nguyên danh tính và quyền của người dùng
- Tích hợp với job scheduler
- Dùng container một file, dễ di chuyển
- Được thiết kế cho cụm tính toán khoa học

Trên hệ thống HPC, Singularity/Apptainer là lựa chọn tự nhiên hơn. Với phát triển cục bộ, Docker vẫn thuận tiện; có thể chuyển image sang Singularity khi triển khai lên cụm.

## Tài liệu tham khảo

- Tài liệu Apptainer: [apptainer.org/docs](https://apptainer.org/docs/)
- Tài liệu Singularity CE: [singularity-ce.readthedocs.io](https://singularity-ce.readthedocs.io/)
- Docker rootless mode: [docs.docker.com/engine/security/rootless](https://docs.docker.com/engine/security/rootless/)
- Chuyển đổi Docker image sang Singularity/Apptainer: [apptainer.org/docs/user/main/docker_and_oci.html](https://apptainer.org/docs/user/main/docker_and_oci.html)
- Pixi: [pixi.sh](https://pixi.sh)
- Slurm workload manager: [slurm.schedmd.com](https://slurm.schedmd.com/)
