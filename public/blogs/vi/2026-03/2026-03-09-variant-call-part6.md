---
slug: gatk-variant-calling-production-slurm-optimization-part6
title: "Gọi biến thể (Phần 6): Có cần một pipeline phức tạp để gọi biến thể chất lượng cao?"
description: "Benchmark hai workflow germline tối giản — fastp → bwa-mem2 → sambamba → freebayes và fastp → bwa-mem2 → deepvariant — trên bộ truth set GIAB HG002, so sánh với nf-core/sarek."
series: Variant Calling from Bash to Production
seriesOrder: 6
authors: [vieomics]
tags: [variant-calling, nextflow]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part6.png
---

Trong nhiều dự án bioinformatics, pipeline có xu hướng phình ra: thêm bước tiền xử lý, thêm công cụ, thêm tầng trừu tượng. Một câu hỏi hợp lý là liệu tất cả những thứ đó có thực sự cần thiết cho một phân tích germline đơn mẫu hay không. Trong phần benchmark HG002 của GIAB đã giới thiệu ở [Phần 5](/blogs/gatk-variant-calling-production-slurm-optimization-part5), chúng tôi so sánh hai workflow tối giản với pipeline nf-core/sarek đầy đủ. Trong các lần chạy của mình, hai workflow tối giản đạt độ chính xác SNP và INDEL gần với sarek — trên 99% F1 đối với HG002.

<!--truncate-->

:::tip
+ Môi trường và script được đăng tại [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
+ Clone repository với tag 0.4.0 để tái lập nội dung bài viết này
:::

## Tổng quan chuỗi bài

- **[Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: Pipeline germline bằng bash quản lý với Pixi
- **[Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Kiểm chứng workflow bash
- **[Phần 3](/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: Từ bash sang Nextflow
- **[Phần 4](/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Chạy trong container và tái lập kết quả
- **[Phần 5](/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmark gọi biến thể germline với nf-core/sarek
- **Phần 6 (bài này)**: Có cần một pipeline phức tạp để gọi biến thể chất lượng cao?
- **[Phần 7](/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Chú giải biến thể với SnpEff và Ensembl VEP
- **[Phần 8](/blogs/gatk-variant-calling-production-slurm-optimization-part8)**: Gọi biến thể cấu trúc — một benchmark với short read
- **[Phần 9](/blogs/storage-cost-optimization-cram-format)**: Tối ưu chi phí lưu trữ với định dạng CRAM
- **[Phần 10](/blogs/structural-variant-calling-short-reads-challenges)**: Những thách thức khi gọi biến thể cấu trúc với short read
- **[Phần 11](/blogs/gvcf-population-scale-genotyping)**: Genotyping quy mô quần thể với gVCF

Clone repository:
```bash
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.4.0
cd nf-germline-short-read-variant-calling
cd benchmark/pipelines/nf-germline-short-read-variant-calling
```

## 1. Giới thiệu workflow

:::tip
Đây là workflow được xây dựng từ đầu (dạng bash) rồi chuyển sang Nextflow. Điểm mới:
+ Workflow được tái cấu trúc thành các subworkflow và workflow
+ Bước `processing` được tách thành `alignment` và `preprocess_alignment`
:::

```bash
├── LICENSE
├── Makefile
├── Readme.md
├── assets
│   ├── samplesheet.csv
├── conf
│   ├── base.config
│   ├── igenomes.config
│   └── modules.config
├── main.nf
├── modules
│   └── local
│       ├── bcftools
│       │   ├── query
│       │   │   └── main.nf
│       │   └── stats
│       │       └── main.nf
│       ├── bedtools
│       │   └── genomecov
│       │       └── main.nf
│       ├── bwa
│       │   ├── index
│       │   │   └── main.nf
│       │   └── mem2
│       │       └── main.nf
│       ├── deepvariant
│       │   └── main.nf
│       ├── fastp
│       │   └── trim
│       │       └── main.nf
│       ├── freebayes
│       │   └── main.nf
│       ├── gatk
│       │   ├── collectmetrics
│       │   │   └── main.nf
│       │   ├── genotypegvcfs
│       │   │   └── main.nf
│       │   ├── haplotypecaller
│       │   │   └── main.nf
│       │   ├── mergevcfs
│       │   │   └── main.nf
│       │   ├── selectvariants_indel
│       │   │   └── main.nf
│       │   ├── selectvariants_snp
│       │   │   └── main.nf
│       │   ├── variantfiltration_indel
│       │   │   └── main.nf
│       │   └── variantfiltration_snp
│       │       └── main.nf
│       ├── gatkspark
│       │   ├── applybqsr
│       │   │   └── main.nf
│       │   ├── baserecalibrator
│       │   │   └── main.nf
│       │   └── markduplicates
│       │       └── main.nf
│       ├── sambamba
│       │   └── markdup
│       │       └── main.nf
│       ├── samtools
│       │   ├── merge
│       │   │   └── main.nf
│       │   └── sort
│       │       └── main.nf
│       └── snpeff
│           └── annotate
│               └── main.nf
├── nextflow.config
├── nf-test.config
├── pixi.lock
├── pixi.toml
├── subworkflows
│   └── local
│       ├── alignment
│       │   └── main.nf
│       ├── annotation
│       │   └── main.nf
│       ├── preprocessing_alignment
│       │   └── main.nf
│       └── variant_calling
│           └── main.nf
├── tests
│   ├── default.nf.test
│   ├── default.nf.test.snap
│   └── nextflow.config
└── workflows
    └── main.nf
```

### 1.1 Config
Để dễ lấy đúng các file tham chiếu theo genome, cấu hình dưới đây được chuyển thể từ nf-core/sarek với dữ liệu tham chiếu công khai:
```json
params {
    genomes = [
        'sarek_test': [
            fasta: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta',
            fasta_fai: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta.fai',
            dict: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.dict',
            index_bwa2_reference: true,
            bwa2_index: 'null',
            dbsnp: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz',
            dbsnp_tbi: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz.tbi',
            known_indels: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz',
            known_indels_tbi: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz.tbi'
        ],
        'GRCh38': [
            fasta: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/WholeGenomeFasta/Homo_sapiens_assembly38.fasta",
            fasta_fai: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/WholeGenomeFasta/Homo_sapiens_assembly38.fasta.fai",
            dict: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/WholeGenomeFasta/Homo_sapiens_assembly38.dict",
            index_bwa2_reference: false,
            bwa2_index: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/BWAmem2Index/",
            dbsnp: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/dbsnp_146.hg38.vcf.gz",
            dbsnp_tbi: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/dbsnp_146.hg38.vcf.gz.tbi",
            known_indels: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/Mills_and_1000G_gold_standard.indels.hg38.vcf.gz",
            known_indels_tbi: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/Mills_and_1000G_gold_standard.indels.hg38.vcf.gz.tbi",
            known_indels_beta: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/beta/Homo_sapiens_assembly38.known_indels.vcf.gz",
            known_indels_beta_tbi: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/beta/Homo_sapiens_assembly38.known_indels.vcf.gz.tbi"
        ]
    ]
}
```

Để chạy với một genome có trong cấu hình này, chỉ định genome qua tham số `--genome`. Workflow sẽ lấy đúng dữ liệu tham chiếu cho genome đó từ `igenomes.config` trong thư mục `conf`:
```bash
nextflow run main.nf \
    -profile docker\
    --genome GRCh38 \
    --input input.csv \
    --output variant_calling
```

### 1.2 Subworkflow
Giống như module, subworkflow có thể được import và dùng trong workflow chính. Subworkflow là một nhóm các module có chức năng tương tự nhau. Việc nhóm lại như vậy giúp tái sử dụng giữa các pipeline và cho cái nhìn rõ hơn về tiến độ trên terminal.

#### 1.2.1 Ví dụ
Subworkflow dưới đây là subworkflow `alignment`:
```groovy
/*
========================================================================================
    ALIGNMENT SUBWORKFLOW
========================================================================================
    QC, Trimming, Alignment
========================================================================================
*/


include { FASTP } from '../../../modules/local/fastp/trim/main'
include { BWAMEM2_INDEX } from '../../../modules/local/bwa/index/main'
include { BWA_MEM2 } from '../../../modules/local/bwa/mem2/main'
include { SAMTOOLS_SORT } from '../../../modules/local/samtools/sort/main'
include { SAMTOOLS_MERGE } from '../../../modules/local/samtools/merge/main'


workflow ALIGNMENT {
    take:
    reads_ch // channel: [ val(meta), [ path(read1), path(read2) ] ]
    ref_fasta // path: reference FASTA
    ref_fai // path: reference FAI
    ref_dict // path: reference dict
    bwa2_index // channel: Optional BWA index files
    index_bwa2_reference // channel: Optional BWA index files

    main:
    ch_versions = channel.empty()

    // Check if BWA index needs to be generated
    // If empty, generate it; otherwise use provided index
    if (index_bwa2_reference) {
        BWAMEM2_INDEX(ref_fasta)
        ch_versions = ch_versions.mix(BWAMEM2_INDEX.out.versions)
        bwa2_index_ch = BWAMEM2_INDEX.out.index
    }
    else {
        bwa2_index_ch = channel.fromPath(bwa2_index)
    }
    //
    // STEP 1: Adapter Trimming, Quality Filtering, and QC with fastp
    //
    FASTP(
        reads_ch
    )
    ch_versions = ch_versions.mix(FASTP.out.versions)

    //
    // STEP 2: Read Alignment with BWA-MEM2
    //
    BWA_MEM2(
        FASTP.out.reads,
        ref_fasta,
        ref_fai,
        ref_dict,
        bwa2_index_ch,
    )
    ch_versions = ch_versions.mix(BWA_MEM2.out.versions)

    //
    // STEP 3: Sort BAM file
    //
    SAMTOOLS_SORT(
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
            return [new_meta.id, new_meta, bam]
        }
        .groupTuple()
        .map { _sample_id, metas, bams ->
            return [metas[0], bams]
        }
        .set { ch_bams_to_merge }

    SAMTOOLS_MERGE(
        ch_bams_to_merge
    )
    ch_versions = ch_versions.mix(SAMTOOLS_MERGE.out.versions)


    emit:
    bam = SAMTOOLS_MERGE.out.bam // channel: [ val(meta), path(bam) ]
    bai = SAMTOOLS_MERGE.out.bai // channel: [ val(meta), path(bai) ]
    versions = ch_versions // channel: path(versions.yml)
}
```

:::info
Subworkflow so với module — điểm mới là gì?
+ Input được khai báo sau `take`
+ Output được khai báo sau `emit`
:::

#### 1.2.2 Cách import workflow

Subworkflow được import bằng `include`, tương tự như module:
```groovy
include { ALIGNMENT } from '../subworkflows/local/alignment/main'
include { PREPROCESSING } from '../subworkflows/local/preprocessing_alignment/main'
include { VARIANT_CALLING } from '../subworkflows/local/variant_calling/main'
include { ANNOTATION } from '../subworkflows/local/annotation/main'
/*
========================================================================================
    NAMED WORKFLOW FOR PIPELINE
========================================================================================
*/

workflow GERMLINE_VARIANT_CALLING {
  ...
}
```

Subworkflow cũng có thể được include trong một subworkflow khác. Ở đây bốn subworkflow trên được include trong `GERMLINE_VARIANT_CALLING`, và workflow này lại được include từ `main.nf`:
```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl = 2

include { GERMLINE_VARIANT_CALLING } from './workflows/main.nf'

/*
========================================================================================
    RUN MAIN WORKFLOW
========================================================================================
*/

workflow {

    //
    // Create input channel from samplesheet or input parameters
    //
    // Read from samplesheet CSV
    channel.fromPath(params.input)
        .splitCsv(header: true)
        .map { row ->
            def meta = [:]
            meta.id = row.sample
            meta.sample = row.sample
            // Support both new format (with lane) and old format (without lane)
            meta.lane = row.lane ?: "L001"
            meta.read_group = "${row.sample}_${meta.lane}"
            def reads = []
            reads.add(file(row.fastq_1))
            if (row.fastq_2) {
                reads.add(file(row.fastq_2))
            }
            return [meta, reads]
        }
        .set { ch_input }


    GERMLINE_VARIANT_CALLING(
        ch_input
    )
}
```

### 1.3 So với nf-core/sarek
Chuỗi bài về gọi biến thể mô tả cách pipeline được chuyển từ các cách làm cũ sang framework hiện tại. Theo tài liệu của các công cụ gọi biến thể, có thể không nhất thiết phải tiền xử lý reads đã align bằng GATK best practice — vốn đòi hỏi nhiều tài nguyên tính toán:
+ Freebayes: https://github.com/freebayes/freebayes
+ Deepvariant: https://github.com/google/deepvariant

Trên cơ sở đó, pipeline được refactor để tuân theo hai workflow mà hai công cụ trên khuyến nghị:
+ Freebayes: fastp > bwa-mem2 > sambamba > freebayes
+ Deepvariant: fastp > bwa-mem2 > deepvariant

:::tip
Subworkflow `preprocess_alignment` được cập nhật với giá trị `preprocessor`, nhận chuỗi `gatk` hoặc `sambamba` để chọn phương pháp tiền xử lý
:::

```groovy
#!/usr/bin/env nextflow

/*
========================================================================================
    PREPROCESSING SUBWORKFLOW
========================================================================================
    Deduplication, BQSR, Quality Metrics
========================================================================================
*/

include { GATKSPARK_MARKDUPLICATES } from '../../../modules/local/gatkspark/markduplicates/main'
include { GATKSPARK_BASERECALIBRATOR } from '../../../modules/local/gatkspark/baserecalibrator/main'
include { GATKSPARK_APPLYBQSR } from '../../../modules/local/gatkspark/applybqsr/main'
include { GATK_COLLECTMETRICS } from '../../../modules/local/gatk/collectmetrics/main'
include { SAMBAMBA_MARKDUP } from '../../../modules/local/sambamba/markdup/main'

workflow PREPROCESSING {
    take:
    preprocessor // value: gatk or sambamba
    aligned_bams // channel: [ val(meta), path(bam) ]
    ref_fasta // path: reference FASTA
    ref_fai // path: reference FAI
    ref_dict // path: reference dict
    dbsnp_vcf // path: dbSNP VCF
    dbsnp_tbi // path: dbSNP TBI
    known_indels_vcf // path: known indels VCF
    known_indels_tbi // path: known indels TBI

    main:
    ch_versions = channel.empty()

    if (preprocessor=="gatk"){
        <<GATK preprocessing steps>>

    } else if (preprocessor=="sambamba"){
        <<sambamba>>
    }
    else {
        error "Unsupported preprocessor: ${preprocessor}"
    }
   

    emit:
    bam = ch_processed_bam // channel: [ val(meta), path(bam) ]
    bai = ch_processed_bai // channel: [ val(meta), path(bai) ]
    alignment_summary = ch_alignment_summary // channel: [ val(meta), path(metrics) ]
    insert_metrics = ch_alignment_insert_metrics // channel: [ val(meta), path(metrics) ]
    versions = ch_versions // channel: path(versions.yml)
}
```

Nhiều tài nguyên tính toán hơn đã được cấp phát để các lần chạy hoàn tất nhanh hơn, dùng cấu hình dưới đây (`customized_labels.config`):

```groovy
// HPC internet is quite slow, so we increase the pull timeout for singularity containers
singularity.pullTimeout="100.h"
process {
    cpus   = { 2      * task.attempt }
    memory = { 4.GB   * task.attempt }
    time   = { 4.h    * task.attempt }

    // memory errors which should be retried. otherwise error out
    errorStrategy = { task.exitStatus in ((130..145) + 104) ? 'retry' : 'finish' }
    maxRetries    = 1
    maxErrors     = '-1'

    // Process-specific resource requirements
    // See https://www.nextflow.io/docs/latest/config.html#config-process-selectors
    withLabel:error_ignore {
        errorStrategy = 'ignore'
    }
    withLabel:error_retry {
        errorStrategy = 'retry'
        maxRetries    = 2
    }
    withLabel:process_single {
        cpus   = { 3                   }
        memory = { 6.GB * task.attempt }
        time   = { 4.h  * task.attempt }
    }
    withLabel:process_low {
        cpus   = { 6     * task.attempt }
        memory = { 12.GB * task.attempt }
        time   = { 4.h   * task.attempt }
    }
    withLabel:process_medium {
        cpus   = { 64     * task.attempt }
        memory = { 120.GB * task.attempt }
        time   = { 8.h   * task.attempt }
    }
    withLabel:process_high {
        cpus   = { 64    * task.attempt }
        memory = { 120.GB * task.attempt }
        time   = { 16.h  * task.attempt }
    }
    withLabel:process_long {
        time   = { 20.h  * task.attempt }
    }
    withLabel:process_high_memory {
        memory = { 200.GB * task.attempt }
    }
}
process.executor="slurm"
```

:::tip
Workflow `GERMLINE_VARIANT_CALLING` được cập nhật với tùy chọn `skip_preprocessing`, đưa reads đã align trực tiếp vào công cụ gọi biến thể
:::

```groovy
    if(!params.skip_preprocessing){
        PREPROCESSING(
            params.preprocessor,
            ALIGNMENT.out.bam,
            ref_fasta,
            ref_fai,
            ref_dict,
            dbsnp_vcf,
            dbsnp_tbi,
            known_indels_vcf,
            known_indels_tbi,
        )
        
        ch_versions = ch_versions.mix(PREPROCESSING.out.versions)
        ch_final_bam = PREPROCESSING.out.bam
        ch_final_bai = PREPROCESSING.out.bai
    }

   
    else {
        ch_final_bam = ALIGNMENT.out.bam
        ch_final_bai = ALIGNMENT.out.bai
    }
   
```

## 2. Chạy hai workflow tối giản
Clone repository với các file input có sẵn ở tag 0.4.0:
```bash
# cloning repo
git clone https://github.com/nttg8100/nf-germline-short-read-variant-calling.git -b 0.4.0
cd benchmark/pipelines/nf-germline-short-read-variant-calling
```
### 2.1 Freebayes
Quy trình workflow cho Freebayes: fastp > bwa-mem2 > sambamba > freebayes
```bash
# clone repo again
git clone https://github.com/nttg8100/nf-germline-short-read-variant-calling.git -b 0.4.0
cd benchmark/pipelines/nf-germline-short-read-variant-calling
# Freebayes recommendation: 
# 1. fastp: quality control
# 2. bwa-mem2: read alignment  
# 3. sambamba: PCR remove duplicate
# 4. freebayes: Variant calling
nextflow run nf-germline-short-read-variant-calling \
    -profile docker -c customized_labels.config \
    --genome GRCh38 \
    --input input.csv \
    --variant_caller "freebayes" \
    --preprocessor "sambamba" \
    --output variant_calling
```

### 2.2 Deepvariant
Quy trình workflow cho Deepvariant: fastp > bwa-mem2 > deepvariant
```bash
# Deepvariant recommendation: 
# 1. fastp: quality control
# 2. bwa-mem2: read alignment  
# 3. deepvariant: variant calling 
nextflow run nf-germline-short-read-variant-calling \
    -profile docker -c customized_labels.config \
    --genome GRCh38 \
    --input input.csv \
    --variant_caller "freebayes" \
    --preprocessor "sambamba" \
    --output variant_calling -resume # Running on the same workding directory to reuse the cache for aligned reads processes
```

## 3. Đánh giá
Để đánh giá, chúng tôi dùng lại đúng thiết lập với HG002 từ GIAB trong bài trước về [**benchmark gọi biến thể germline với nf-core/sarek**](/blogs/gatk-variant-calling-production-slurm-optimization-part5).

Benchmark trên GIAB HG002 cho thấy một workflow tối giản (FASTP → BWA-MEM2 → DeepVariant) đạt độ chính xác SNP và INDEL gần như tương đương pipeline nf-core/sarek đầy đủ. Với dữ liệu trong các lần chạy của chúng tôi, độ phức tạp của pipeline không dẫn đến hiệu năng tốt hơn cho gọi biến thể germline đơn mẫu.


| Run               | Type  | Filter | TRUTH.TOTAL | TRUTH.TP | TRUTH.FN | QUERY.TOTAL | QUERY.FP | QUERY.UNK | FP.gt | FP.al | Recall   | Precision | Frac_NA  | F1_Score | TRUTH.TiTv | QUERY.TiTv | TRUTH.het/hom | QUERY.het/hom |
| ----------------- | ----- | ------ | ----------- | -------- | -------- | ----------- | -------- | --------- | ----- | ----- | -------- | --------- | -------- | -------- | ---------- | ---------- | ------------- | ------------- |
| deepvariant_HG002 | INDEL | ALL    | 525469      | 519079   | 6390     | 892719      | 3369     | 348852    | 2473  | 421   | 0.987839 | 0.993805  | 0.390775 | 0.990813 |            |            | 1.528276      | 1.892501      |
| deepvariant_HG002 | INDEL | PASS   | 525469      | 519079   | 6390     | 892719      | 3369     | 348852    | 2473  | 421   | 0.987839 | 0.993805  | 0.390775 | 0.990813 |            |            | 1.528276      | 1.892501      |
| deepvariant_HG002 | SNP   | ALL    | 3365127     | 3344672  | 20455    | 3840687     | 6131     | 488147    | 1391  | 617   | 0.993921 | 0.998171  | 0.127099 | 0.996042 | 2.100128   | 1.986419   | 1.581196      | 1.498072      |
| deepvariant_HG002 | SNP   | PASS   | 3365127     | 3344672  | 20455    | 3840687     | 6131     | 488147    | 1391  | 617   | 0.993921 | 0.998171  | 0.127099 | 0.996042 | 2.100128   | 1.986419   | 1.581196      | 1.498072      |
| freebayes_HG002   | INDEL | ALL    | 525469      | 503744   | 21725    | 883066      | 25587    | 336867    | 14646 | 1947  | 0.958656 | 0.953154  | 0.381474 | 0.955897 |            |            | 1.528276      | 1.856978      |
| freebayes_HG002   | INDEL | PASS   | 525469      | 503744   | 21725    | 883066      | 25587    | 336867    | 14646 | 1947  | 0.958656 | 0.953154  | 0.381474 | 0.955897 |            |            | 1.528276      | 1.856978      |
| freebayes_HG002   | SNP   | ALL    | 3365127     | 3344366  | 20761    | 4404601     | 129353   | 927169    | 3829  | 16162 | 0.993831 | 0.962802  | 0.210500 | 0.978070 | 2.100128   | 1.823321   | 1.581196      | 1.875394      |
| freebayes_HG002   | SNP   | PASS   | 3365127     | 3344366  | 20761    | 4404601     | 129353   | 927169    | 3829  | 16162 | 0.993831 | 0.962802  | 0.210500 | 0.978070 | 2.100128   | 1.823321   | 1.581196      | 1.875394      |


### 3.1 DeepVariant
Thay đổi nhỏ về hiệu năng của workflow tối giản với DeepVariant:

| Chỉ số | Workflow đơn giản | nf-core/sarek | Chênh lệch |
| --------------- | --------------- | ------------- | ---------- |
| SNP Recall      | 0.993921        | 0.993885      | ~0.00004   |
| SNP Precision   | 0.998171        | 0.998421      | ~0.00025   |
| SNP F1 Score    | 0.996042        | 0.996148      | ~0.00011   |
| INDEL Recall    | 0.987839        | 0.989684      | ~0.00185   |
| INDEL Precision | 0.993805        | 0.994586      | ~0.00078   |
| INDEL F1 Score  | 0.990813        | 0.992129      | ~0.00132   |

---


### 3.2 FreeBayes
Thay đổi nhỏ về hiệu năng của workflow tối giản với FreeBayes:

| Chỉ số | Workflow đơn giản | nf-core/sarek | Chênh lệch |
| --------------- | --------------- | ------------- | ---------- |
| SNP Recall      | 0.993831        | 0.993862      | ~0.00003   |
| SNP Precision   | 0.962802        | 0.962893      | ~0.00009   |
| SNP F1 Score    | 0.978070        | 0.978133      | ~0.00006   |
| INDEL Recall    | 0.958656        | 0.959965      | ~0.00131   |
| INDEL Precision | 0.953154        | 0.964047      | ~0.01089   |
| INDEL F1 Score  | 0.955897        | 0.962002      | ~0.00610   |

## Tóm tắt
:::info
- Trong thực tế, dùng ít bước hơn có thể giảm chi phí tính toán của phân tích.
- Một workflow đơn giản, tuân theo khuyến nghị trong tài liệu công cụ, vẫn có thể cho kết quả gần với một pipeline lớn hơn trong benchmark này.
:::


## Tài liệu tham khảo

1. **hap.py — công cụ benchmark biến thể germline từ short read**  
   https://github.com/Illumina/hap.py

2. **Genome in a Bottle (GIAB) — bộ dữ liệu tham chiếu chuẩn vàng**  
   https://www.nist.gov/programs-projects/genome-bottle

3. **nf-core/sarek — pipeline gọi biến thể germline và somatic**  
   https://nf-co.re/sarek

4. **FreeBayes**  
   https://github.com/freebayes/freebayes

5. **DeepVariant**  
   https://github.com/google/deepvariant

6. **GATK Best Practices**  
   https://gatk.broadinstitute.org/hc/en-us/sections/360007226651

7. **nf-germline-short-read-variant-calling — pipeline dùng trong bài này**  
   https://github.com/nttg8100/nf-germline-short-read-variant-calling
- Ảnh bìa: [Short Spinner Used in Molecular Laboratory](https://commons.wikimedia.org/wiki/File:Short_Spinner_Used_in_Molecular_Laboratory.jpg) — Ajay Kumar Chaurasiya, Wikimedia Commons, CC BY-SA 4.0
