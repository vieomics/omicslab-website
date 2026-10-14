---
slug: gatk-variant-calling-production-slurm-optimization-part3
title: "Gọi biến thể (Phần 3): Triển khai quy mô production trên HPC và tối ưu hiệu năng"
description: "Cấu hình pipeline Nextflow cho SLURM, tinh chỉnh CPU và bộ nhớ theo từng công cụ, thay các bước chậm nhất bằng lựa chọn nhanh hơn, và mở rộng từ một mẫu lên hàng trăm mẫu."
series: Variant Calling from Bash to Production
seriesOrder: 3
authors: [vieomics]
tags: [gatk, nextflow, slurm, hpc, optimization, fastp, spark, performance, variant-calling, production]
image: ./imgs/variant_calling.png
---

Ở [Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1), chúng tôi đã xây dựng một mốc so sánh bằng bash. Ở [Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2), pipeline được chuyển sang Nextflow và kết quả được kiểm chứng bằng checksum. Bài này bàn đến việc chạy cùng pipeline đó trên cluster HPC: cấu hình executor cho các cluster với quy mô khác nhau, tinh chỉnh tài nguyên theo từng công cụ, thay các bước chậm nhất bằng lựa chọn nhanh hơn (fastp và các công cụ GATK dựa trên Spark), và mở rộng số lượng mẫu.

<!--truncate-->

:::info
Mã nguồn của bài hướng dẫn này có trong repository [variant-calling-gatk-pipeline-best-practice-from-scratch](https://github.com/nttg8100/variant-calling-gatk-pipeline-best-practice-from-scratch).
:::

## Tổng quan chuỗi bài

1. [Phần 1 — workflow bash với môi trường Pixi tái lập được](/blogs/gatk-variant-calling-bash-workflow-pixi-part1).
2. [Phần 2 — chuyển các bước tương tự sang Nextflow và kiểm chứng kết quả](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2).
3. **Phần 3 (bài này)** — cấu hình SLURM và tinh chỉnh tài nguyên cho từng công cụ.
4. [Phần 4 — kiểm thử và lint](/blogs/gatk-variant-calling-production-slurm-optimization-part4).
5. [Phần 5 — benchmark](/blogs/gatk-variant-calling-production-slurm-optimization-part5).

## 1. Từ proof of concept đến production

### 1.1 Vị trí của chuỗi bài

**Phần 1** cho ra một pipeline bash chạy được, phù hợp với số lượng mẫu ít, với thời gian chạy ở mức hàng chục phút mỗi mẫu.

**Phần 2** viết lại mọi bước thành các process Nextflow chạy trong container Singularity, và kiểm chứng việc chuyển đổi bằng checksum MD5. Trong các lần chạy cục bộ của chúng tôi, một mẫu hoàn thành trong khoảng ba đến bốn phút.

**Phần 3 (bài này)** hướng đến triển khai: các profile SLURM cho cluster với quy mô khác nhau, phân bổ tài nguyên theo từng công cụ, thay công cụ chậm hơn bằng lựa chọn nhanh hơn, và mở rộng dần từ 1 lên 10 rồi 100 mẫu. Kết quả kỳ vọng là 100 mẫu hoàn thành trong vài giờ thay vì vài ngày; con số chính xác phụ thuộc vào cluster và hành vi của hàng đợi, nên nên xem đây là ước lượng chứ không phải bảo đảm.

### 1.2 Nội dung bài này

- Cấu hình executor SLURM của Nextflow cho các cluster với quy mô khác nhau.
- Tinh chỉnh CPU, bộ nhớ và walltime theo từng công cụ GATK.
- Thay FastQC và Trim Galore bằng `fastp`, vốn thực hiện trim và kiểm soát chất lượng chỉ trong một lượt.
- Dùng các công cụ GATK dựa trên Spark, vốn song song hóa những bước trước đây chỉ chạy đơn luồng.
- Mở rộng dần từ 1 mẫu lên 10 rồi 100 mẫu.
- Theo dõi quá trình chạy và xử lý các vấn đề thường gặp.

### 1.3 Kiến thức cần có

Bài này dựa trên Phần 1 và Phần 2. Nếu mới bắt đầu với chuỗi bài, nên xem trước:

1. [Phần 1: pipeline GATK bằng bash với Pixi](/blogs/gatk-variant-calling-bash-workflow-pixi-part1).
2. [Phần 2: từ Bash sang Nextflow](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2).
3. [Xây dựng cluster Slurm HPC (Phần 1)](/blogs/how-to-build-slurm-hpc-part-1).
4. [Xây dựng cluster Slurm HPC (Phần 2)](/blogs/how-to-build-slurm-hpc-part-2).
5. [Xây dựng cluster Slurm HPC (Phần 3)](/blogs/how-to-build-slurm-hpc-part-3).
6. [Container trên HPC: từ Docker đến Singularity và Apptainer](/blogs/containers-hpc-docker-singularity-apptainer).

### 1.4 Giả định

Hướng dẫn này giả định có một cluster SLURM với số node ít và có truy cập vào lưu trữ dùng chung như NFS. Ví dụ được đưa ra cho các cluster với quy mô khác nhau.

### 1.5 Hỗ trợ nhiều file FASTQ cho một mẫu

Trong nhiều dự án giải trình tự, một mẫu sinh học được giải trình tự trên nhiều lane hoặc nhiều lần chạy, tạo ra nhiều hơn một cặp file FASTQ cho mỗi mẫu.

Pipeline mô tả đến đây xem mỗi mẫu là một cặp file duy nhất. Một cập nhật nhỏ giải quyết vấn đề này: thêm cột `lane` vào samplesheet để mỗi dòng biểu diễn một tổ hợp duy nhất giữa mẫu và lane. Pipeline sau đó align từng lane như một sub-sample rồi merge các file BAM kết quả thành một file cho mỗi mẫu.

#### Samtools sort

Các file BAM đã align của một mẫu được sort:

```bash
process SAMTOOLS_SORT {
    tag "$meta.id"
    label 'process_medium'
    
    
    container 'quay.io/biocontainers/samtools:1.17--hd87286a_2'
    
    input:
    tuple val(meta), path(bam)
    
    output:
    tuple val(meta), path("*_sorted.bam"), emit: bam
    path "versions.yml", emit: versions
    
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def args = task.ext.args ?: ''
    def prefix = task.ext.prefix ?: "${meta.id}"
    
    """
    # Sort BAM file by coordinates
    samtools sort \\
        -@ $task.cpus \\
        $args \\
        -o ${prefix}_sorted.bam \\
        $bam
    
    # Create versions file
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        samtools: \$(samtools --version | head -1 | sed 's/samtools //')
    END_VERSIONS
    """
}
```

#### Samtools merge

Các file BAM đã sort sau đó được merge:

```bash
process SAMTOOLS_MERGE {
    tag "$meta.id"
    label 'process_low'
    
    
    container 'quay.io/biocontainers/samtools:1.18--h50ea8bc_1'
    
    input:
    tuple val(meta), path(bams)
    
    output:
    tuple val(meta), path("*.bam"), emit: bam
    tuple val(meta), path("*.bai"), emit: bai
    path "versions.yml", emit: versions
    
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def args = task.ext.args ?: ''
    def prefix = task.ext.prefix ?: "${meta.id}"
    
    // If only one BAM, just symlink and index it; otherwise merge
    if (bams instanceof List && bams.size() > 1) {
        """
        # Merge multiple BAM files
        samtools merge \\
            -@ $task.cpus \\
            $args \\
            ${prefix}_merged.bam \\
            ${bams.join(' ')}
        
        # Index the merged BAM
        samtools index \\
            -@ $task.cpus \\
            ${prefix}_merged.bam
        
        # Create versions file
        cat <<-END_VERSIONS > versions.yml
        "${task.process}":
            samtools: \$(samtools --version | head -1 | sed 's/samtools //')
        END_VERSIONS
        """
    } else {
        """
        # Only one BAM file, create symlink and index
        ln -s ${bams[0]} ${prefix}_merged.bam
        
        samtools index \\
            -@ $task.cpus \\
            ${prefix}_merged.bam
        
        # Create versions file
        cat <<-END_VERSIONS > versions.yml
        "${task.process}":
            samtools: \$(samtools --version | head -1 | sed 's/samtools //')
        END_VERSIONS
        """
    }
}
```

#### Cập nhật logic đầu vào

Ví dụ samplesheet:

```bash
sample,lane,fastq_1,fastq_2
sample1,1,data/sample1_lane1_R1.fastq.gz,data/sample1_lane1_R2.fastq.gz
sample1,2,data/sample1_lane2_R1.fastq.gz,data/sample1_lane2_R2.fastq.gz
```

Logic channel được cập nhật để xử lý cả định dạng một lane lẫn nhiều lane:

```groovy
Channel
    .fromPath(params.input)
    .splitCsv(header: true)
    .map { row ->
        def meta = [:]
        meta.id = row.sample
        meta.sample = row.sample
        // Use lane if present, otherwise default to "L001"
        meta.lane = row.lane ?: "L001"
        meta.read_group = "${row.sample}_${meta.lane}"
        def reads = []
        reads.add(file(row.fastq_1))
        if (row.fastq_2) {
            reads.add(file(row.fastq_2))
        }
        return [ meta, reads ]
    }
    .set { ch_input }
```

Mỗi cặp FASTQ sau đó được xử lý với metadata đúng, hỗ trợ việc merge về sau và gán read group chính xác. Hai bước được thêm vào workflow:

```bash
//
// STEP 3: Sort BAM file
//
SAMTOOLS_SORT (
    BWA_MEM.out.bam
)
ch_versions = ch_versions.mix(SAMTOOLS_SORT.out.versions)

//
// STEP 4: Merge lanes per sample (if multiple lanes exist)
// Group by sample ID and collect all BAMs for each sample
//
SAMTOOLS_SORT.out.bam
    .map { meta, bam ->
        // Create new meta with only sample ID for merging
        def new_meta = [:]
        new_meta.id = meta.sample
        new_meta.sample = meta.sample
        return [ new_meta.id, new_meta, bam ]
    }
    .groupTuple()
    .map { sample_id, metas, bams ->
        // Take the first meta (they should all have same sample info)
        return [ metas[0], bams ]
    }
    .set { ch_bams_to_merge }

SAMTOOLS_MERGE (
    ch_bams_to_merge
)
ch_versions = ch_versions.mix(SAMTOOLS_MERGE.out.versions)
```

## 2. Cấu hình executor SLURM cho Nextflow

### 2.1 Tìm hiểu executor SLURM của Nextflow

Nextflow che bớt nhiều phức tạp của SLURM bằng cách tự động chuyển process thành job SLURM:

```
Nextflow Process → SLURM Job Submission → Queue → Compute Node → Execution
```

Với mỗi process, Nextflow:

1. tạo một job script chứa logic của process;
2. submit job đó lên SLURM kèm yêu cầu tài nguyên;
3. theo dõi hàng đợi và kiểm tra định kỳ xem job đã xong chưa;
4. thu thập output và quản lý việc retry.

**Các thiết lập cấu hình quan trọng:**

- **`process.executor`** — đặt là `'slurm'`.
- **`executor.queueSize`** — số job chạy đồng thời tối đa, giúp pipeline không làm quá tải cluster.
- **`executor.pollInterval`** — tần suất Nextflow kiểm tra trạng thái job.
- **`process.queue`** — phân vùng SLURM sẽ dùng.

### 2.2 Cấu hình cho cluster nhỏ (2–10 node)

Với một cluster nghiên cứu nhỏ có năng lực hàng đợi hạn chế:

```groovy
// Add this to workflows/nextflow/nextflow.config

profiles {
    slurm_small {
        process.executor = 'slurm'
        process.queue = 'short'           // Use "short" partition (faster jobs)
        executor.queueSize = 10           // Max 10 concurrent jobs
        executor.pollInterval = '10s'     // Check every 10 seconds
        executor.queueStatInterval = '1m' // Query queue status every 1 min
        executor.submitRateLimit = '10/1min' // Don't submit >10 jobs per minute
    }
}
```

**Vì sao chọn các thiết lập này?**

Với 100 mẫu, giới hạn pipeline ở 10 job đồng thời nghĩa là workflow xử lý mẫu theo từng lô 10. Cách này có lợi cho những người dùng khác trên cluster: nó ngăn một job lớn chiếm dụng tài nguyên cluster và làm chậm công việc của người khác.

:::tip
- `queueSize = 10`: trên cluster nhỏ, việc submit 100 job cùng lúc là không nên. Mười job đồng thời cho mức song song hợp lý mà không làm quá tải hàng đợi.
- `submitRateLimit`: giữ số lượng submit ở mức vừa phải và ít gây phàn nàn từ phía quản trị cluster.
- `queue = 'short'`: phần lớn cluster nhỏ có các phân vùng short, medium và long; hàng đợi short thường bắt đầu sớm hơn.
:::

### 2.3 Cấu hình cho cluster trung bình (10–50 node)

Với một cluster cấp khoa có nhiều phân vùng:

```groovy
profiles {
    slurm_medium {
        process.executor = 'slurm'
        executor.queueSize = 50
        executor.pollInterval = '15s'
        executor.queueStatInterval = '2m'
        
        // Dynamic queue selection based on task type
        withLabel: process_low {
            queue = 'short'
        }
        withLabel: process_medium {
            queue = 'medium'
        }
        withLabel: process_high {
            queue = 'long'
        }
        withLabel: process_gpu {
            queue = 'gpu'
        }
    }
}
```

:::tip
Nhiều công cụ bioinformatics chạy nhanh hơn khi có tăng tốc GPU. Tuy nhiên không phải compute node nào cũng có GPU; các bài về cluster SLURM được liên kết ở trên mô tả cách kiểm tra phân vùng có sẵn.
:::

**Chiến lược:** định tuyến các loại job khác nhau vào các hàng đợi khác nhau. Job ngắn vào phân vùng short (hàng đợi nhanh, ưu tiên thấp) trong khi job dài vào phân vùng long (độ trễ cao hơn nhưng dành cho công việc chạy lâu).

### 2.4 Cấu hình cho cluster lớn (trên 50 node)

Với các trung tâm HPC production:

```groovy
profiles {
    slurm_large {
        process.executor = 'slurm'
        executor.queueSize = 200        // More parallelism
        executor.pollInterval = '30s'   // Less frequent polling (cheaper)
        executor.queueStatInterval = '5m'
        executor.submitRateLimit = '50/1min'  // More aggressive submission
        executor.exitReadTimeout = '10min'    // Wait longer for exit status
    }
}
```

### 2.5 Chỉ thị SLURM theo từng process

FastQC chủ yếu chạy đơn luồng và bị giới hạn bởi I/O. Trong các lần chạy của chúng tôi, cấp thêm tài nguyên cho nó — ví dụ 8 CPU và 16 GB RAM — không rút ngắn thời gian chạy. Thêm CPU hay bộ nhớ cho FastQC, hoặc các công cụ tương tự, không làm việc xử lý một mẫu nhanh hơn. Chạy hai mẫu với 8 CPU mỗi mẫu không hẳn nhanh hơn chạy chúng với 2 CPU mỗi mẫu; mức phân bổ hợp lý thường là 1–2 CPU và 2–4 GB RAM cho mỗi process FastQC.

Để thảo luận đầy đủ hơn, xem [Tối ưu chi phí tính toán cho dữ liệu đầu vào bằng Nextflow (Phần 2)](/blogs/bioinformatics-computing-resource-optimization-part2).

Sau khi đã chọn profile, có thể tùy chỉnh từng process:

```groovy
process {
    withName: FASTQC {
        cpus = 2
        memory = '4.GB'
        time = '1.h'
    }
}
```

**Một biện pháp hữu ích:** một hàm kiểm tra tài nguyên giúp ngăn yêu cầu vượt quá giới hạn của cluster:

```groovy
def check_max(obj, type) {
    if (type == 'memory') {
        try {
            if (obj.compareTo(params.max_memory as nextflow.util.MemoryUnit) == 1)
                return params.max_memory as nextflow.util.MemoryUnit
            else
                return obj
        } catch (all) {
            println "WARNING: Memory exceeds max! Using ${params.max_memory}"
            return obj
        }
    } else if (type == 'cpus') {
        return Math.min(obj, params.max_cpus as int)
    }
}

// Then use in process definitions
withName: FASTQC {
    cpus = { check_max(4 * task.attempt, 'cpus') }
    memory = { check_max(8.GB * task.attempt, 'memory') }
}
```

## 3. Tối ưu tài nguyên theo từng công cụ

### 3.1 Nhận diện điểm nghẽn của pipeline

Trong các lần chạy ở Phần 2 (khoảng 3 phút 38 giây cho một mẫu), thời gian phân bố xấp xỉ như sau:

| Bước | Công cụ                           | Thời gian | Loại điểm nghẽn                  |
| ---- | --------------------------------- | --------- | -------------------------------- |
| 1    | FastQC                            | 15s       | Chạy không có tùy chọn thread    |
| 2    | Trim Galore                       | 45s       | Có FastQC như một phần bên trong |
| 3    | BWA Align                         | 60s       | Phiên bản cũ                     |
| 4    | MarkDuplicates                    | 20s       | Chạy không có tùy chọn thread    |
| 5-7  | BQSR (Gen+Apply)                  | 40s       | Chạy không có tùy chọn thread    |
| 8    | QC Metrics                        | 10s       | Giới hạn bởi I/O                 |
| 9    | HaplotypeCaller                   | 80s       | **Giới hạn bởi CPU (chậm nhất)** |
| 10+  | GenotypeGVCFs, filter, annotation | 68s       | Giới hạn bởi CPU + I/O           |

**Quan sát chính:** bước 1 và 2 (FastQC cùng Trim Galore) đọc dữ liệu hai lần, còn bước 9 (HaplotypeCaller) chạy tuần tự. Đây là những mục tiêu tự nhiên để tối ưu.

### 3.2 Tinh chỉnh tài nguyên theo từng công cụ

:::tip
Một vài điểm hữu ích khi tối ưu từng task ở quy mô lớn:

+ Ưu tiên các công cụ mới hơn nếu chúng có hiệu năng tốt hơn, dùng ít tài nguyên hơn hoặc có nhiều tính năng hơn, miễn là đáp ứng yêu cầu của workflow.
+ Nếu một công cụ mở rộng tốt theo CPU, RAM hoặc GPU, có thể cấp thêm tài nguyên trong giai đoạn phát triển để tăng tốc thử nghiệm. Khi workflow đã ổn định, điều chỉnh yêu cầu tài nguyên cho phù hợp với nhu cầu production.
+ Loại bỏ những công cụ không còn dùng; workflow gọn hơn sẽ dễ bảo trì hơn. Phiên bản cũ vẫn có thể truy cập bằng cách checkout đúng revision `git`.
:::

#### Tiền xử lý dữ liệu raw: fastp

Để trim và kiểm soát chất lượng read, `fastp` là một lựa chọn hiện đại được dùng phổ biến: nó nhanh và thực hiện cả hai bước trong một lần, thay cho cặp FastQC + Trim Galore.

:::tip
+ Tham số cho công cụ này có thể được truyền qua `task.ext.arg`.
+ Nói chung nên đưa tham số ra thành param của Nextflow. Trong ví dụ nhanh này, `qualified_quality_phred` và `length_required` được hard-code.
:::

```bash
process FASTP {
    tag "$meta.id"
    label 'process_medium'
    
    
    container 'quay.io/biocontainers/fastp:1.1.0--heae3180_0'
    
    input:
    tuple val(meta), path(reads)
    
    output:
    tuple val(meta), path("*_trimmed_{1,2}.fastq.gz"), emit: reads
    tuple val(meta), path("*.html"), emit: html
    tuple val(meta), path("*.json"), emit: json
    path "versions.yml", emit: versions
    
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def args = task.ext.args ?: ''
    def prefix = task.ext.prefix ?: "${meta.read_group}"
    
    """
    # Adapter trimming, quality filtering, and QC with fastp
    fastp \\
        --thread $task.cpus \\
        --in1 ${reads[0]} \\
        --in2 ${reads[1]} \\
        --out1 ${prefix}_trimmed_1.fastq.gz \\
        --out2 ${prefix}_trimmed_2.fastq.gz \\
        --html ${prefix}_fastp.html \\
        --json ${prefix}_fastp.json \\
        --qualified_quality_phred 20 \\
        --length_required 50 \\
        --detect_adapter_for_pe \\
        $args
    
    # Create versions file
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fastp: \$(fastp --version 2>&1 | grep -oP 'fastp \\K[0-9.]+')
    END_VERSIONS
    """
}
```

#### Alignment: BWA-mem2

BWA-mem2 là bản hiện thực mới hơn của BWA-MEM, chạy nhanh hơn và mở rộng gần như tuyến tính theo số luồng, nên thêm CPU thường rút ngắn thời gian chạy với chi phí tăng không đáng kể.

Nhớ index lại hệ gen: index của BWA-MEM không dùng được cho BWA-mem2.

```bash
process BWA_MEM {
    tag "$meta.id"
    label 'process_high'
    
    conda "${moduleDir}/environment.yml"
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://community-cr-prod.seqera.io/docker/registry/v2/blobs/sha256/9a/9ac054213e67b3c9308e409b459080bbe438f8fd6c646c351bc42887f35a42e7/data' :
        'community.wave.seqera.io/library/bwa-mem2_htslib_samtools:e1f420694f8e42bd' }"
    
    input:
    tuple val(meta), path(reads)
    path reference
    path reference_fai
    path reference_dict
    path bwa_index
    
    output:
    tuple val(meta), path("*.bam"), emit: bam
    path "versions.yml", emit: versions
    
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def args = task.ext.args ?: '-M'
    def prefix = task.ext.prefix ?: "${meta.read_group}"
    // Proper read group with unique ID per lane but same SM (sample) for merging
    def read_group = "@RG\\tID:${meta.read_group}\\tSM:${meta.sample}\\tPL:ILLUMINA\\tLB:${meta.sample}_lib\\tPU:${meta.lane}"
    
    """
    # Find the BWA-MEM2 index prefix
    INDEX=\$(find -L ./ -name "*.amb" | sed 's/\\.amb\$//')
    
    # Read Alignment with BWA-MEM2
    bwa-mem2 \\
        mem \\
        -t $task.cpus \\
        $args \\
        -R "${read_group}" \\
        \$INDEX \\
        ${reads[0]} ${reads[1]} \\
        | samtools view -Sb - > ${prefix}_aligned.bam
    
    # Create versions file
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        bwamem2: \$(echo \$(bwa-mem2 version 2>&1) | sed 's/.* //')
        samtools: \$(echo \$(samtools --version 2>&1) | sed 's/^.*samtools //; s/Using.*\$//')
    END_VERSIONS
    """
    
    stub:
    def prefix = task.ext.prefix ?: "${meta.read_group}"
    
    """
    touch ${prefix}_aligned.bam
    
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        bwamem2: \$(echo \$(bwa-mem2 version 2>&1) | sed 's/.* //')
        samtools: \$(echo \$(samtools --version 2>&1) | sed 's/^.*samtools //; s/Using.*\$//')
    END_VERSIONS
    """
}
```

#### Tiền xử lý read đã align: GATK Spark

`MarkDuplicates`, `BaseRecalibrator` và `ApplyBQSR` là những công cụ đơn luồng và trong các lần chạy của chúng tôi chiếm một phần đáng kể tổng thời gian. GATK cung cấp các phiên bản dựa trên Spark để chia nhỏ công việc thành nhiều task trên một node, thường hiệu quả hơn. Module dưới đây cho thấy những gì thay đổi.

:::info
+ Container: đổi từ `broadinstitute/gatk:4.6.1.0` sang `quay.io/biocontainers/gatk4-spark:4.6.1.0--hdfd78af_0`.
+ Label: dùng `process_high` để cấp nhiều bộ nhớ và CPU hơn.
+ Bộ nhớ: yêu cầu khoảng 80% bộ nhớ được cấp thường đã đủ cho task ngốn bộ nhớ này.
+ Cú pháp: cần một thay đổi cấu hình nhỏ để chạy dưới Spark; các tham số còn lại không đổi.
:::

```bash
process GATKSPARK_APPLYBQSR {
    tag "$meta.id"
    label 'process_high'
    container 'quay.io/biocontainers/gatk4-spark:4.6.1.0--hdfd78af_0'
    
    input:
    tuple val(meta), path(bam), path(bai), path(recal_table)
    path reference
    path reference_fai
    path reference_dict
    
    output:
    tuple val(meta), path("*_recal.bam"), emit: bam
    tuple val(meta), path("*_recal.bam.bai"), emit: bai
    path "versions.yml", emit: versions
    
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def avail_mem = (task.memory.mega * 0.8).intValue()
    """
    # Apply Base Quality Score Recalibration
    gatk --java-options "-Xmx${avail_mem}M -XX:-UsePerfData" \\
        ApplyBQSRSpark \\
        -I $bam \\
        -R $reference \\
        --bqsr-recal-file $recal_table \\
        --create-output-bam-index true \\
        -O ${meta.id}_recal.bam \\
        --spark-master local[${task.cpus}] \\
        --tmp-dir .
    
    # Create versions file
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        gatk4: \$(gatk --version 2>&1 | grep -E 'GATK v[0-9.]+' | sed 's/.*v\\([0-9.]\\+\\).*/\\1/' || echo "4.4.0.0")
    END_VERSIONS
    """
}
```

### 3.3 Tóm tắt các thay đổi

:::info
Những cải tiến trong phần này:

+ Hỗ trợ nhiều lane cho một mẫu trong samplesheet.
+ FastQC và Trim Galore được thay bằng fastp để tiền xử lý nhanh hơn, gọn hơn.
+ BWA-MEM được nâng lên BWA-MEM2 để cải thiện tốc độ align.
+ Các bước tiền xử lý của GATK nay dùng công cụ GATK Spark và phiên bản GATK mới hơn.
+ Cấu hình được cập nhật để cho phép đọc file đầu vào từ nguồn từ xa.
:::

![recap](./imgs/recap_nextflow_variant_calling_workflow.png)

### 3.4 Tối ưu ở quy mô công nghiệp

Trong các pipeline production cho gọi biến thể lâm sàng hoặc cohort lớn, chi phí mỗi lần chạy rất đáng quan tâm. Khác với workflow nghiên cứu nơi kích thước file thay đổi, pipeline công nghiệp thường vận hành trên các protocol đã chuẩn hóa với đặc tính đầu vào cố định. Vì vậy mỗi process hành xử có thể dự đoán được và có thể được tinh chỉnh sát với mức tài nguyên tối thiểu cần thiết.

#### 3.4.1 Vì sao pipeline production cần tối ưu theo từng process

Trong môi trường công nghiệp, kiểm soát chất lượng được đưa vào protocol, nên file đầu vào tuân theo các đặc tả chặt chẽ:

- **Định dạng file:** luôn là FASTQ paired-end, nén gzip.
- **Chỉ số chất lượng:** được kiểm tra tại thời điểm nhập dữ liệu bởi cơ sở giải trình tự.
- **Kích thước file:** ít biến động, ví dụ trong khoảng ±10% so với mức cơ sở đối với mẫu WGS.
- **Tần suất chạy:** từ hàng nghìn đến hàng triệu mẫu.

Tính dự đoán được này cho phép mỗi process được tinh chỉnh để đạt hiệu quả mà ít rủi ro gây lỗi dây chuyền.

#### 3.4.2 Tối ưu chi phí trên toàn pipeline

Thay vì phân bổ tài nguyên chung chung, pipeline production tối ưu chi phí trên mỗi process cho mỗi mẫu:

```
Cost per sample = Σ(cost_per_hour × hours_per_process)
```

**Ví dụ: cohort kiểu UK Biobank với 500.000 mẫu WGS**

:::warning
Các chi phí dưới đây là giả định minh họa, không phải số liệu đo được khi chạy pipeline này.
:::

Giả định:

- Compute: AWS EC2 `c6i.8xlarge` với $1.35/giờ (32 CPU, 64 GB RAM)
- 500.000 mẫu, độ phủ WGS trung bình 30×

**Chi phí mỗi mẫu (pipeline gốc từ Phần 2):**

| Process                   | Thời gian | CPU | Bộ nhớ | Chi phí            | Ghi chú                  |
| ------------------------- | --------- | --- | ------ | ------------------ | ------------------------ |
| FastQC                    | 15s       | 1   | 2GB    | $0.0006            | Đơn luồng                |
| TrimGalore                | 45s       | 1   | 2GB    | $0.0017            | Đơn luồng                |
| BWA Align                 | 60s       | 1   | 4GB    | $0.0023            | Tuần tự, không song song |
| MarkDuplicates            | 20s       | 1   | 8GB    | $0.0008            | GATK chuẩn               |
| BQSR                      | 40s       | 1   | 4GB    | $0.0015            | Đơn luồng                |
| HaplotypeCaller           | 80s       | 1   | 8GB    | $0.0030            | **Bước chậm nhất**       |
| GenotypeGVCFs + VEP       | 68s       | 1   | 4GB    | $0.0026            | Chú giải                 |
| **Tổng (328s / mẫu)**     |           |     |        | **$0.0125/mẫu**    | Cho 500k: **$6,250**     |

**Pipeline tối ưu (Phần 3, với CPU và bộ nhớ khớp với từng công cụ):**

| Process                   | Công cụ              | Thời gian | CPU | Bộ nhớ | Chi phí            | Mức giảm          |
| ------------------------- | -------------------- | --------- | --- | ------ | ------------------ | ----------------- |
| Tiền xử lý                | fastp                | 25s       | 8   | 4GB    | $0.0009            | -67%              |
| Alignment                 | BWA-mem2             | 35s       | 16  | 8GB    | $0.0018            | -42%              |
| Dedup+BQSR                | GATK Spark           | 28s       | 16  | 32GB   | $0.0015            | -69%              |
| Gọi biến thể              | HaplotypeCallerSpark | 22s       | 32  | 64GB   | $0.0013            | -57%              |
| **Tổng (110s / mẫu)**     |                      |           |     |        | **$0.0055/mẫu**    | **giảm 56%**      |

**Cho 500.000 mẫu:**

- Bản gốc: 500k × $0.0125 = **$6,250**
- Bản tối ưu: 500k × $0.0055 = **$2,750**
- **Mức tiết kiệm theo mô hình: khoảng $3,500 cho một lần chạy toàn cohort**

#### 3.4.3 Nhắm đúng CPU và bộ nhớ cho từng process

Nextflow cung cấp sẵn các công cụ báo cáo — `report`, `trace` và `timeline` — giúp phân tích mức dùng CPU và bộ nhớ của từng process. Sau khi bật, có thể xem các báo cáo được tạo trong thư mục output để nhận diện mẫu sử dụng tài nguyên.

Với bộ dữ liệu nhỏ, thường thấy rằng tăng số luồng cho công cụ đa luồng làm tăng mức dùng CPU trong khi bộ nhớ gần như không đổi và còn xa giới hạn. Khi kích thước dữ liệu tăng, các báo cáo này cho biết thêm CPU hay bộ nhớ có thực sự cải thiện hiệu năng hay không. Một nguyên tắc thực tế là cấp tối đa khoảng 80% bộ nhớ khả dụng cho các process nặng, và tăng CPU cho những công cụ mở rộng tốt theo luồng.

Để biết thêm chi tiết, xem [Tối ưu chi phí tính toán cho dữ liệu đầu vào bằng Nextflow (Phần 2)](/blogs/bioinformatics-computing-resource-optimization-part2).

![review_performance](./imgs/report_review.png)

Không phải process nào cũng cần cùng tài nguyên. Có thể dùng `withName` để tinh chỉnh CPU và bộ nhớ cho từng process:

```groovy
process {
    withName: FASTP {
        cpus = 8          // Multi-threaded, scales well up to 8 threads
        memory = '4 GB'   // Minimal memory needs
        time = '1h'
    }
    
    withName: 'BWA.*' {
        cpus = 16         // Thread-heavy, scales with CPU count
        memory = '32 GB'  
        time = '1h'
    }
    
    withName: 'GATKSPARK.*' {
        cpus = 32         // Spark parallelism
        memory = '48 GB'  // Memory-intensive distributed processing
        time = '2h'
    }
}
```

**Lý do cho từng mức phân bổ:**

1. **fastp (8 CPU, 4 GB):** trim adapter bị giới hạn bởi I/O. Nó mở rộng gần như tuyến tính đến khoảng 8 luồng, sau đó hiệu suất tăng chậm dần, và cần rất ít bộ nhớ.
2. **BWA-mem2 (16 CPU, 32 GB):** align mở rộng tốt đến 16 CPU. Mức dùng bộ nhớ bao gồm index hệ gen và phần phụ trội cho mỗi luồng; 32 GB là mức khá rộng rãi ở đây.
3. **GATK Spark (32 CPU, 48 GB):** đánh dấu duplicate và hiệu chỉnh chất lượng base hưởng lợi từ song song hóa của Spark, và cần bộ nhớ để chia nhỏ công việc.

Cấu hình trên có thể được lưu thành `optimized.config` rồi áp dụng cho lần chạy mới:

```bash
nextflow run main.nf -profile singularity --input Batch_1_100_samples_Biobank.csv -c optimized.config
```

#### 3.4.4 Các lưu ý cho production

**Chiến lược tài nguyên thích ứng cho các trường hợp biên:**

Trong một cohort rất lớn, một số mẫu sẽ lỗi do bất thường dữ liệu như read hỏng hay độ phủ bất thường. Logic retry của Nextflow xử lý những trường hợp này mà không cần cấp dư tài nguyên cho mọi job:

```groovy
process {
    errorStrategy = { task.exitStatus in [137,139,143,255] ? 'retry' : 'finish' }
    maxRetries = 2
    
    withLabel: process_low {
        cpus = { 2 * task.attempt }
        memory = { 2.GB * task.attempt }
    }
    
    withLabel: process_medium {
        cpus = { 4 * task.attempt }
        memory = { 8.GB * task.attempt }
    }
    
    withLabel: process_high {
        cpus = { 16 * task.attempt }
        memory = { 32.GB * task.attempt }
    }
}
```

**Cách cơ chế tăng dần tài nguyên giúp tiết kiệm chi phí:**

1. Lần thử đầu tiên dùng mức tài nguyên cơ sở đã tối ưu chi phí.
2. Nếu task hết bộ nhớ (mã thoát 137), nó được chạy lại với nhiều CPU và bộ nhớ hơn.
3. Phần lớn mẫu thành công ngay lần đầu, nên ít năng lực bị lãng phí.
4. Chỉ một số ít mẫu nhận mức tài nguyên tăng cao.

**Ví dụ với 500.000 mẫu (theo mô hình):**

- Tỉ lệ lỗi: 0,5% ≈ 2.500 lần retry.
- Chi phí retry: khoảng $50 phụ trội theo mô hình này.
- Chi phí nếu cấp mức tài nguyên tăng cao cho mọi mẫu: từ $1.000 trở lên.
- **Mức tiết kiệm theo mô hình nhờ retry thích ứng: khoảng 95%.**

## 4. Các lưu ý thực tiễn

Xây dựng một pipeline gọi biến thể có khả năng mở rộng không chỉ là nối các công cụ lại với nhau, mà còn là thiết kế để bảo đảm tính đúng đắn, khả năng tái lập và khả năng bảo trì.

### 4.1 Bảo đảm mỗi bước chạy đúng

Mỗi process — FastQC, alignment, gọi biến thể — cần được kiểm chứng cho loại dữ liệu và nền tảng giải trình tự đang dùng. Tăng CPU cho FastQC không cải thiện hiệu năng của nó, và các tham số có thể cần điều chỉnh cho các mức độ phủ khác nhau, ví dụ WGS 30× so với 100×, hoặc cho các công nghệ giải trình tự khác nhau. Nên kiểm thử với bộ dữ liệu đại diện và xem lại tài liệu công cụ để biết các tùy chọn đặc thù cho từng nền tảng.

### 4.2 Biết khi nào workflow đã đủ tốt

Đối chiếu với các chuẩn vàng đã được thiết lập sẽ cho câu trả lời khách quan. Với gọi biến thể germline, các bộ dữ liệu tham chiếu như GIAB (Genome in a Bottle) cho phép so sánh output VCF với biến thể đã biết, tạo ra các chỉ số về độ chính xác và hiệu năng. Với các phân tích mới, có thể định nghĩa tiêu chí riêng bằng đối chứng in silico hoặc đối chứng ướt. Xem [bài công bố của NIST về benchmarking](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=925009) để biết thêm bối cảnh.

### 4.3 Tổ chức pipeline bioinformatics

Thiết kế module hóa rất quan trọng cho khả năng bảo trì và tái sử dụng. Nên áp dụng các thực hành từ những dự án như nf-core: tách workflow thành các module và subworkflow tái sử dụng được, cung cấp bộ dữ liệu ví dụ để kiểm thử, và thêm kiểm thử tự động để bảo đảm output luôn nhất quán. Điều này hỗ trợ phát triển nhanh hơn, debug dễ hơn và triển khai production vững chắc hơn. Xây dựng pipeline dựa trên quy ước của nf-core trong khi vẫn điều chỉnh cho một bộ dữ liệu cụ thể là một hướng cân bằng hợp lý.

## 5. Repository

Toàn bộ mã nguồn và ví dụ của chuỗi bài: [variant-calling-gatk-pipeline-best-practice-from-scratch](https://github.com/nttg8100/variant-calling-gatk-pipeline-best-practice-from-scratch).

## Tài liệu tham khảo

1. **Tài liệu Nextflow** — executor, cấu hình và báo cáo: https://www.nextflow.io/docs/latest/
2. **Executor SLURM của Nextflow** — tham chiếu cấu hình: https://www.nextflow.io/docs/latest/executor.html#slurm
3. **NGS101** — các bài hướng dẫn gọi biến thể: https://ngs101.com/
4. **Diễn đàn GATK** — xử lý sự cố và best practice: https://gatkforums.broadinstitute.org/
5. **Diễn đàn cộng đồng Nextflow**: https://forums.nextflow.io/
6. **nf-core** — các pipeline bioinformatics production: https://nf-co.re/
7. **Bài công bố của NIST về benchmarking** — tài liệu tham chiếu khi so sánh kết quả gọi biến thể với truth set: https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=925009
8. **Mã nguồn tham chiếu cho bài này**: https://github.com/nttg8100/variant-calling-gatk-pipeline-best-practice-from-scratch
