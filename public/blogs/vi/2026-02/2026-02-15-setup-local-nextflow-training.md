---
slug: setup-local-nextflow-training
title: "Thiết lập môi trường huấn luyện Nextflow cục bộ với code-server và một cụm HPC"
description: "Hướng dẫn chạy code-server như một job Slurm trên cụm HPC và truy cập từ laptop qua một SSH tunnel, với Nextflow, Singularity, nf-core và nf-test được cài qua Pixi."
authors: [vieomics]
tags: [nextflow, singularity, code-server, hpc, setup, training]
image: ./imgs/intro.png
---

Một môi trường huấn luyện Nextflow dùng được cả trên laptop lẫn trên cụm HPC rất thuận tiện cho một nhóm cùng làm các bài tập giống nhau. [code-server](https://github.com/coder/code-server) chạy VS Code trong trình duyệt và có thể được khởi động như một job Slurm trên một compute node, nên học viên chỉ cần một trình duyệt và một kết nối SSH thay vì cài đặt cục bộ.

Hướng dẫn này trình bày cách khởi chạy code-server như một job Slurm, cách truy cập từ máy cục bộ qua một SSH tunnel, cách cài các extension VS Code cần thiết, và cách xác nhận rằng Nextflow, Singularity, nf-core và nf-test đã sẵn sàng.

Để có phần giới thiệu về Pixi và quản lý gói, xem bài viết của chúng tôi về [Pixi, trình quản lý gói dựa trên conda](/blogs/pixi-is-new-conda-based-era).

<!--truncate-->

## 1. Cài code-server bằng Pixi

Code-server chạy VS Code trong trình duyệt, giúp dùng được trên một cụm mà không cần cài trình soạn thảo cục bộ. Ở đây nó được cài qua Pixi để phiên bản công cụ được quản lý cùng với các công cụ khác.

### 1.1. Code-server là gì?

Code-server chạy VS Code trong trình duyệt, mang lại giao diện quen thuộc khi làm việc trên một hệ thống từ xa. Điều này phù hợp với:
- môi trường cụm HPC
- tài nguyên tính toán dùng chung
- làm việc từ nhiều máy
- cộng tác trong nhóm trên các dự án huấn luyện

### 1.2. Hiểu về Pixi

Pixi là một trình quản lý gói có thể cài các công cụ như Nextflow và Singularity. Chi tiết thêm về Pixi có trong bài viết của chúng tôi về [Pixi, trình quản lý gói dựa trên conda](/blogs/pixi-is-new-conda-based-era).

Trong hướng dẫn này, Pixi quản lý code-server, Nextflow, Singularity và các công cụ nf-core bên trong một job SLURM.

### 1.3. Khởi chạy code-server như một job Slurm

Gửi code-server như một batch job của Slurm giúp cấp phát tài nguyên cần thiết và giữ nó chạy trên một compute node.

Tạo một script job Slurm để cài và khởi động code-server:

```bash
# Create sbatch script
cat > ~/code-server-job.sh << 'EOF'
#!/bin/bash
#SBATCH --job-name=code-server
#SBATCH --time=24:00:00
#SBATCH --cpus-per-task=2
#SBATCH --mem=4GB
#SBATCH --output=%x-%j.log

# Install Pixi (one time per node)
curl -fsSL https://pixi.sh/install.sh | bash
export PATH="$HOME/.pixi/bin:$PATH"

# Install code-server and all tools using Pixi
pixi global install code-server open-jdk nextflow singularity nf-core nf-test

# Create code-server configuration directory
mkdir -p ~/.config/code-server

# Create configuration file
cat > ~/.config/code-server/config.yaml << 'CONFIGEOF'
bind-addr: 127.0.0.1:8080
auth: password
password: your-secure-password
cert: false
CONFIGEOF

# Start code-server
echo "Starting code-server on $HOSTNAME:8080"
echo "Job ID: $SLURM_JOB_ID"
echo "Node: $SLURM_NODENAME"

code-server --bind-addr 0.0.0.0:8080
EOF

# Make script executable
chmod +x ~/code-server-job.sh

# Submit the job
sbatch ~/code-server-job.sh
```

Kiểm tra trạng thái job và tìm node mà nó đang chạy:

```bash
# Check running jobs
squeue -u $USER

# You should see output like:
# JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
# 12345       gpu code-serv    user  R       0:15      1 compute-node-05

# Check the log file for connection details
cat code-server-12345.log
```
![job_log](./imgs/sbatch_codeserver.png)

## 2. Truy cập code-server từ máy cục bộ qua SSH tunnel

Code-server đang chạy trên một compute node qua job Slurm. Để truy cập từ máy cục bộ, một SSH tunnel được tạo qua login node tới compute node đó.

### 2.1. Tìm node của job code-server

Trước tiên, xác định compute node mà job code-server đang chạy:

```bash
# SSH into HPC login node
ssh user@hpc.server.edu

# Check your running jobs
squeue -u $USER

# Output example:
# JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
# 12345      multi code-serv    user  R       5:30      1 worker-01

# Note the node name (worker-01 in this example)

# Verify code-server is running
ssh worker-01 'curl http://localhost:8080' 2>/dev/null | head -5
```

### 2.2. Tạo SSH tunnel từ máy cục bộ

Cấu hình chuyển tiếp cổng từ máy cục bộ qua login node tới compute node đang chạy code-server:

```bash
# Replace worker-01 with your actual node name
# This creates a tunnel: local:8080 → login node → worker-01:8080
ssh -L 8080:worker-01:8080 user@hpc.server.edu

# Keep this terminal open while using code-server
# Open browser and navigate to: http://localhost:8080
# Enter password: your-secure-password (from sbatch script)
```

**Định dạng lệnh tunnel là:**
```bash
ssh -L local_port:compute_node:remote_port user@login_node
```

Trong đó:
- `local_port`: cổng trên máy cục bộ (8080)
- `compute_node`: tên node từ `squeue` (ví dụ worker-01)
- `remote_port`: cổng mà code-server lắng nghe (8080)
- `login_node`: login node HPC của bạn (hpc.server.edu)

### 2.3. Tunnel chạy nền (tuỳ chọn)

Để có một tunnel tồn tại lâu dài mà không cần giữ terminal mở:

```bash
# Run tunnel in background
ssh -L 8080:worker-01:8080 user@hpc.server.edu -N -f

# To close the tunnel later
killall ssh
```

:::warning
`killall ssh` kết thúc mọi tiến trình `ssh` thuộc người dùng hiện tại, có thể đóng cả những phiên khác. Nên đóng đúng tunnel cần đóng thay vì dùng lệnh này.
:::

### 2.4. Thiết lập SSH config cho tiện

Để truy cập lặp lại dễ dàng hơn, thêm host HPC vào `~/.ssh/config` trên máy cục bộ:

```
Host hpc-dev
    HostName hpc.server.edu
    User your_username
    LocalForward 8080 localhost:8080
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

Sau đó kết nối bằng:

```bash
ssh hpc-dev
# Port 8080 is now forwarded to your HPC's code-server
```

**Lưu ý:** cách dùng SSH config này chuyển tiếp tới `localhost:8080` trên login node. Với thiết lập trên compute node SLURM, hãy dùng lệnh trực tiếp với hostname của compute node.

### 2.5. Truy cập code-server

Khi tunnel đã hoạt động, mở trình duyệt và truy cập:

```
http://localhost:8080
```

Nhập mật khẩu từ cấu hình code-server. Màn hình chào mừng của VS Code sẽ hiện ra.

![password](./imgs/code_server_password.png)

## 3. Cài extension và kiểm tra các công cụ

Khi code-server đã truy cập được từ máy cục bộ, bước tiếp theo là cài các extension cần thiết và kiểm tra các công cụ.

### 3.1. Kiểm tra các công cụ

Trước tiên, xác nhận rằng các công cụ đã được cài trong job code-server:

```bash
# In the code-server terminal (access via http://localhost:8080)
# Check installed tools

nextflow -v
singularity --version
nf-core --version
nf-test --version
```

Nếu thiếu một công cụ, có thể cài ngay từ cùng terminal:

```bash
# Install any missing tools
pixi global install nextflow singularity nf-core nf-test
```

### 3.2. Cài extension code-server trong trình duyệt

Có thể cài extension trực tiếp trong code-server:

1. Mở Extensions marketplace (Ctrl+Shift+X hoặc Cmd+Shift+X) hay bảng extensions ở thanh bên, và tìm **nf-core-extensionpack**, một bộ sưu tập extension hỗ trợ phát triển Nextflow.

![search_ext](./imgs/extensions_search.png)

2. Xác nhận cài đặt:
   - **nf-core-extensionpack**: tập extension dùng cho huấn luyện Nextflow

![installed_ext](./imgs/installed_extension_pack.png)

### 3.3. Kiểm tra thiết lập

Khi công cụ và extension đã có, chạy một kiểm tra đơn giản:

```bash
# In the code-server terminal, run a simple test
nextflow run hello-world.nf
```
![testing](./imgs/test_codeserver_hello_world_nf.png)

## 4. Thực hành và mẹo

Với các buổi huấn luyện định kỳ, một vài script nhỏ giúp thiết lập thuận tiện hơn.

### 4.1. Alias code-server thường trực

Để huấn luyện thường xuyên, một alias hoặc script giúp việc gửi job gọn hơn:

```bash
# Add to ~/.bashrc
alias submit-code-server='sbatch ~/code-server-job.sh && sleep 5 && squeue -u $USER | grep code-server'

# Now you can easily submit with:
submit-code-server
```

### 4.2. Script hỗ trợ gửi job

Một script cũng có thể tự động thiết lập tunnel:

```bash
# Save as ~/tunnel-to-code-server.sh on your LOCAL machine
#!/bin/bash

# SSH to HPC and check code-server job
NODE=$(ssh user@hpc.server.edu "squeue -u \$USER --format=%N --noheader | grep compute" | head -1)

if [ -z "$NODE" ]; then
    echo "No compute node found. Submit code-server job first!"
    exit 1
fi

echo "Found code-server on node: $NODE"
echo "Creating tunnel to http://localhost:8080"
echo "Press Ctrl+C to close tunnel"

ssh -L 8080:$NODE:8080 user@hpc.server.edu
```

Cấp quyền thực thi và dùng nó:

```bash
chmod +x ~/tunnel-to-code-server.sh
~/tunnel-to-code-server.sh
```

### 4.3. Cân nhắc bảo mật

- dùng mật khẩu mạnh và riêng biệt trong `config.yaml`
- chỉ chuyển tiếp cổng 8080 qua SSH; không mở nó ra internet
- đổi mật khẩu định kỳ cho các tài khoản huấn luyện
- đặt giới hạn thời gian job Slurm phù hợp (24 giờ trong ví dụ)
- huỷ các job code-server không dùng để giải phóng tài nguyên

### 4.4. Cấp phát tài nguyên

Script Slurm ví dụ cấp phát:

- **2 CPU**: đủ cho code-server và phát triển nhẹ
- **4GB RAM**: thoải mái cho code-server và làm việc trên terminal
- **24 giờ**: một ngày làm việc

Có thể điều chỉnh:

```bash
# For heavier computation (running larger workflows)
#SBATCH --cpus-per-task=4
#SBATCH --mem=8GB

# For shorter sessions (testing)
#SBATCH --time=4:00:00

# To use GPU (if available)
#SBATCH --gres=gpu:1
```

## 5. Tóm tắt

### Thiết lập này mang lại gì

Kết quả là một môi trường huấn luyện Nextflow với:

**Hạ tầng:**
- code-server chạy như một job Slurm thường trực trên các compute node HPC
- SSH tunnel để truy cập từ xa từ máy cục bộ
- giao diện VS Code trong trình duyệt, truy cập được từ bất kỳ đâu có SSH client

**Công cụ và framework:**
- workflow engine Nextflow với tích hợp Slurm
- Singularity cho container tương thích HPC
- framework pipeline nf-core
- nf-test để kiểm định pipeline

**Cấu hình:**
- Nextflow được cấu hình với hỗ trợ Singularity
- các execution profile Slurm để gửi job
- code-server với xác thực bằng mật khẩu

### Các điểm chính

1. **Triển khai bằng một script sbatch**: Pixi, code-server, Nextflow, Singularity, nf-core và nf-test được cài trong một job SLURM.
2. **Truy cập qua SSH tunnel**: SSH tunnel nhiều chặng (`local → login node → compute node`) truy cập code-server mà không lộ hệ thống HPC.
3. **Môi trường phát triển thường trực**: code-server chạy như một job Slurm được quản lý, nên tồn tại qua các lần mất kết nối mạng.
4. **IDE trong trình duyệt**: VS Code trong trình duyệt dùng được trên bất kỳ thiết bị nào có SSH client, không cần cài cục bộ.
5. **Tích hợp SLURM**: Nextflow được cấu hình để gửi từng task của workflow tới Slurm.
6. **Phù hợp cho huấn luyện**: thiết lập có thể tái sử dụng cho huấn luyện nhóm và cho công việc Nextflow có thể tái lập.

### Quy trình tham khảo nhanh

```bash
# Step 1: Submit code-server job (one time)
sbatch ~/code-server-job.sh

# Step 2: Find compute node
squeue -u $USER

# Step 3: Create SSH tunnel (from local machine)
ssh -L 8080:worker-01:8080 user@hpc.server.edu

# Step 4: Access in browser
http://localhost:8080

# Step 5: Run workflows
nextflow run main.nf -profile singularity
```

### Các bước tiếp theo

1. **Tuỳ chỉnh script sbatch** cho môi trường HPC (tên queue, thông tin account, v.v.)
2. **Kiểm thử thiết lập** với một workflow `nf-core` đơn giản
3. **Tạo pipeline huấn luyện** bằng `nf-core create`
4. **Mời học viên** cùng dùng môi trường đó
5. **Theo dõi tài nguyên** bằng các lệnh Slurm (`squeue`, `sacct`, `sinfo`)

### Mẹo gỡ lỗi

- nếu code-server không khởi động, kiểm tra tệp log: `cat code-server-*.log`
- nếu SSH tunnel thất bại, xác nhận compute node truy cập được: `ssh user@hpc.server.edu ssh worker-01 hostname`
- nếu thiếu một công cụ, cài lại bằng: `pixi global install nextflow singularity nf-core nf-test`
- để có tunnel thường trực, có thể dùng script hỗ trợ ở mục 4.2

## Tài liệu tham khảo

- Tài liệu Nextflow: [nextflow.io/docs/latest](https://www.nextflow.io/docs/latest/)
- nf-core: [nf-co.re](https://nf-co.re/)
- nf-test: [nf-test.com](https://www.nf-test.com/)
- Apptainer / Singularity: [apptainer.org](https://apptainer.org/)
- code-server: [github.com/coder/code-server](https://github.com/coder/code-server)
- Tài liệu Slurm: [slurm.schedmd.com](https://slurm.schedmd.com/)
- Trang manual OpenSSH: [openssh.com/manual.html](https://www.openssh.com/manual.html)
- Pixi: [pixi.sh](https://pixi.sh)
