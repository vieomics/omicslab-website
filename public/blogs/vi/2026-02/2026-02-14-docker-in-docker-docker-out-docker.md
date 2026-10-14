---
slug: docker-out-docker-bioinformatics-web-apps
title: "Docker out of Docker: chạy ứng dụng web tương tác cho phân tích dữ liệu"
description: "Cách chạy RStudio, JupyterLab và Code Server trong container và cho chúng khởi tạo thêm công cụ container qua Docker socket của host, kèm những lưu ý về bảo mật và quyền file."
authors: [vieomics]
tags: [docker, containers, rstudio, jupyterlab, code-server, bioinformatics, reproducibility, web-apps]
image: ./imgs/intro.png
---

Chạy các ứng dụng web tương tác như RStudio, JupyterLab và Code Server trong container là một cách phổ biến để cung cấp môi trường phân tích tái lập. Những ứng dụng này thường cần khởi tạo thêm công cụ container từ bên trong. **Docker out of Docker (DooD)** giải quyết việc này bằng cách cho container truy cập Docker daemon của host. Bài này mô tả cách thiết lập DooD cho ứng dụng web tương tác cùng những đánh đổi liên quan.

<!--truncate-->

## 1. Bối cảnh: ứng dụng web cần chạy container

### 1.1 Các trường hợp dùng phổ biến trong bioinformatics

**RStudio Server với công cụ container**

```
User opens RStudio in browser
    ↓
Inside RStudio, run: system("docker run quay.io/biocontainers/samtools:latest samtools ...")
    ↓
Needs access to host Docker daemon
```

**JupyterLab với phân tích Cell Ranger**

```
User runs notebook cell with: !docker run cellranger:v7.0 cellranger count ...
    ↓
Needs Docker access from within JupyterLab container
    ↓
Results written back to shared volume
```

**Code Server để phát triển pipeline**

```
User edits Nextflow script in Code Server
    ↓
Runs: docker exec to test containerized tools locally
    ↓
Needs full Docker CLI access
```

### 1.2 Vì sao DooD phù hợp với ứng dụng web

Các ứng dụng web như RStudio, JupyterLab và Code Server thường cần:

1. **Chạy trong container** để tái lập và cách ly phụ thuộc
2. **Truy cập Docker** để khởi tạo công cụ bioinformatics dạng container
3. **Chia sẻ volume dữ liệu** với host và các container được khởi tạo
4. **Giữ quyền file** để người dùng truy cập được kết quả

DooD cung cấp những điều này thông qua một socket mount.

## 2. Hiểu về Docker out of Docker (DooD)

### 2.1 DooD hoạt động như thế nào

**DooD** mount Docker socket của host (`/var/run/docker.sock`) vào container. Điều này cho phép tiến trình bên trong container giao tiếp trực tiếp với **Docker daemon của host**.

**Điểm chính:** các container được khởi tạo từ bên trong container DooD xuất hiện như **anh em (sibling)** với container ứng dụng web, chứ không phải con. Chúng chạy trực tiếp trên host, có quyền truy cập tài nguyên và volume của host.

**Kiến trúc:**

```
Host System
├── Docker Daemon (listening on /var/run/docker.sock)
├── Host volumes (/data, /workspace)
│
└── Web App Container (RStudio/JupyterLab/Code Server)
    ├── Mounts: /var/run/docker.sock:/var/run/docker.sock
    ├── Mounts: /data:/data, /workspace:/workspace
    │
    ├── User runs: docker run quay.io/biocontainers/bwa:latest ...
    │
    └── → Uses HOST Docker daemon to spawn sibling container
        → Spawned container has full access to host volumes
        → Results written back to shared volume
        → Web app container can access results
```

### 2.2 Vì sao cách này thuận tiện

**Overhead tài nguyên thấp**
- Không có Docker daemon lồng nhau
- Overhead bộ nhớ/CPU tối thiểu
- Khởi tạo container nhanh (~100ms)

**Chia sẻ volume đơn giản**
- Cả ứng dụng web lẫn container được khởi tạo đều đọc/ghi được volume chia sẻ
- Không có tầng mount phức tạp
- Truy cập trực tiếp hệ thống file của host

**Truy cập Docker đầy đủ**
- `docker ps`, `docker pull`, `docker build` đều hoạt động
- Có thể quản lý image và container từ bên trong ứng dụng web

## 3. Thiết lập RStudio với DooD

### 3.1 Chạy RStudio với mount Docker socket

**RStudio cơ bản với DooD:**

```bash
#!/bin/bash
docker run \
  --rm \
  -p 8787:8787 \
  -e PASSWORD=mypassword \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /home/user/data:/data \
  -v /home/user/workspace:/workspace \
  rocker/tidyverse:latest
```

**Giải thích:**
- `-p 8787:8787`: giao diện web RStudio trên cổng 8787
- `-e PASSWORD=mypassword`: đặt mật khẩu RStudio
- `-v /var/run/docker.sock:/var/run/docker.sock`: mount Docker socket (bật DooD)
- `-v /home/user/data:/data`: chia sẻ thư mục dữ liệu
- `-v /home/user/workspace:/workspace`: chia sẻ thư mục workspace

### 3.2 Dùng Docker từ bên trong RStudio

Khi RStudio đã chạy, có thể dùng Docker trực tiếp từ R console hoặc shell.

**Chạy samtools từ RStudio:**

```r
# In RStudio console
system('docker run --rm -v /data:/data quay.io/biocontainers/samtools:latest samtools view -h /data/input.bam | head')
```

**Chạy căn chỉnh bwa:**

```r
# Run bwa in Docker container
cmd <- 'docker run --rm -v /data:/data -v /workspace:/workspace quay.io/biocontainers/bwa:latest bwa mem /data/ref.fa /data/reads.fastq > /workspace/aligned.sam'
system(cmd)

# Read results back into R
alignment <- read.table('/workspace/aligned.sam', skip=10)
head(alignment)
```

**Chạy Cell Ranger từ RStudio:**

```r
# In RStudio terminal or system()
system('
docker run --rm \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v /data:/data \\
  cellranger:v7.0 \\
  cellranger count \\
    --id=sample1 \\
    --fastqs=/data/fastqs \\
    --transcriptome=/data/reference
')

# Load results
library(Seurat)
data <- Read10X_h5('/data/sample1/outs/filtered_feature_bc_matrix.h5')
```

### 3.3 Cấu hình Docker Compose cho RStudio

**Một thiết lập sẵn sàng production hơn với docker-compose:**

```yaml
version: '3.8'

services:
  rstudio:
    image: rocker/tidyverse:4.3.0
    container_name: rstudio-analysis
    ports:
      - "8787:8787"
    environment:
      - PASSWORD=secure_password
      - USER=researcher
    volumes:
      # Mount Docker socket for DooD
      - /var/run/docker.sock:/var/run/docker.sock
      # Mount data directories
      - ./data:/data:rw
      - ./workspace:/workspace:rw
      - ./projects:/home/rstudio/projects:rw
    restart: unless-stopped
    # Optional: limit resources
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 16G
```

**Chạy bằng:**

```bash
docker-compose up -d
# Access at http://localhost:8787
# Username: researcher
# Password: secure_password
```

## 4. Thiết lập JupyterLab với DooD

### 4.1 Chạy JupyterLab với mount Docker socket

**JupyterLab cơ bản với DooD:**

```bash
#!/bin/bash
docker run \
  --rm \
  -p 8888:8888 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /home/user/data:/data \
  -v /home/user/notebooks:/notebooks \
  jupyter/scipy-notebook:latest \
  jupyter lab --ip=0.0.0.0 --allow-root --no-browser
```

**Lấy token từ log:**

```bash
# Output will show: http://127.0.0.1:8888/lab?token=xxxxx
# Use that to access JupyterLab in browser
```

### 4.2 Dùng Docker từ notebook JupyterLab

**Chạy công cụ bioinformatics trong cell notebook:**

```python
# In JupyterLab cell - run samtools in Docker
import subprocess

result = subprocess.run([
    'docker', 'run', '--rm',
    '-v', '/data:/data',
    'quay.io/biocontainers/samtools:latest',
    'samtools', 'view', '-h', '/data/input.bam'
], capture_output=True, text=True)

print(result.stdout)
```

**Xử lý với Docker và tích hợp Python:**

```python
# Cell 1: Run analysis in container
import subprocess
import json

# Run Cell Ranger in Docker
subprocess.run([
    'docker', 'run', '--rm',
    '-v', '/data:/data',
    'cellranger:v7.0',
    'cellranger', 'count',
    '--id=sample1',
    '--fastqs=/data/fastqs',
    '--transcriptome=/data/reference'
])

# Cell 2: Load results in Python
import scanpy as sc

adata = sc.read_h5ad('/data/sample1/outs/filtered_feature_bc_matrix.h5')
print(adata)
```

**Chạy FastQC trên nhiều mẫu:**

```python
import subprocess
import os
from pathlib import Path

fastq_dir = '/data/fastqs'

# Run FastQC on all FASTQ files
for fastq_file in Path(fastq_dir).glob('*.fastq.gz'):
    subprocess.run([
        'docker', 'run', '--rm',
        '-v', '/data:/data',
        'quay.io/biocontainers/fastqc:latest',
        'fastqc',
        f'/data/fastqs/{fastq_file.name}',
        '-o', '/data/qc_results'
    ])

print("FastQC analysis complete")
```

### 4.3 Cấu hình Docker Compose cho JupyterLab

```yaml
version: '3.8'

services:
  jupyter:
    image: jupyter/scipy-notebook:latest
    container_name: jupyterlab-analysis
    ports:
      - "8888:8888"
    volumes:
      # Mount Docker socket for DooD
      - /var/run/docker.sock:/var/run/docker.sock
      # Mount analysis directories
      - ./data:/data:rw
      - ./notebooks:/notebooks:rw
      - ./output:/output:rw
    environment:
      - JUPYTER_ENABLE_LAB=yes
    command: >
      jupyter lab 
      --ip=0.0.0.0 
      --port=8888 
      --allow-root 
      --no-browser
    restart: unless-stopped
```

## 5. Thiết lập Code Server với DooD

### 5.1 Chạy Code Server với mount Docker socket

**Code Server với quyền truy cập Docker đầy đủ:**

```bash
#!/bin/bash
docker run \
  --rm \
  -p 8443:8443 \
  -e PASSWORD=mypassword \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /home/user/workspace:/home/coder/project \
  -v /home/user/data:/data \
  codercom/code-server:latest
```

**Truy cập tại:** https://localhost:8443

### 5.2 Dùng Docker từ Code Server

**Terminal tích hợp cho lệnh Docker:**

```bash
# In Code Server terminal
docker ps
docker pull quay.io/biocontainers/nextflow:latest
docker run --rm quay.io/biocontainers/nextflow:latest nextflow --version
```

**Chạy và debug workflow Nextflow:**

```bash
# In Code Server terminal - edit Nextflow script
cat > /workspace/main.nf << 'EOF'
process alignment {
  container 'quay.io/biocontainers/bwa:latest'
  input:
  path reference
  path reads
  
  output:
  path "*.sam"
  
  script:
  """
  bwa mem $reference $reads > aligned.sam
  """
}
EOF

# Run workflow locally with Docker
nextflow run main.nf -with-docker
```

### 5.3 Cấu hình Docker Compose cho Code Server

```yaml
version: '3.8'

services:
  code-server:
    image: codercom/code-server:latest
    container_name: code-server-dev
    ports:
      - "8443:8443"
    environment:
      - PASSWORD=secure_password
      - SUDO_PASSWORD=secure_password
    volumes:
      # Mount Docker socket for DooD
      - /var/run/docker.sock:/var/run/docker.sock
      # Mount workspace
      - ./workspace:/home/coder/project:rw
      - ./data:/data:rw
    restart: unless-stopped
```

## 6. Thiết lập nhiều ứng dụng với Docker Compose

**Chạy RStudio, JupyterLab và Code Server cùng nhau:**

```yaml
version: '3.8'

services:
  rstudio:
    image: rocker/tidyverse:4.3.0
    container_name: rstudio
    ports:
      - "8787:8787"
    environment:
      - PASSWORD=rstudio_password
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/data:rw
      - ./workspace:/workspace:rw
    restart: unless-stopped

  jupyter:
    image: jupyter/scipy-notebook:latest
    container_name: jupyter
    ports:
      - "8888:8888"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/data:rw
      - ./notebooks:/notebooks:rw
    command: >
      jupyter lab 
      --ip=0.0.0.0 
      --allow-root 
      --no-browser
    restart: unless-stopped

  code-server:
    image: codercom/code-server:latest
    container_name: code-server
    ports:
      - "8443:8443"
    environment:
      - PASSWORD=code_password
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./workspace:/home/coder/project:rw
      - ./data:/data:rw
    restart: unless-stopped

  # Optional: shared data volume container
  data:
    image: alpine:latest
    volumes:
      - ./data:/data:rw
    command: /bin/sh -c "echo 'Data container for shared volumes'"
```

**Chạy tất cả dịch vụ:**

```bash
docker-compose up -d

# Access:
# RStudio: http://localhost:8787
# JupyterLab: http://localhost:8888
# Code Server: https://localhost:8443
```

## 7. Những điều cần cân nhắc với DooD

### 7.1 Cân nhắc bảo mật

**Quyền file:**

```bash
#!/bin/bash
# Files created in Docker containers may have root ownership
# Run containers with explicit user mapping

docker run \
  -u $(id -u):$(id -g) \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /data:/data \
  ubuntu:22.04 \
  touch /data/file.txt
```

**Truy cập Docker daemon:**

**Cảnh báo**: mount `/var/run/docker.sock` cấp toàn quyền truy cập Docker daemon. Chỉ làm điều này trong:

- Môi trường phát triển
- Hệ thống nội bộ đáng tin cậy
- Máy trạm của chính bạn
- Môi trường nhóm được kiểm soát

**Không** để lộ điều này cho người dùng không đáng tin hoặc internet công khai.

### 7.2 Quản lý tài nguyên

**Giới hạn tài nguyên container:**

```bash
docker run \
  --cpus 4 \
  --memory 16g \
  -v /var/run/docker.sock:/var/run/docker.sock \
  rocker/tidyverse:latest
```

**Trong docker-compose:**

```yaml
services:
  rstudio:
    image: rocker/tidyverse:latest
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 16G
        reservations:
          cpus: '2'
          memory: 8G
```

### 7.3 Quản lý volume

**Thực hành cho volume chia sẻ:**

```bash
#!/bin/bash
# Create named volume for data persistence
docker volume create analysis-data

# Mount in multiple containers
docker run -v analysis-data:/data rstudio
docker run -v analysis-data:/data jupyter
docker run -v analysis-data:/data code-server
```

## 8. Xử lý sự cố

### 8.1 Bị từ chối quyền với Docker socket

**Vấn đề:** `Cannot connect to Docker daemon`

**Giải pháp:**

```bash
# Check Docker socket permissions
ls -la /var/run/docker.sock

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Or run container with docker group
docker run \
  --group-add $(getent group docker | cut -d: -f3) \
  -v /var/run/docker.sock:/var/run/docker.sock \
  rocker/tidyverse:latest
```

### 8.2 Vấn đề quyền file

**Vấn đề:** không sửa được file do container Docker tạo ra

**Giải pháp:**

```bash
# Run containers with user/group mapping
docker run \
  -u $(id -u):$(id -g) \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /data:/data \
  rocker/tidyverse:latest
```

### 8.3 Volume mount không hiển thị

**Vấn đề:** file trong volume được mount không hiển thị từ ứng dụng web

**Giải pháp:**

```bash
# Verify volume is mounted
docker inspect rstudio-container | grep Mounts

# Use absolute paths
docker run \
  -v /home/user/data:/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  rocker/tidyverse:latest
```

## 9. Tóm tắt

Docker out of Docker là một cách thực tế để chạy ứng dụng web tương tác cần khởi tạo công cụ bioinformatics dạng container. Nó cung cấp:

- **Hiệu năng**: không có overhead daemon lồng nhau
- **Đơn giản**: chỉ cần mount Docker socket
- **Chức năng**: quyền truy cập Docker CLI đầy đủ từ trong ứng dụng web
- **Chia sẻ dữ liệu**: truy cập volume giữa các container

**Điểm chính:**
- Mount `/var/run/docker.sock` để bật DooD
- Mount volume dữ liệu để chia sẻ file
- Dùng cho workflow RStudio, JupyterLab và Code Server
- Phù hợp với phát triển cục bộ và môi trường nhóm đáng tin cậy
- Kết hợp với docker-compose cho thiết lập nhiều ứng dụng

## Tài liệu tham khảo

- Tài liệu Docker socket và Docker daemon: [docs.docker.com/engine/security](https://docs.docker.com/engine/security/)
- Tham chiếu Docker Compose file: [docs.docker.com/compose/compose-file](https://docs.docker.com/compose/compose-file/)
- Image RStudio (Rocker): [rocker-project.org](https://rocker-project.org/)
- Jupyter Docker Stacks: [jupyter-docker-stacks.readthedocs.io](https://jupyter-docker-stacks.readthedocs.io/)
- Code Server: [github.com/coder/code-server](https://github.com/coder/code-server)
- BioContainers trên quay.io: [quay.io/organization/biocontainers](https://quay.io/organization/biocontainers)
- Tài liệu container của Nextflow: [nextflow.io/docs/latest/container.html](https://www.nextflow.io/docs/latest/container.html)
- Container trên HPC: [Container trên HPC: từ Docker đến Singularity và Apptainer](/blogs/containers-hpc-docker-singularity-apptainer)
