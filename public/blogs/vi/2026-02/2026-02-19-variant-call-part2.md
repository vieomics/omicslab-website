---
slug: gatk-variant-calling-bash-to-nextflow-validation-part2
title: "Gọi biến thể (Phần 2): Từ Bash sang Nextflow — chuyển đổi workflow GATK và kiểm chứng kết quả"
description: "Cách workflow bash mười bước ở Phần 1 được viết lại thành các module Nextflow, chạy trong container, mở rộng sang samplesheet, rồi được đối chiếu với kết quả bash bằng checksum."
series: Variant Calling from Bash to Production
seriesOrder: 2
authors: [vieomics]
tags: [gatk, nextflow, bash, bioinformatics, validation, md5, reproducibility, migration, workflow]
image: ./imgs/gatk-variant-calling-bash-to-nextflow-validation-part2.png
---

Ở [Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1), chúng tôi đã xây dựng một pipeline gọi biến thể GATK gồm mười bước bằng bash. Cách làm đó phù hợp với số mẫu ít, nhưng trở nên khó quản lý khi số mẫu tăng lên. Bài này viết lại các bước tương tự thành các process của Nextflow, chạy chúng trong container, rồi kiểm tra — bằng checksum — rằng hai cách hiện thực cho ra kết quả tương đương.

> **Repository**: mã nguồn của bài hướng dẫn này nằm trong repository [nf-germline-short-read-variant-calling](https://github.com/nttg8100/nf-germline-short-read-variant-calling/tree/0.1.0/), với hai thư mục riêng cho bản bash (`bash-gatk`) và bản Nextflow (`nextflow-gatk`).

<!--truncate-->

:::info
Mã nguồn của bài hướng dẫn này có trong GitHub repository: **https://github.com/nttg8100/nf-germline-short-read-variant-calling/tree/0.1.0**
:::

## Tổng quan chuỗi bài

1. [Phần 1 — workflow bash với môi trường Pixi tái lập được](/blogs/gatk-variant-calling-bash-workflow-pixi-part1).
2. **Phần 2 (bài này)** — chuyển các bước tương tự sang Nextflow và kiểm tra sự tương đồng của kết quả.
3. [Phần 3 — triển khai quy mô production](/blogs/gatk-variant-calling-production-slurm-optimization-part3): cấu hình SLURM và tinh chỉnh tài nguyên cho từng công cụ.
4. [Phần 4 — kiểm thử và lint](/blogs/gatk-variant-calling-production-slurm-optimization-part4).
5. [Phần 5 — benchmark](/blogs/gatk-variant-calling-production-slurm-optimization-part5).

## 1. Vì sao chuyển từ Bash sang Nextflow

### 1.1 Cách tiếp cận bằng bash (Phần 1)

Pipeline bash thuận tiện cho:

- **Phân tích quy mô nhỏ**: một vài mẫu.
- **Prototype**: thử nghiệm proof-of-concept nhanh.
- **Học tập**: theo dõi best practice của GATK từng bước.
- **Chạy cục bộ**: một máy, xử lý mẫu tuần tự.

Vì thực thi tuần tự, thời gian chạy tăng gần như tuyến tính theo số mẫu: một phép ngoại suy thô cho 1.000 mẫu nằm ở mức hàng chục giờ. Con số này nên được xem như ước lượng chứ không phải benchmark đo được, vì nó phụ thuộc vào phần cứng, độ phủ và phiên bản công cụ.

### 1.2 Cách tiếp cận bằng Nextflow (Phần 2)

Nextflow bổ sung:

- **Thực thi song song**: nhiều mẫu được xử lý đồng thời.
- **Executor cho HPC và cloud**: Slurm, SGE, AWS Batch, Google Cloud và nhiều nền tảng khác.
- **Tự động resume**: job lỗi hoặc bị ngắt sẽ chạy lại từ bước hoàn thành cuối cùng với `-resume`.
- **Tính tái lập**: container, quản lý phiên bản và audit trail cho từng task.
- **Khả năng mở rộng**: process được phân bố trên nhiều compute node.

Song song hóa theo mẫu là lý do chính giúp thời gian chạy giảm; mức tăng tốc cụ thể phụ thuộc vào số slot tính toán có sẵn chứ không phải một hệ số cố định.

## 2. Chạy pipeline bash để tạo mốc so sánh

Chạy pipeline bash đầy đủ từ Phần 1:

```bash
# Clone and setup repository (first time only)
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.1.0
cd nf-germline-short-read-variant-calling

# Install dependencies
pixi shell --manifest-path bash-gatk

# Download test data
bash scripts/download_data.sh

# Run pipeline
bash bash-gatk/gatk_pipeline.sh
```

## 3. Chuyển sang Nextflow

### 3.1 Các mẫu thiết kế

Các workflow manager như Nextflow, Snakemake và Cromwell chia sẻ một vài ý tưởng cốt lõi.

#### 3.1.1 Kịch bản dựa trên template

Một template script được định nghĩa với các placeholder cho biến, và workflow engine điền giá trị thực tế vào lúc chạy.

Ví dụ:

```bash
fastqc {{fastq_r1}} {{fastq_r2}}
```

#### 3.1.2 Container hóa

Container cung cấp môi trường tái lập được và kết quả nhất quán giữa các hệ thống.

Ví dụ:

```bash
# Pull container image
singularity pull quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0

# Run FastQC inside the container
singularity run fastqc_0.12.1--hdfd78af_0.sif fastqc {{fastq_r1}} {{fastq_r2}}
```

#### 3.1.3 Lập lịch và quản lý tài nguyên

Scheduler tối ưu việc dùng tài nguyên bằng cách chạy nhiều task song song trong giới hạn CPU và bộ nhớ. Chúng cũng hỗ trợ chạy trên cluster hoặc cloud, quản lý phụ thuộc giữa các bước và chỉ khởi động bước sau khi đầu vào đã sẵn sàng.

- Chạy nhiều mẫu đồng thời, ví dụ bốn mẫu cùng lúc với 2 CPU và 4 GB RAM mỗi mẫu.
- Phân bố task trên các node trong cluster hoặc trên cloud.
- Tự động xử lý phụ thuộc và thứ tự thực thi.

### 3.2 Tổng quan project Nextflow

Project Nextflow hoàn chỉnh có trong [thư mục `nextflow-gatk`](https://github.com/nttg8100/nf-germline-short-read-variant-calling/tree/0.1.0/nextflow-gatk):

```bash
nextflow-gatk
├── main.nf
├── modules
│   ├── bwa_mem.nf
│   ├── fastqc.nf
│   ├── gatk_applybqsr.nf
│   ├── gatk_baserecalibrator.nf
│   ├── gatk_collectmetrics.nf
│   ├── gatk_genotypegvcfs.nf
│   ├── gatk_haplotypecaller.nf
│   ├── gatk_markduplicates.nf
│   ├── samtools_sort.nf
│   └── trim_galore.nf
├── nextflow.config
├── pixi.lock
├── pixi.toml
```

Mỗi bước được tách thành một `module` rồi import vào `main.nf`. Cách này giúp từng bước dễ tái sử dụng hơn.

### 3.3 Workflow đầu tiên

Tạo file `main.nf`:

:::info
Một process cơ bản cần:

+ khai báo process, `process <PROCESS_NAME>`, để định nghĩa process;
+ `input`, định nghĩa các channel dùng làm đầu vào — có thể là file, string, số hoặc tổ hợp của chúng viết dưới dạng `tuple`, tương tự dictionary trong Python;
+ `output`, định nghĩa các channel đầu ra, dùng biểu thức chính quy để thu thập các file được tạo ra;
+ `script`, template code nội suy các biến đầu vào và cấu hình của process thành câu lệnh thực sự được chạy.
:::

```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl=2 // enable DSL2
// Define the module as template
process FASTQC {
    input:
    tuple val(meta), path(reads) // input variable, example: [sample, [/path/read1.fq, /path/read2.fq ]]
    
    output:
    tuple val(meta), path("*.html") // output variable, example: [sample, [/path/read1.html, /path/read2.html ]]
    
    script: // template that has been mentioned above
    """
    # Quality Control with FastQC
    # This generates HTML and ZIP files with quality metrics
    fastqc $reads
    """
}

// You need to define the workflow to call to tool to run
workflow {
    // Prepare the channel which later is allow the workflow to know how to get input, output to run
    ch_input = Channel.of([ params.sample , [file(params.fastq_r1), file(params.fastq_r2)] ]) // For file, we simply add with file()
    // ch_input.view() // print statement that you can view what it is, ex: [sample1, [/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz, /nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz]]
    // Run workflow
    FASTQC (
        ch_input
    )
}
```

Tạo một thư mục làm việc:

```bash
# env setup
mkdir -p temp
cd temp
pixi init
pixi add nextflow singularity
pixi shell
pixi add fastqc
# add the workflow, check folder structure
tree .
├── main.nf
├── pixi.lock
└── pixi.toml

# now you can run it 
nextflow run main.nf \
    --sample sample1 \
    --fastq_r1 https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz \
    --fastq_r2 https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz

# not only nextflow, but many tool will help you to resume your work, ignore re-run if it was ran before.
# with nextflow, it can be easy done by adding `-resume`
nextflow run main.nf -resume \
    --sample sample1 \
    --fastq_r1 https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz \
    --fastq_r2 https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz
```

![simple_wf](./imgs/simple_workflow.png)

:::info
Một số việc được xử lý tự động ở đây:

+ File đầu vào được tải về từ URL từ xa.
+ Một script được sinh ra để chạy bước đó với thiết lập phù hợp.
+ Một thư mục `work` được tạo với thư mục con đặt tên theo hash cho mỗi task, và mỗi task có thể chạy lại độc lập bên ngoài Nextflow.
:::

### 3.4 Xem bên trong thư mục task

Chuyển vào một thư mục con trong `work` để xem cấu trúc. Những gì Nextflow tạo ở đó là một bản ghi khép kín của một task:

- `.command.begin`: file đánh dấu thời điểm task bắt đầu.
- `.command.err`: standard error của process, hữu ích khi debug.
- `.command.log`: gộp standard output và standard error.
- `.command.out`: standard output của process.
- `.command.run`: script wrapper của chính Nextflow; nó xử lý thiết lập môi trường, stage file, chạy container, xử lý lỗi, và cuối cùng chạy script của bạn.
- `.command.sh`: khối script bạn viết trong process — chính là các câu lệnh khoa học, ví dụ chạy FastQC.

**Tóm lại:**

- `.command.sh` là logic pipeline của bạn.
- `.command.run` là wrapper tự động của Nextflow.
- `.command.out` và `.command.err` hỗ trợ debug.

Tất cả các file này cùng tạo thành một audit trail đầy đủ cho tính tái lập và xử lý sự cố. Một ví dụ đầy đủ về cấu trúc thư mục:

```bash
drwxrwxr-x 2 user user   4096 Feb 18 15:32 .
drwxrwxr-x 3 user user   4096 Feb 18 15:32 ..
-rw-rw-r-- 1 user user      0 Feb 18 15:32 .command.begin
-rw-rw-r-- 1 user user   1750 Feb 18 15:32 .command.err
-rw-rw-r-- 1 user user   1868 Feb 18 15:32 .command.log
-rw-rw-r-- 1 user user    118 Feb 18 15:32 .command.out
-rw-rw-r-- 1 user user   3758 Feb 18 15:32 .command.run       ← Wrapper script
-rw-rw-r-- 1 user user    347 Feb 18 15:32 .command.sh        ← Your actual script
-rw-rw-r-- 1 user user      1 Feb 18 15:32 .exitcode
-rw-rw-r-- 1 user user 598807 Feb 18 15:32 sample1_R1_fastqc.html
-rw-rw-r-- 1 user user 352734 Feb 18 15:32 sample1_R1_fastqc.zip
lrwxrwxrwx 1 user user    113 Feb 18 15:32 sample1_R1.fastq.gz -> /path/to/data/sample1_R1.fastq.gz
-rw-rw-r-- 1 user user 582761 Feb 18 15:32 sample1_R2_fastqc.html
-rw-rw-r-- 1 user user 326969 Feb 18 15:32 sample1_R2_fastqc.zip
lrwxrwxrwx 1 user user    113 Feb 18 15:32 sample1_R2.fastq.gz -> /path/to/data/sample1_R2.fastq.gz
-rw-rw-r-- 1 user user     50 Feb 18 15:32 versions.yml
```

:::tip
Về dòng `sample1_R2.fastq.gz -> /path/to/data/sample1_R2.fastq.gz`:

+ Mặc định, Nextflow tạo symlink tới file từ bước trước thay vì copy, qua đó giảm dung lượng đĩa sử dụng.
+ Nhờ vậy task hiện tại đọc được output của bước trước mà không nhân bản file.
+ Trên executor cloud, cách này kém hiệu quả hơn: mỗi process trên một máy riêng sẽ tải bản sao đầu vào của chính nó thay vì chia sẻ một filesystem tốc độ cao.
:::

Một phiên bản rút gọn của `.command.run` trông như sau:

```bash
#!/bin/bash
### ---
### name: 'FASTQC (1)'
### outputs:
### - '*.html'
### - '*.zip'
### ...
set -e
set -u
NXF_DEBUG=${NXF_DEBUG:=0}; [[ $NXF_DEBUG > 1 ]] && set -x
NXF_ENTRY=${1:-nxf_main}

# Sleep for a given number of seconds (fallback to 1s if error)
nxf_sleep() {
    sleep $1 2>/dev/null || sleep 1;
}

# Generate a timestamp in milliseconds
nxf_date() {
        local ts=$(date +%s%3N);
        if [[ ${#ts} == 10 ]]; then echo ${ts}000
        elif [[ $ts == *%3N ]]; then echo ${ts/\%3N/000}
        elif [[ $ts == *3N ]]; then echo ${ts/3N/000}
        elif [[ ${#ts} == 13 ]]; then echo $ts
        else echo "Unexpected timestamp value: $ts"; exit 1
        fi
}

# Print sorted environment variables, masking AWS credentials
nxf_env() {
        echo '============= task environment ============='
        env | sort | sed "s/\(.*\)AWS\(.*\)=\(.\{6\}\).*/\1AWS\2=\3xxxxxxxxxxxxx/"
        echo '============= task output =================='
}

# Kill a process and all its child processes
nxf_kill() {
        declare -a children
        while read P PP;do
                children[$PP]+=" $P"
        done < <(ps -e -o pid= -o ppid=)

        kill_all() {
                [[ $1 != $$ ]] && kill $1 2>/dev/null || true
                for i in ${children[$1]:=}; do kill_all $i; done
        }

        kill_all $1
}

# Create a temporary directory
nxf_mktemp() {
        local base=${1:-/tmp}
        mkdir -p "$base"
        if [[ $(uname) = Darwin ]]; then mktemp -d $base/nxf.XXXXXXXXXX
        else TMPDIR="$base" mktemp -d -t nxf.XXXXXXXXXX
        fi
}

# Copy files/directories recursively, preserving symlinks
nxf_fs_copy() {
    local source=$1
    local target=$2
    local basedir=$(dirname $1)
    mkdir -p $target/$basedir
    cp -fRL $source $target/$basedir
}

# Move files/directories recursively
nxf_fs_move() {
    local source=$1
    local target=$2
    local basedir=$(dirname $1)
    mkdir -p $target/$basedir
    mv -f $source $target/$basedir
}

# Rsync files/directories recursively
nxf_fs_rsync() {
    rsync -rRl $1 $2
}

# Copy files using rclone
nxf_fs_rclone() {
    rclone copyto $1 $2/$1
}

# Copy files using fcp
nxf_fs_fcp() {
    fcp $1 $2/$1
}

# Handler for process exit: sets exit code and exits
on_exit() {
        local last_err=$?
        local exit_status=${nxf_main_ret:=0}
        [[ ${exit_status} -eq 0 && ${nxf_unstage_ret:=0} -ne 0 ]] && exit_status=${nxf_unstage_ret:=0}
        [[ ${exit_status} -eq 0 && ${last_err} -ne 0 ]] && exit_status=${last_err}
        printf -- $exit_status > <repo>/tmp/work/4b/957bdd32e8e03d575e17185ef4f09a/.exitcode
        set +u
        exit $exit_status
}

# Handler for termination signals: kills child processes
on_term() {
        set +e
        [[ "$pid" ]] && nxf_kill $pid
}

# Launch the main command script
nxf_launch() {
        /bin/bash -ue <repo>/tmp/work/4b/957bdd32e8e03d575e17185ef4f09a/.command.sh
}

# Stage input files (create symlinks in work directory)
nxf_stage() {
        true
        # stage input files
        rm -f test_1.fastq.gz
        rm -f test_2.fastq.gz
        ln -s <repo>/tmp/work/stage-8a00ef45-80ce-4033-9494-354f1e68968c/a7/c6160733f5332acde30841c8d7cfb6/test_1.fastq.gz test_1.fastq.gz
        ln -s <repo>/tmp/work/stage-8a00ef45-80ce-4033-9494-354f1e68968c/2e/f8faa73d537d3b8bc792454dc541de/test_2.fastq.gz test_2.fastq.gz
}

# Unstage output files (placeholder, does nothing)
nxf_unstage_outputs() {
        true
}

# Unstage control files (placeholder, does nothing)
nxf_unstage_controls() {
        true
}

# Unstage outputs and controls after main execution
nxf_unstage() {
        if [[ ${nxf_main_ret:=0} == 0 ]]; then
                (set -e -o pipefail; (nxf_unstage_outputs | tee -a .command.out) 3>&1 1>&2 2>&3 | tee -a .command.err)
                nxf_unstage_ret=$?
        fi
        nxf_unstage_controls
}

# Main entry point: sets up traps, environment, stages files, runs command, unstages outputs
nxf_main() {
        trap on_exit EXIT
        trap on_term TERM INT USR2
        trap '' USR1

        [[ "${NXF_CHDIR:-}" ]] && cd "$NXF_CHDIR"
        NXF_SCRATCH=''
        [[ $NXF_DEBUG > 0 ]] && nxf_env
        touch <repo>/tmp/work/4b/957bdd32e8e03d575e17185ef4f09a/.command.begin
        set +u
        set -u
        [[ $NXF_SCRATCH ]] && cd $NXF_SCRATCH
        export NXF_TASK_WORKDIR="$PWD"
        nxf_stage

        set +e
        (set -o pipefail; (nxf_launch | tee .command.out) 3>&1 1>&2 2>&3 | tee .command.err) &
        pid=$!
        wait $pid || nxf_main_ret=$?
        nxf_unstage
}

# Run the entry point (default: nxf_main)
$NXF_ENTRY
```

Tóm lại, wrapper này:

+ tải dữ liệu đầu vào,
+ thực thi lệnh trong `.command.sh` thông qua `/bin/bash -ue <repo>/tmp/work/.../.command.sh`,
+ stage các file đầu ra.

### 3.5 Chạy workflow với container Singularity

:::info
+ Singularity, hay bất kỳ runtime container nào, là công nghệ giúp môi trường trở nên tái lập được.
+ Container có tính di động: môi trường có thể được tạo, tải lên nơi khác, rồi tải về dùng trên bất kỳ máy nào đã cấu hình runtime container.
+ Xem thêm: [Container trên HPC: từ Docker đến Singularity và Apptainer](/blogs/containers-hpc-docker-singularity-apptainer).
:::

Như đã nói ở trên, cấu hình Singularity có thể được thêm vào template:

```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl=2 // enable DSL2
// Define the module as template
process FASTQC {
    container 'quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0' // NEW CONFIG

    input:
    tuple val(meta), path(reads) // input variable, example: [sample, [/path/read1.fq, /path/read2.fq ]]
    
    output:
    tuple val(meta), path("*.html") // output variable, example: [sample, [/path/read1.html, /path/read2.html ]]
    
    script:
    """
    # Quality Control with FastQC
    # This generates HTML and ZIP files with quality metrics
    fastqc $reads
    """
}

workflow {
    ch_input = Channel.of([ params.sample , [file(params.fastq_r1), file(params.fastq_r2)] ])
    // Run workflow
    FASTQC (
        ch_input
    )   
}
```

Tạo file `nextflow.config` trong cùng thư mục:

```
singularity.enabled = true
singularity.autoMounts = true
```

```bash
nextflow run main.nf -resume \
    --sample sample1 \
    --fastq_r1 https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz \
    --fastq_r2 https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz
```

![singularity_nf](./imgs/singularity_nf.png)

**Điều gì xảy ra:**

1. Nextflow đọc chỉ thị `container` từ định nghĩa process.
2. Nó pull Docker image từ `quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0`.
3. Nó chuyển image sang định dạng Singularity (được cache trong `work/singularity/`).
4. Nó chạy FastQC bên trong container, không cần quyền root.

Có thể kiểm chứng thay đổi này trong `.command.run`:

```bash
nxf_launch() {
    set +u; env - PATH="$PATH" ${TMP:+SINGULARITYENV_TMP="$TMP"} ${TMPDIR:+SINGULARITYENV_TMPDIR="$TMPDIR"} ${NXF_TASK_WORKDIR:+SINGULARITYENV_NXF_TASK_WORKDIR="$NXF_TASK_WORKDIR"} singularity exec --no-home --pid -B <repo>/tmp/work <repo>/tmp/work/singularity/quay.io-biocontainers-fastqc-0.12.1--hdfd78af_0.img /bin/bash -c "cd $NXF_TASK_WORKDIR; /bin/bash -ue <repo>/tmp/work/87/28135f97ffa37daf6192aaf824dedb/.command.sh"
}
```

### 3.6 Giới hạn bộ nhớ và CPU (với Docker)

:::info
+ Nếu không cấu hình cluster hoặc batch executor, Singularity và Apptainer không áp đặt giới hạn CPU và bộ nhớ.
+ Có thể dùng Docker thay thế.
+ Docker không phải lựa chọn duy nhất: Nextflow có thể mở rộng sang các container engine khác thông qua cấu hình.
+ Trên thực tế, phần lớn engine dựa trên hệ sinh thái Docker, với các registry quen thuộc như quay.io và docker.io cùng lượng lớn image có thể chuyển sang định dạng riêng.
:::

```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl=2 // enable DSL2
// Define the module as template
process FASTQC {
    container 'quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0'
    cpus 2  // NEW CONFIG
    memory "4.GB"  // NEW CONFIG
    input:
    tuple val(meta), path(reads) // input variable, example: [sample, [/path/read1.fq, /path/read2.fq ]]
    
    output:
    tuple val(meta), path("*.html") // output variable, example: [sample, [/path/read1.html, /path/read2.html ]]
    
    script:
    """
    # Quality Control with FastQC
    # This generates HTML and ZIP files with quality metrics
    fastqc $reads
    """
}

workflow {
    ch_input = Channel.of([ params.sample , [file(params.fastq_r1), file(params.fastq_r2)] ])
    // Run workflow
    FASTQC (
        ch_input
    )   
}
```

Giữ nguyên `nextflow.config`; lệnh Singularity không thay đổi. Để dùng Docker, sửa `nextflow.config`:

```bash
docker.enabled       = true
docker.autoMounts    = true
```

Có thể xem câu lệnh được sinh ra để thấy Docker áp giới hạn CPU và bộ nhớ như thế nào:

```bash
# check docker command quickly
cat work/8e/7c7d8e091a9b515adbe0f136e13f93/.command.run|grep docker
```

Kết quả dưới đây cho thấy giới hạn được truyền qua `--cpu-shares 2048 --memory 4096m`:

```bash
docker run -i --cpu-shares 2048 --memory 4096m -e "NXF_TASK_WORKDIR" -v <repo>/tmp/work:<repo>/tmp/work -w "$NXF_TASK_WORKDIR" --name $NXF_BOXID quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0 /bin/bash -ue <repo>/tmp/work/8e/7c7d8e091a9b515adbe0f136e13f93/.command.sh
```

:::warning
Nhớ dọn thư mục `work`. Việc thay đổi `container`, `cpus` hay `memory` không làm thay đổi hash của process, nên kết quả đã cache trước đó sẽ tiếp tục được dùng lại.
:::

### 3.7 Chạy với samplesheet

Trong một pipeline, dữ liệu raw thường được mô tả bằng file CSV gọi là samplesheet. Workflow sau đó đọc CSV và tạo các channel đầu vào.

```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl=2 // enable DSL2
// Define the module as template
process FASTQC {
    container 'quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0'
    cpus 2  // NEW CONFIG
    memory "4.GB"  // NEW CONFIG
    input:
    tuple val(meta), path(reads) // input variable, example: [sample, [/path/read1.fq, /path/read2.fq ]]
    
    output:
    tuple val(meta), path("*.html") // output variable, example: [sample, [/path/read1.html, /path/read2.html ]]
    
    script:
    """
    # Quality Control with FastQC
    # This generates HTML and ZIP files with quality metrics
    fastqc $reads
    """
}

workflow {
    Channel
        .fromPath(params.input)
        .splitCsv(header: true)
        .map { row ->
            def meta = [:] // create empty list for metadata
            meta.id = row.sample // it map value of row as sample id, add to meta list
            // Support both new format (with lane) and old format (without lane)
            meta.lane = row.lane // require to have lane, for combining data later if one sample is sequenced by more than one lanes
            def reads = [] // create empty list for files
            reads.add(file(row.fastq_1)) // add R1 fq
            reads.add(file(row.fastq_2)) // add R2 fq
            return [ meta, reads ]
        }
        .set { ch_input }
    ch_input.view() // View channel here
    // Run workflow
    FASTQC (
        ch_input
    )   
}
```

Sau đó có thể chạy pipeline với file `samplesheet.csv` có nội dung:

```bash
sample,lane,fastq_1,fastq_2
sample1,1,https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz,https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz
sample2,1,https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz,https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz
```

Chạy lại sẽ thấy hai tuple tương ứng với hai dòng của file đầu vào. Đây là lúc workflow phân bố công việc: hai process FastQC chạy cùng lúc trên máy cục bộ, với giới hạn tài nguyên do Docker áp đặt.

```bash
nextflow run main.nf --input samplesheet.csv -resume
```

![samplesheet.csv](./imgs/samplesheet_nf.png)

### 3.8 Kết nối các module

Một pipeline là chuỗi công cụ nối tiếp nhau, trong đó output của bước này là input của bước kế tiếp. Hãy mở rộng ví dụ với hai module `trimgalore` và `bwa`.

:::info
**Có gì mới?**

- Hai module mới: `trimgalore` để trim adapter và `bwa` để align.
- `trimgalore` chạy trực tiếp trên `ch_input` và phát ra output là `reads`.
- Output của `trimgalore` (`TRIM_GALORE.out.reads`) trở thành input của `bwa`, giữ nguyên định dạng tuple.
- Có thể chỉ định một output cụ thể của process bằng `.out.<emit_name>`.
- Khối `script` có thể chứa các câu lệnh `def` để định nghĩa biến động.
- Khi tạo channel cho các file tham chiếu, dùng `.collect()` để chúng được tái sử dụng ở nhiều process, vì mặc định channel hoạt động như hàng đợi.
:::

Cấu trúc dưới đây cho thấy cách nối các process, truyền output giữa các module và quản lý tài nguyên dùng chung trong Nextflow.

```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl=2 // enable DSL2
// Define the module as template
process FASTQC {
    container 'quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0'
    cpus 2  // NEW CONFIG
    memory "4.GB"  // NEW CONFIG
    input:
    tuple val(meta), path(reads) // input variable, example: [sample, [/path/read1.fq, /path/read2.fq ]]
    
    output:
    tuple val(meta), path("*.html") // output variable, example: [sample, [/path/read1.html, /path/read2.html ]]
    
    script:
    """
    # Quality Control with FastQC
    # This generates HTML and ZIP files with quality metrics
    fastqc $reads
    """
}

process TRIM_GALORE {
    container 'quay.io/biocontainers/trim-galore:0.6.10--hdfd78af_0'
    cpus 2  // NEW CONFIG
    memory "4.GB"  // NEW CONFIG
    input:
    tuple val(meta), path(reads)
    
    output:
    tuple val(meta), path("*_val_{1,2}.fq.gz"), emit: reads
    tuple val(meta), path("*_trimming_report.txt"), emit: log
    
    script:
    """
    # Adapter Trimming and Quality Filtering
    trim_galore \\
        --paired \\
        --quality 20 --length 50 --fastqc \\
        --cores $task.cpus \\
        ${reads}
    """
}

process BWA_MEM {
    container 'quay.io/biocontainers/mulled-v2-fe8faa35dbf6dc65a0f7f5d4ea12e31a79f73e40:219b6c272b25e7e642ae3ff0bf0c5c81a5135ab4-0'
    cpus 2  // NEW CONFIG
    memory "4.GB"  // NEW CONFIG

    input:
    tuple val(meta), path(reads)
    path reference
    path reference_fai
    path reference_dict
    path bwa_index
    
    output:
    tuple val(meta), path("*.bam"), emit: bam

    script:
    def args = task.ext.args ?: '-M'
    def prefix = task.ext.prefix ?: "${meta.id}"
    def read_group = "@RG\\tID:${meta.id}\\tSM:${meta.id}\\tPL:ILLUMINA\\tLB:${meta.id}_lib"
    
    """
    # Read Alignment with BWA-MEM
    bwa mem \\
        -t $task.cpus \\
        $args \\
        -R "${read_group}" \\
        $reference \\
        ${reads[0]} ${reads[1]} \\
        | samtools view -Sb - > ${prefix}_aligned.bam
    """
}

workflow {
    Channel
        .fromPath(params.input)
        .splitCsv(header: true)
        .map { row ->
            def meta = [:] // create empty list for metadata
            meta.id = row.sample // it map value of row as sample id, add to meta list
            // Support both new format (with lane) and old format (without lane)
            meta.lane = row.lane // require to have lane, for combining data later if one sample is sequenced by more than one lanes
            def reads = [] // create empty list for files
            reads.add(file(row.fastq_1)) // add R1 fq
            reads.add(file(row.fastq_2)) // add R2 fq
            return [ meta, reads ]
        }
        .set { ch_input }

    // Run workflow
    FASTQC (
        ch_input
    )   

    TRIM_GALORE (
        ch_input
    )
    
    ch_reference = Channel.fromPath(params.reference).collect()
    ch_reference_fai = Channel.fromPath(params.reference + ".fai").collect()
    ch_reference_dict = Channel.fromPath(params.reference_dict).collect()
    ch_bwa_index = Channel.fromPath(params.bwa_index+".{amb,ann,bwt,pac,sa}").collect()

    BWA_MEM (
        TRIM_GALORE.out.reads, // use output of trim_galore as input for bwa_mem
        ch_reference,
        ch_reference_fai,
        ch_reference_dict,
        ch_bwa_index
    )
}
```

Chạy lại để kiểm tra mọi thứ hoạt động:

```bash
nextflow run main.nf --input samplesheet.csv -resume
```

![img](./imgs/connect_process.png)

### 3.9 Tổ chức lại workflow

:::warning
Phiên bản Nextflow cuối cùng chỉ gồm:

+ các module được tổ chức lại,
+ một file `nextflow.config` duy nhất,
+ một `main.nf` duy nhất chỉ import và dùng các `module`.

Các cải tiến sâu hơn sẽ được cấu hình trong những bài tiếp theo.
:::

#### 3.9.1 Module và subworkflow

:::warning
Phần này trình bày cách tách một script duy nhất thành các module/subworkflow để dễ quản lý hơn.
:::

Module nằm trong thư mục `modules` và được import như một thư viện vào `main.nf`:

```bash
// Include modules
include { FASTQC } from './modules/fastqc'
include { TRIM_GALORE } from './modules/trim_galore'
include { BWA_MEM } from './modules/bwa_mem'
include { SAMTOOLS_SORT } from './modules/samtools_sort'
include { GATK_MARKDUPLICATES } from './modules/gatk_markduplicates'
include { GATK_BASERECALIBRATOR } from './modules/gatk_baserecalibrator'
include { GATK_APPLYBQSR } from './modules/gatk_applybqsr'
include { GATK_COLLECTMETRICS } from './modules/gatk_collectmetrics'
include { GATK_HAPLOTYPECALLER } from './modules/gatk_haplotypecaller'
include { GATK_GENOTYPEGVCFS } from './modules/gatk_genotypegvcfs'
```

Subworkflow là một chồng nhiều module. Nó có tên để import về sau và khai báo input, output tương tự một process:

```groovy
#!/usr/bin/env nextflow

/*
========================================================================================
    PREPROCESSING SUBWORKFLOW
========================================================================================
    Steps 1-8: QC, Trimming, Alignment, Deduplication, BQSR, Quality Metrics
========================================================================================
*/

include { FASTP } from '../../../modules/local/fastp/trim/main'
include { BWAMEM2_INDEX } from '../../../modules/local/bwa/index/main'
include { BWA_MEM2 } from '../../../modules/local/bwa/mem2/main'
include { SAMTOOLS_SORT } from '../../../modules/local/samtools/sort/main'
include { SAMTOOLS_MERGE } from '../../../modules/local/samtools/merge/main'
include { GATKSPARK_MARKDUPLICATES } from '../../../modules/local/gatkspark/markduplicates/main'
include { GATKSPARK_BASERECALIBRATOR } from '../../../modules/local/gatkspark/baserecalibrator/main'
include { GATKSPARK_APPLYBQSR } from '../../../modules/local/gatkspark/applybqsr/main'
include { GATK_COLLECTMETRICS } from '../../../modules/local/gatk/collectmetrics/main'

workflow PREPROCESSING {
    
    take:
    reads_ch        // channel: [ val(meta), [ path(read1), path(read2) ] ]
    ref_fasta       // path: reference FASTA
    ref_fai         // path: reference FAI
    ref_dict        // path: reference dict
    bwa2_index   // channel: Optional BWA index files
    index_bwa2_reference // channel: Optional BWA index files
    dbsnp_vcf       // path: dbSNP VCF
    dbsnp_tbi       // path: dbSNP TBI
    known_indels_vcf // path: known indels VCF
    known_indels_tbi // path: known indels TBI
    
    main:
    ch_versions = Channel.empty()
    
    // Check if BWA index needs to be generated
    // If empty, generate it; otherwise use provided index
    if (index_bwa2_reference){
        BWAMEM2_INDEX(ref_fasta)
        ch_versions = ch_versions.mix(BWAMEM2_INDEX.out.versions)
        bwa2_index_ch = BWAMEM2_INDEX.out.index
    }
    else{
        bwa2_index_ch = Channel.fromPath(bwa2_index)
    }
    //
    // STEP 1: Adapter Trimming, Quality Filtering, and QC with fastp
    //
    FASTP (
        reads_ch
    )
    ch_versions = ch_versions.mix(FASTP.out.versions)
    
    //
    // STEP 2: Read Alignment with BWA-MEM2
    //
    BWA_MEM2 (
        FASTP.out.reads,
        ref_fasta,
        ref_fai,
        ref_dict,
        bwa2_index_ch
    )
    ch_versions = ch_versions.mix(BWA_MEM2.out.versions)
    
    //
    // STEP 3: Sort BAM file
    //
    SAMTOOLS_SORT (
        BWA_MEM2.out.bam
    )
    ch_versions = ch_versions.mix(SAMTOOLS_SORT.out.versions)
    
    //
    // STEP 4: Merge lanes per sample (if multiple lanes exist)
    //
    SAMTOOLS_SORT.out.bam
        .map { meta, bam ->
            def new_meta = [:]
            new_meta.id = meta.sample
            new_meta.sample = meta.sample
            return [ new_meta.id, new_meta, bam ]
        }
        .groupTuple()
        .map { sample_id, metas, bams ->
            return [ metas[0], bams ]
        }
        .set { ch_bams_to_merge }
    
    SAMTOOLS_MERGE (
        ch_bams_to_merge
    )
    ch_versions = ch_versions.mix(SAMTOOLS_MERGE.out.versions)
    
    //
    // STEP 5: Mark Duplicates with GATK Spark
    //
    GATKSPARK_MARKDUPLICATES (
        SAMTOOLS_MERGE.out.bam
    )
    ch_versions = ch_versions.mix(GATKSPARK_MARKDUPLICATES.out.versions)
    
    //
    // STEP 6: Base Quality Score Recalibration - Generate table
    //
    GATKSPARK_BASERECALIBRATOR (
        GATKSPARK_MARKDUPLICATES.out.bam.join(GATKSPARK_MARKDUPLICATES.out.bai),
        ref_fasta,
        ref_fai,
        ref_dict,
        dbsnp_vcf,
        dbsnp_tbi,
        known_indels_vcf,
        known_indels_tbi
    )
    ch_versions = ch_versions.mix(GATKSPARK_BASERECALIBRATOR.out.versions)
    
    //
    // STEP 7: Apply BQSR
    //
    GATKSPARK_APPLYBQSR (
        GATKSPARK_MARKDUPLICATES.out.bam
            .join(GATKSPARK_MARKDUPLICATES.out.bai)
            .join(GATKSPARK_BASERECALIBRATOR.out.table),
        ref_fasta,
        ref_fai,
        ref_dict
    )
    ch_versions = ch_versions.mix(GATKSPARK_APPLYBQSR.out.versions)
    
    //
    // STEP 8: Collect Alignment Metrics
    //
    GATK_COLLECTMETRICS (
        GATKSPARK_APPLYBQSR.out.bam.join(GATKSPARK_APPLYBQSR.out.bai),
        ref_fasta,
        ref_fai,
        ref_dict
    )
    ch_versions = ch_versions.mix(GATK_COLLECTMETRICS.out.versions)
    
    emit:
    bam                = GATKSPARK_APPLYBQSR.out.bam                  // channel: [ val(meta), path(bam) ]
    bai                = GATKSPARK_APPLYBQSR.out.bai                  // channel: [ val(meta), path(bai) ]
    alignment_summary  = GATK_COLLECTMETRICS.out.alignment_summary    // channel: [ val(meta), path(metrics) ]
    insert_metrics     = GATK_COLLECTMETRICS.out.insert_metrics       // channel: [ val(meta), path(metrics) ]
    versions           = ch_versions                                   // channel: path(versions.yml)
}
```

Trong `main.nf`, subworkflow được import như một module:

```groovy
include { PREPROCESSING } from './subworkflows/local/preprocessing/main'
```

#### 3.9.2 Cấu hình và profile

Ở thời điểm này config chỉ có hai dòng:

```bash
docker.enabled       = true
docker.autoMounts    = true
```

Có thể mở rộng như sau:

+ Các tham số có thể được khai báo trong khối `params {}`.
+ Config có thể được tách thành nhiều file nhỏ hơn.
+ `profile` nhóm một tập tham số và thiết lập, nên một lần chạy được cấu hình bằng `-profile test,docker`, dùng tập tham số `test` cùng cấu hình `docker`.
+ Khối `manifest` giúp ghi lại thông tin về pipeline.
+ Bật `timeline`, `trace` và `report` giúp theo dõi quá trình chạy dễ hơn.
+ `check_max` và `label` giúp đặt CPU và bộ nhớ hợp lý. Ví dụ, với chỉ bốn CPU, chạy hai process FastQC cùng lúc là hợp lý; chạy nhiều hơn có thể gây tranh chấp tài nguyên.

```groovy
/*
========================================================================================
    GATK Variant Calling Pipeline - Nextflow Config
========================================================================================
*/

// Global default params
params {
    // Input/output options
    input              = null
    outdir             = 'results_nextflow'
    
    // Direct input parameters (alternative to samplesheet)
    sample             = 'sample1'
    fastq_r1           = null
    fastq_r2           = null
    
    // Reference files
    reference          = '../reference/genome.fasta'
    dbsnp              = '../reference/dbsnp_146.hg38.vcf.gz'
    known_indels       = '../reference/mills_and_1000G.indels.vcf.gz'
    
    // Resource limits
    max_cpus           = 4
    max_memory         = '15.GB'
    max_time           = '24.h'
    
    // Help
    help               = false
}

// Modules
process {
    publishDir = [
        path: { "${params.outdir}/${task.process.toLowerCase()}" },
        mode: "symlink",
        enabled: true
    ]
}

// Process configuration
process {
    // Default settings
    shell = ['/bin/bash', '-euo', 'pipefail']
    
    // Error handling
    errorStrategy = { task.exitStatus in [143,137,104,134,139] ? 'retry' : 'finish' }
    maxRetries    = 1
    maxErrors     = '-1'
    
    // Process labels
    withLabel: process_low {
        cpus   = { check_max( 2 * task.attempt, 'cpus' ) }
        memory = { check_max( 2.GB * task.attempt, 'memory' ) }
        time   = { check_max( 4.h * task.attempt, 'time' ) }
    }
    
    withLabel: process_medium {
        cpus   = { check_max( 4 * task.attempt, 'cpus' ) }
        memory = { check_max( 4.GB * task.attempt, 'memory' ) }
        time   = { check_max( 8.h * task.attempt, 'time' ) }
    }
    
    withLabel: process_high {
        cpus   = { check_max( 4 * task.attempt, 'cpus' ) }
        memory = { check_max( 16.GB * task.attempt, 'memory' ) }
        time   = { check_max( 16.h * task.attempt, 'time' ) }
    }
}

// Execution profiles
profiles {
    docker {
        docker.enabled         = true
        docker.userEmulation   = true
        singularity.enabled    = false
        podman.enabled         = false
        shifter.enabled        = false
        charliecloud.enabled   = false
    }
    
    singularity {
        singularity.enabled    = true
        singularity.autoMounts = true
        docker.enabled         = false
        podman.enabled         = false
        shifter.enabled        = false
        charliecloud.enabled   = false
    }
    test {
        params.sample        = 'sample1'
        params.fastq_r1      = '../data/sample1_R1.fastq.gz'
        params.fastq_r2      = '../data/sample1_R2.fastq.gz'
        params.reference     = '../reference/genome.fasta'
        params.dbsnp         = '../reference/dbsnp_146.hg38.vcf.gz'
        params.known_indels  = '../reference/mills_and_1000G.indels.vcf.gz'
        params.max_cpus      = 4
        params.max_memory    = '15.GB'
    }
}

// Manifest
manifest {
    name            = 'GATK Variant Calling Pipeline'
    author          = 'River'
    homePage        = 'https://github.com/your-repo/gatk-variant-calling'
    description     = 'GATK best practices variant calling pipeline'
    mainScript      = 'main.nf'
    nextflowVersion = '!>=22.10.0'
    version         = '1.0.0'
}

// Function to ensure that resource requirements don't go beyond maximum limit
def check_max(obj, type) {
    if (type == 'memory') {
        try {
            if (obj.compareTo(params.max_memory as nextflow.util.MemoryUnit) == 1)
                return params.max_memory as nextflow.util.MemoryUnit
            else
                return obj
        } catch (all) {
            println "WARNING: Max memory '${params.max_memory}' is not valid! Using default value: $obj"
            return obj
        }
    } else if (type == 'time') {
        try {
            if (obj.compareTo(params.max_time as nextflow.util.Duration) == 1)
                return params.max_time as nextflow.util.Duration
            else
                return obj
        } catch (all) {
            println "WARNING: Max time '${params.max_time}' is not valid! Using default value: $obj"
            return obj
        }
    } else if (type == 'cpus') {
        try {
            return Math.min( obj, params.max_cpus as int )
        } catch (all) {
            println "WARNING: Max cpus '${params.max_cpus}' is not valid! Using default value: $obj"
            return obj
        }
    }
}
```

Các module sau đó có thể được cập nhật với:

+ `tag`, hiển thị mẫu đang chạy thay vì chỉ số thứ tự của process;
+ `label`, suy ra CPU và bộ nhớ tự động — trong môi trường công nghiệp, việc tinh chỉnh thủ công thường tốt hơn để tài nguyên được dùng ở mức khoảng 80%;
+ `version`, để phiên bản công cụ được ghi lại; `MULTIQC` có thể thu thập các file `versions.yml` và tạo báo cáo mà không cần ghi chép thủ công cho từng process.

```groovy
process FASTQC {
    tag "$meta.id"
    label 'process_medium'

    // Use BioContainers FastQC image
    // Works with both Docker and Singularity (no root required)
    container 'quay.io/biocontainers/fastqc:0.12.1--hdfd78af_0'
    
    input:
    tuple val(meta), path(reads)
    
    output:
    tuple val(meta), path("*.html"), emit: html
    tuple val(meta), path("*.zip") , emit: zip
    path "versions.yml"            , emit: versions
    
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def args = task.ext.args ?: ''
    def prefix = task.ext.prefix ?: "${meta.id}"
    
    // Determine if single-end or paired-end
    def input_files = reads instanceof List ? reads.join(' ') : reads
    
    """
    # Quality Control with FastQC
    # This generates HTML and ZIP files with quality metrics
    fastqc \\
        $args \\
        --threads $task.cpus \\
        $input_files
    
    # Create versions file
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fastqc: \$(fastqc --version | sed 's/FastQC v//')
    END_VERSIONS
    """
}
```

:::tip
Việc publish output sẽ dễ hơn với cấu hình dưới đây, giúp mọi process có thư mục output viết thường.
:::

```groovy
process {
    publishDir = [
        path: { "${params.outdir}/${task.process.toLowerCase()}" },
        mode: "symlink",
        enabled: true
    ]
}
```

### 3.10 Workflow Nextflow cuối cùng

Workflow dưới đây minh họa các khái niệm Nextflow chuẩn được dùng trong chuỗi bài này. Cần chạy script tải dữ liệu trước để dữ liệu đầu vào và tham chiếu đã sẵn sàng.

```bash
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.1.0
cd nf-germline-short-read-variant-calling

# Install dependencies
pixi shell --manifest-path bash-gatk

# Download test data
bash scripts/download_data.sh

# Run pipeline
cd nextflow-gatk
nextflow run main.nf -profile docker
```

![final_wf](./imgs/final_conversion_nf.png)

## 4. Kiểm chứng việc chuyển đổi

:::tip
Ý tưởng khá đơn giản: cùng một phân tích nên cho cùng kết quả bất kể controller là bash hay Nextflow. Một vài điểm cần lưu ý khi so sánh:

+ Dùng `md5sum` để so sánh nội dung file.
+ Trước tiên xác nhận rằng bản thân công cụ có tính xác định — chạy workflow bash hai lần phải cho ra cùng các file.
+ Loại bỏ những yếu tố vốn dĩ khác nhau, ví dụ timestamp bên trong file ZIP và thành phần ngẫu nhiên ở một số công cụ.
:::

Với FastQC, bước đầu tiên, cần loại bỏ timestamp bên trong file ZIP rồi so sánh nội dung:

```bash
#!/bin/bash
#
# Validation Script: Compare Bash and Nextflow Outputs
# This script validates that the Nextflow pipeline produces identical results to the bash pipeline
#

set -euo pipefail

echo "=========================================="
echo "Pipeline Migration Validation"
echo "Comparing Bash vs Nextflow (Step 1: FastQC)"
echo "=========================================="
echo

# Directories
BASH_DIR="bash-gatk/results/qc/sample1"
NEXTFLOW_DIR="nextflow-gatk/results_nextflow/qc/sample1"

echo "=== File Comparison ==="
echo

# Compare all HTML files
for file in ${BASH_DIR}/*.html; do
    fname=$(basename "$file")
    if [[ -f "${NEXTFLOW_DIR}/$fname" ]]; then
        BASH_MD5=$(md5sum "$file" | cut -d' ' -f1)
        NEXTFLOW_MD5=$(md5sum "${NEXTFLOW_DIR}/$fname" | cut -d' ' -f1)
        if [ "$BASH_MD5" == "$NEXTFLOW_MD5" ]; then
            echo "  ✓ PASS: $fname"
            echo "    MD5: $BASH_MD5"
        else
            echo "  ✗ FAIL: $fname"
            echo "    Bash MD5:     $BASH_MD5"
            echo "    Nextflow MD5: $NEXTFLOW_MD5"
        fi
    else
        echo "  ✗ FAIL: $fname (missing in Nextflow)"
    fi
done
echo

echo "Comparing ZIP files (content only, ignoring timestamps):"

# Compare all ZIP files (ignore archive timestamps, check actual content)
for file in ${BASH_DIR}/*.zip; do
    fname=$(basename "$file")
    if [[ -f "${NEXTFLOW_DIR}/$fname" ]]; then
        BASE_NAME=$(basename "$file" .zip)
        BASH_EXTRACT="/tmp/bash_${BASE_NAME}"
        NF_EXTRACT="/tmp/nextflow_${BASE_NAME}"
        rm -rf "$BASH_EXTRACT" "$NF_EXTRACT"
        mkdir -p "$BASH_EXTRACT" "$NF_EXTRACT"
        unzip -q "$file" -d "$BASH_EXTRACT"
        unzip -q "${NEXTFLOW_DIR}/$fname" -d "$NF_EXTRACT"
        if diff -r "$BASH_EXTRACT" "$NF_EXTRACT" > /dev/null 2>&1; then
            echo "  ✓ PASS: $fname (content identical)"
        else
            echo "  ✗ FAIL: $fname (content differs)"
        fi
        FASTQC_DATA="${BASE_NAME}/fastqc_data.txt"
        if [ -f "$BASH_EXTRACT/$FASTQC_DATA" ] && [ -f "$NF_EXTRACT/$FASTQC_DATA" ]; then
            BASH_DATA_MD5=$(md5sum "$BASH_EXTRACT/$FASTQC_DATA" | cut -d' ' -f1)
            NF_DATA_MD5=$(md5sum "$NF_EXTRACT/$FASTQC_DATA" | cut -d' ' -f1)
            echo "    fastqc_data.txt MD5: $BASH_DATA_MD5"
            if [ "$BASH_DATA_MD5" == "$NF_DATA_MD5" ]; then
                echo "    ✓ Core data file identical"
            else
                echo "    ✗ Data file content differs"
            fi
        fi
    else
        echo "  ✗ FAIL: $fname (missing in Nextflow)"
    fi
done

echo
echo "=== Summary ==="
echo "HTML files: Byte-for-byte identical ✓"
echo "ZIP files:  Content identical (timestamps differ as expected) ✓"
echo
echo "=== Conclusion ==="
echo "✓ VALIDATION SUCCESSFUL"
echo "The Nextflow pipeline produces scientifically equivalent outputs to the bash pipeline."
echo "Differences in ZIP file MD5 checksums are due to embedded timestamps,"
echo "which is expected behavior and does not affect scientific reproducibility."
echo "=========================================="
```

Kết quả được hiển thị dưới đây. Cách so sánh tương tự có thể lặp lại cho các bước còn lại.

![validate](./imgs/validate.png)

## 5. Tóm tắt

:::info
Làm việc với một workflow orchestrator sẽ dễ nắm bắt hơn khi hiểu rõ các cơ chế bên dưới: `template`, `container` và `configuration`.
:::

## Tài liệu tham khảo

1. **Tài liệu Nextflow** — process, channel, cấu hình và profile: https://www.nextflow.io/docs/latest/
2. **nf-core** — các pipeline bioinformatics do cộng đồng xây dựng: https://nf-co.re/
3. **Bộ dữ liệu test nf-core** — các file FASTQ và tham chiếu nhỏ dùng ở trên: https://github.com/nf-core/test-datasets
4. **Tham chiếu cấu hình Nextflow** — process selector, label và chỉ thị tài nguyên: https://www.nextflow.io/docs/latest/config.html
5. **Mã nguồn tham chiếu cho bài này**: https://github.com/nttg8100/nf-germline-short-read-variant-calling/tree/0.1.0
6. Bài đọc liên quan: [Tìm image bioinformatics dựng sẵn](/blogs/bioinformatics-containers-build-efficient-docker) và [Chuyển pipeline bash sang pipeline Nextflow cấp doanh nghiệp](/blogs/migrate-bash-nextflow-enterprise-pipeline).
