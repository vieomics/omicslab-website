---
slug: gatk-variant-calling-production-slurm-optimization-part5
title: "Gọi biến thể (Phần 5): Benchmark gọi biến thể germline với nf-core/sarek"
description: "Chạy nf-core/sarek trên mẫu GIAB HG002, chấm điểm DeepVariant, FreeBayes, HaplotypeCaller, Strelka và Manta bằng hap.py so với truth set của NIST, và đọc các chỉ số precision, recall thu được."
series: Variant Calling from Bash to Production
seriesOrder: 5
authors: [vieomics]
tags: [nextflow, variant-calling, benchmark, giab, hap-py, nf-core]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part5.png
---

Trong suốt chuỗi bài, chúng ta đã xem xét cách một workflow gọi biến thể được xây dựng, chuyển đổi và tối ưu. Điều quan trọng cuối cùng, tuy nhiên, không phải là công cụ hiện đại đến mức nào mà là kết quả gọi biến thể có đứng vững khi đối chiếu với một bộ tham chiếu hay không. Trong bài này, chúng tôi benchmark một số công cụ gọi biến thể trên mẫu HG002 của Genome in a Bottle (GIAB) bằng `nf-core/sarek`, rồi chấm điểm kết quả bằng `hap.py` so với truth set của NIST. Các con số thu được cho SNP và indel tương đồng với những gì được báo cáo trong bài công bố của sarek, với recall và precision trên 99% ở phần lớn công cụ.

<!--truncate-->

:::tip
+ Môi trường và script được tải lên tại [nf-germline-short-read-variant-calling](https://github.com/nttg8100/nf-germline-short-read-variant-calling).
+ Clone repository ở tag 0.3.0 để tái lập nội dung của bài này.
:::

## Tổng quan chuỗi bài

1. [Phần 1 — workflow bash với môi trường Pixi tái lập được](/blogs/gatk-variant-calling-bash-workflow-pixi-part1).
2. [Phần 2 — chuyển các bước tương tự sang Nextflow và kiểm chứng kết quả](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2).
3. [Phần 3 — triển khai quy mô production](/blogs/gatk-variant-calling-production-slurm-optimization-part3).
4. [Phần 4 — kiểm thử và lint](/blogs/gatk-variant-calling-production-slurm-optimization-part4).
5. **Phần 5 (bài này)** — benchmark trên một truth set chuẩn vàng.

Clone repository:

```bash
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.3.0
cd nf-germline-short-read-variant-calling
cd benchmark/pipelines/sarek
```

## 1. Chuẩn bị dữ liệu

Chuẩn bị file `input.csv` như dưới đây. Nextflow có thể tự tải bộ dữ liệu.

```bash
patient,sex,status,sample,lane,fastq_1,fastq_2
HG002,XY,0,HG002,1,s3://human-pangenomics/NHGRI_UCSC_panel/HG002/hpp_HG002_NA24385_son_v1/ILMN/downsampled/HG002_HiSeq30x_subsampled_R1.fastq.gz,s3://human-pangenomics/NHGRI_UCSC_panel/HG002/hpp_HG002_NA24385_son_v1/ILMN/downsampled/HG002_HiSeq30x_subsampled_R2.fastq.gz
```

Benchmark dùng mẫu **HG002** của Genome in a Bottle (GIAB). HG002 được dùng phổ biến làm bộ dữ liệu tham chiếu để benchmark gọi biến thể germline vì nó cung cấp:

- các biến thể truth có độ tin cậy cao,
- các vùng confident có độ tin cậy cao,
- bộ dữ liệu tham chiếu được tuyển chọn kỹ cho SNP và indel.

Đặc điểm bộ dữ liệu:

- Mẫu: **HG002 (NA24385)**
- Giải trình tự: **Illumina short read**
- Độ phủ: **~30X**
- Hệ gen tham chiếu: **GRCh38**
- Truth set: **các kết quả gọi biến thể độ tin cậy cao của GIAB**

File truth VCF và file BED chứa vùng confident được dùng để so sánh biến thể dự đoán với chuẩn vàng.

## 2. Chạy nf-core/sarek

Chúng tôi cấp nhiều tài nguyên tính toán hơn để lần chạy hoàn thành sớm hơn, dùng cấu hình `customized_labels.config` dưới đây.

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

```bash
cd benchmark/pipelines/sarek
pixi run nextflow run nf-core/sarek -r 3.7.1 -profile docker,test_full_germline \
    -c customized_labels.config \
    --input ./input.csv \
    --outdir bwamem \
    --tools "deepvariant,freebayes,strelka,manta,haplotypecaller" \
    --aligner "bwa-mem" \
    -resume
```

Kết quả sau đó được copy vào thư mục tương ứng trong `benchmark`:

```bash
├── pipelines
│   └── sarek
│       ├── customized_labels.config
│       ├── input.csv
│       ├── pixi.lock
│       ├── pixi.toml
│       ├── run_pipeline.sh
│       └── variant_calling
│           ├── deepvariant
│           │   └── HG002
│           │       ├── HG002.deepvariant.g.vcf.gz
│           │       ├── HG002.deepvariant.g.vcf.gz.tbi
│           │       ├── HG002.deepvariant.vcf.gz
│           │       └── HG002.deepvariant.vcf.gz.tbi
│           ├── filtered
│           │   └── HG002
│           │       ├── HG002.deepvariant.bcftools_filtered.vcf.gz
│           │       ├── HG002.deepvariant.bcftools_filtered.vcf.gz.tbi
│           │       ├── HG002.freebayes.filtered.bcftools_filtered.vcf.gz
│           │       ├── HG002.freebayes.filtered.bcftools_filtered.vcf.gz.tbi
│           │       ├── HG002.haplotypecaller.filtered.bcftools_filtered.vcf.gz
│           │       ├── HG002.haplotypecaller.filtered.bcftools_filtered.vcf.gz.tbi
│           │       ├── HG002.strelka.variants.bcftools_filtered.vcf.gz
│           │       └── HG002.strelka.variants.bcftools_filtered.vcf.gz.tbi
│           ├── freebayes
│           │   └── HG002
│           │       ├── HG002.freebayes.filtered.vcf.gz
│           │       ├── HG002.freebayes.filtered.vcf.gz.tbi
│           │       ├── HG002.freebayes.vcf.gz
│           │       └── HG002.freebayes.vcf.gz.tbi
│           ├── haplotypecaller
│           │   └── HG002
│           │       ├── HG002.haplotypecaller.filtered.vcf.gz
│           │       ├── HG002.haplotypecaller.filtered.vcf.gz.tbi
│           │       ├── HG002.haplotypecaller.vcf.gz
│           │       └── HG002.haplotypecaller.vcf.gz.tbi
│           ├── manta
│           │   └── HG002
│           │       ├── HG002.manta.diploid_sv.vcf.gz
│           │       └── HG002.manta.diploid_sv.vcf.gz.tbi
│           └── strelka
│               └── HG002
│                   ├── HG002.strelka.genome.vcf.gz
│                   ├── HG002.strelka.genome.vcf.gz.tbi
│                   ├── HG002.strelka.variants.vcf.gz
│                   └── HG002.strelka.variants.vcf.gz.tbi
```

## 3. Benchmark với bộ dữ liệu HG002

### 3.1 Tải truth set và dữ liệu tham chiếu

Như một proof of concept, benchmark này chỉ dùng một mẫu. Có thể dùng thêm nhiều mẫu khác từ GIAB và các bộ truth công khai khác; script `download.sh` trong thư mục `references` có thể được mở rộng tương ứng.

```bash
# download GATK reference genome
aws s3 cp --recursive --no-sign-request s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/WholeGenomeFasta/  .

# download reference files for benchmarking
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/HG002_GRCh38_1_22_v4.2.1_benchmark.vcf.gz
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/HG002_GRCh38_1_22_v4.2.1_benchmark.vcf.gz.tbi
# download bed files for confident regions
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/HG002_GRCh38_1_22_v4.2.1_benchmark_noinconsistent.bed
```

Tải dữ liệu bằng lệnh:

```bash
cd benchmark/references
pixi run download.sh
```

Các file đã tải được sắp xếp như sau:

```bash
benchmark/
├── Readme.md
├── benchmark.sh
├── benchmark_rewrite.sh
├── pipelines
│   └── sarek
│       ├── customized_labels.config
│       ├── input.csv
│       ├── pixi.lock
│       ├── pixi.toml
│       ├── run_pipeline.sh
│       └── variant_calling
│           ├── deepvariant
│           │   └── HG002
│           │       ├── HG002.deepvariant.g.vcf.gz
│           │       ├── HG002.deepvariant.g.vcf.gz.tbi
│           │       ├── HG002.deepvariant.vcf.gz
│           │       └── HG002.deepvariant.vcf.gz.tbi
│           ├── filtered
│           │   └── HG002
│           │       ├── HG002.deepvariant.bcftools_filtered.vcf.gz
│           │       ├── HG002.deepvariant.bcftools_filtered.vcf.gz.tbi
│           │       ├── HG002.freebayes.filtered.bcftools_filtered.vcf.gz
│           │       ├── HG002.freebayes.filtered.bcftools_filtered.vcf.gz.tbi
│           │       ├── HG002.haplotypecaller.filtered.bcftools_filtered.vcf.gz
│           │       ├── HG002.haplotypecaller.filtered.bcftools_filtered.vcf.gz.tbi
│           │       ├── HG002.strelka.variants.bcftools_filtered.vcf.gz
│           │       └── HG002.strelka.variants.bcftools_filtered.vcf.gz.tbi
│           ├── freebayes
│           │   └── HG002
│           │       ├── HG002.freebayes.filtered.vcf.gz
│           │       ├── HG002.freebayes.filtered.vcf.gz.tbi
│           │       ├── HG002.freebayes.vcf.gz
│           │       └── HG002.freebayes.vcf.gz.tbi
│           ├── haplotypecaller
│           │   └── HG002
│           │       ├── HG002.haplotypecaller.filtered.vcf.gz
│           │       ├── HG002.haplotypecaller.filtered.vcf.gz.tbi
│           │       ├── HG002.haplotypecaller.vcf.gz
│           │       └── HG002.haplotypecaller.vcf.gz.tbi
│           ├── manta
│           │   └── HG002
│           │       ├── HG002.manta.diploid_sv.vcf.gz
│           │       └── HG002.manta.diploid_sv.vcf.gz.tbi
│           └── strelka
│               └── HG002
│                   ├── HG002.strelka.genome.vcf.gz
│                   ├── HG002.strelka.genome.vcf.gz.tbi
│                   ├── HG002.strelka.variants.vcf.gz
│                   └── HG002.strelka.variants.vcf.gz.tbi
├── pixi.lock
├── pixi.toml
├── references
│   ├── HG002_GRCh38_1_22_v4.2.1_benchmark.vcf.gz
│   ├── HG002_GRCh38_1_22_v4.2.1_benchmark.vcf.gz.tbi
│   ├── HG002_GRCh38_1_22_v4.2.1_benchmark_noinconsistent.bed
│   ├── Homo_sapiens_assembly38.dict
│   ├── Homo_sapiens_assembly38.fasta
│   ├── Homo_sapiens_assembly38.fasta.fai
│   ├── download.sh
│   ├── pixi.lock
│   └── pixi.toml
```

### 3.2 Công cụ benchmark

Ở đây chúng tôi dùng [hap.py](https://github.com/Illumina/hap.py) để benchmark kết quả gọi SNP và indel germline. Bài công bố gốc có tại https://www.nature.com/articles/s41587-019-0054-x.

Công cụ này làm gì:

+ Nó định dạng lại các bản ghi biến thể để tìm sự khớp giữa truy vấn và truth set trong file VCF.
+ Hai biến thể có cùng hiệu ứng có thể được ghi với vị trí hoặc nucleotide thay thế khác nhau; ví dụ dưới đây cho thấy một cặp như vậy.
+ Sau khi định dạng lại các bản ghi, `hap.py` tính các chỉ số mô tả mức độ hoạt động của từng công cụ.

![hap.py](./imgs/hap.py.png)

Ví dụ bảng kết quả:

| Type  | Filter | TRUTH.TOTAL | TRUTH.TP | TRUTH.FN | QUERY.TOTAL | QUERY.FP | QUERY.UNK | FP.gt | FP.al | METRIC.Recall | METRIC.Precision   | METRIC.Frac_NA | METRIC.F1_Score    | TRUTH.TOTAL.TiTv_ratio | QUERY.TOTAL.TiTv_ratio | TRUTH.TOTAL.het_hom_ratio | QUERY.TOTAL.het_hom_ratio |
| ----- | ------ | ----------- | -------- | -------- | ----------- | -------- | --------- | ----- | ----- | ------------- | ------------------ | -------------- | ------------------ | ---------------------- | ---------------------- | ------------------------- | ------------------------- |
| INDEL | ALL    | 525469      | 520048   | 5421     | 908475      | 2949     | 363798    | 2010  | 455   | 0.989684      | 0.9945860000000001 | 0.400449       | 0.992129           |                        |                        | 1.528275734138537         | 1.9313187724266925        |
| INDEL | PASS   | 525469      | 520048   | 5421     | 908475      | 2949     | 363798    | 2010  | 455   | 0.989684      | 0.9945860000000001 | 0.400449       | 0.992129           |                        |                        | 1.528275734138537         | 1.9313187724266925        |
| SNP   | ALL    | 3365127     | 3344549  | 20578    | 3841759     | 5292     | 490176    | 1401  | 562   | 0.993885      | 0.9984209999999999 | 0.127592       | 0.9961479999999999 | 2.1001284867575745     | 1.9839843850083037     | 1.5811958532541182        | 1.4858796715961773        |
| SNP   | PASS   | 3365127     | 3344549  | 20578    | 3841759     | 5292     | 490176    | 1401  | 562   | 0.993885      | 0.9984209999999999 | 0.127592       | 0.9961479999999999 | 2.1001284867575745     | 1.9839843850083037     | 1.5811958532541182        | 1.4858796715961773        |

:::info
Các cột do `hap.py` sinh ra được giải thích trong tài liệu của công cụ, tóm tắt như dưới đây.
:::

`hap.py` xuất ra một tập cột phân tầng (stratification) rồi đến các cột chỉ số. Cột phân tầng có thể chứa giá trị giữ chỗ `*`, nghĩa là các giá trị đếm trong dòng đó được tổng hợp trên mọi giá trị có thể của cột. Với subtype, điều này nghĩa là các giá trị đếm đã được cộng dồn qua mọi subtype; với `QQ`, nghĩa là các giá trị đếm tương ứng với toàn bộ biến thể chứ không chỉ những biến thể dưới một ngưỡng QQ.

| Cột phân tầng        | Mô tả                                                                                      |
| :------------------- | ------------------------------------------------------------------------------------------ |
| Type                 | Loại biến thể (SNP / INDEL)                                                                |
| Subtype              | Subtype biến thể (ti/tv/độ dài indel, xem ở trên)                                          |
| Subset               | Tập con của hệ gen hoặc vùng phân tầng                                                     |
| Filter               | Bộ lọc biến thể: PASS, SEL, ALL, hoặc một bộ lọc cụ thể trong VCF truy vấn                 |
| Genotype             | Kiểu gen của biến thể được benchmark (het / homalt / hetalt)                               |
| QQ.Field             | Trường nào trong VCF gốc được dùng để tạo giá trị QQ ở truth và query                      |
| QQ                   | Ngưỡng QQ cho các giá trị ROC                                                              |

| Cột chỉ số                | Mô tả                                                                                                       |
| :------------------------ | ----------------------------------------------------------------------------------------------------------- |
| METRIC.Recall             | Recall cho biểu diễn biến thể truth = TRUTH.TP / (TRUTH.TP + TRUTH.FN)                                      |
| METRIC.Precision          | Precision của biến thể truy vấn = QUERY.TP / (QUERY.TP + QUERY.FP)                                          |
| METRIC.Frac_NA            | Tỉ lệ các lệnh gọi truy vấn không được đánh giá = QUERY.UNK / QUERY.TOTAL                                   |
| METRIC.F1_Score           | Trung bình điều hòa của precision và recall = 2*METRIC.Recall*Metric.Precision/(METRIC.Recall + METRIC.Precision) |
| TRUTH.TOTAL               | Tổng số biến thể truth                                                                                      |
| TRUTH.TP                  | Số lệnh gọi dương tính thật trong biểu diễn truth (đếm qua cột mẫu truth)                                   |
| TRUTH.FN                  | Số lệnh gọi âm tính giả = các lệnh gọi trong truth không khớp với lệnh gọi truy vấn nào                     |
| QUERY.TOTAL               | Tổng số lệnh gọi truy vấn                                                                                   |
| QUERY.TP                  | Số lệnh gọi dương tính thật trong biểu diễn truy vấn (đếm qua cột mẫu truy vấn)                             |
| QUERY.FP                  | Số lệnh gọi dương tính giả trong file truy vấn (các lệnh gọi không khớp nằm trong vùng confident)          |
| QUERY.UNK                 | Số lệnh gọi truy vấn nằm ngoài vùng confident                                                              |
| FP.gt                     | Số lần sai kiểu gen (allele khớp nhưng zygosity khác)                                                       |
| FP.al                     | Số lần sai allele (biến thể khớp theo vị trí nhưng không theo haplotype)                                    |
| TRUTH.TOTAL.TiTv_ratio    | Tỉ lệ Transition / Transversion cho toàn bộ biến thể truth                                                  |
| TRUTH.TOTAL.het_hom_ratio | Tỉ lệ Het/Hom cho toàn bộ biến thể truth                                                                    |
| TRUTH.FN.TiTv_ratio       | Tỉ lệ Transition / Transversion cho biến thể âm tính giả                                                    |
| TRUTH.FN.het_hom_ratio    | Tỉ lệ Het/Hom cho biến thể âm tính giả                                                                      |
| TRUTH.TP.TiTv_ratio       | Tỉ lệ Transition / Transversion cho biến thể dương tính thật                                                |
| TRUTH.TP.het_hom_ratio    | Tỉ lệ Het/Hom cho biến thể dương tính thật                                                                  |
| QUERY.FP.TiTv_ratio       | Tỉ lệ Transition / Transversion cho biến thể dương tính giả                                                 |
| QUERY.FP.het_hom_ratio    | Tỉ lệ Het/Hom cho biến thể dương tính giả                                                                   |
| QUERY.TOTAL.TiTv_ratio    | Tỉ lệ Transition / Transversion cho toàn bộ biến thể truy vấn                                               |
| QUERY.TOTAL.het_hom_ratio | Tỉ lệ Het/Hom cho toàn bộ biến thể truy vấn                                                                 |
| QUERY.TP.TiTv_ratio       | Tỉ lệ Transition / Transversion cho biến thể dương tính thật (biểu diễn truy vấn)                           |
| QUERY.TP.het_hom_ratio    | Tỉ lệ Het/Hom cho biến thể dương tính thật (biểu diễn truy vấn)                                             |
| QUERY.UNK.TiTv_ratio      | Tỉ lệ Transition / Transversion cho biến thể chưa xác định                                                  |
| QUERY.UNK.het_hom_ratio   | Tỉ lệ Het/Hom cho biến thể chưa xác định                                                                    |
| Subset.Size               | Khi dùng vùng phân tầng, đây là số nucleotide trong tập con hiện tại                                        |
| Subset.IS_CONF.Size       | Số base confident (vùng `-f`) trong tập con hiện tại                                                        |

### 3.3 Script và môi trường benchmark

#### 3.3.1 Cài đặt và script

```bash
#!/bin/bash
# Benchmark script for HG002 with DeepVariant, FreeBayes, HaplotypeCaller, Manta, Strelka (relative paths)
set -euo pipefail

HGREF="references/Homo_sapiens_assembly38.fasta"
REF="HG002"
BED="references/${REF}_GRCh38_1_22_v4.2.1_benchmark_noinconsistent.bed"
TRUTH="references/${REF}_GRCh38_1_22_v4.2.1_benchmark.vcf.gz"
SDF="references/grch38.sdf"
THREADS=16

RESULTSDIR="results"
mkdir -p "$RESULTSDIR"

TOOLS=(deepvariant freebayes haplotypecaller manta strelka)

VCF_DEEPVARIANT="pipelines/sarek/variant_calling/deepvariant/HG002/HG002.deepvariant.vcf.gz"
VCF_FREEBAYES="pipelines/sarek/variant_calling/freebayes/HG002/HG002.freebayes.vcf.gz"
VCF_HAPLOTYPECALLER="pipelines/sarek/variant_calling/haplotypecaller/HG002/HG002.haplotypecaller.vcf.gz"
VCF_MANTA="pipelines/sarek/variant_calling/manta/HG002/HG002.manta.diploid_sv.vcf.gz"
VCF_STRELKA="pipelines/sarek/variant_calling/strelka/HG002/HG002.strelka.variants.vcf.gz"

# Path map
declare -A VCF_PATHS=(
  [deepvariant]="$VCF_DEEPVARIANT"
  [freebayes]="$VCF_FREEBAYES"
  [haplotypecaller]="$VCF_HAPLOTYPECALLER"
  [manta]="$VCF_MANTA"
  [strelka]="$VCF_STRELKA"
)

for TOOL in "${TOOLS[@]}"; do
  TOOLDIR="$RESULTSDIR/$TOOL"
  mkdir -p "$TOOLDIR"
  VCF="${VCF_PATHS[$TOOL]}"
  LOG="$TOOLDIR/${REF}_${TOOL}.log"
  SUMMARY="$TOOLDIR/${REF}_${TOOL}.summary.csv"
  FORMATTED="$TOOLDIR/${REF}_${TOOL}.formatted.summary.csv"
  OUTPUT="$TOOLDIR/${REF}_${TOOL}"

  # If the tool output folder already exists with summary file, continue from AWK formatting (line 55)
  if [[ -f "${OUTPUT}.summary.csv" ]]; then
    echo "Output for $TOOL already exists, formatting summary."
    awk -v d="${TOOL}_${REF}" -F',' 'FNR==1{a="run"} FNR>1{a=d} {print $0",\t"a}' "${OUTPUT}.summary.csv" > "$FORMATTED"
    echo "Completed $TOOL (using existing output)"
    continue
  fi

  if [[ ! -f "$VCF" ]]; then
    echo "VCF file not found for $TOOL: $VCF" >&2
    continue
  fi

  echo "Benchmarking $TOOL for $REF ..."
  hap.py "$TRUTH" "$VCF" \
    -o "$OUTPUT" \
    -V --engine=vcfeval --threads "$THREADS" --engine-vcfeval-template "$SDF" \
    -f "$BED" \
    --logfile "$LOG" \
    --scratch-prefix .

  if [[ -f "${OUTPUT}.summary.csv" ]]; then
    awk -v d="${TOOL}_${REF}" -F',' 'FNR==1{a="run"} FNR>1{a=d} {print $0",\t"a}' "${OUTPUT}.summary.csv" > "$FORMATTED"
  else
    echo "Warning: ${OUTPUT}.summary.csv not found for $TOOL" >&2
  fi

  echo "Completed $TOOL"
done

MERGED="$RESULTSDIR/merged_${REF}_benchmark.csv"
echo "Merging summaries to $MERGED ..."
awk '(NR == 1) || (FNR > 1)' "$RESULTSDIR"/*/*.formatted.summary.csv > "$MERGED"
echo "All done. Results for $REF in $MERGED"
```

#### 3.3.2 Chạy benchmark

Chạy script sẽ cho output được sắp xếp như sau:

```bash
├── results
│   └── sarek
│       ├── deepvariant
│       │   ├── HG002_deepvariant.extended.csv
│       │   ├── HG002_deepvariant.formatted.summary.csv
│       │   ├── HG002_deepvariant.log
│       │   ├── HG002_deepvariant.metrics.json.gz
│       │   ├── HG002_deepvariant.roc.Locations.INDEL.PASS.csv.gz
│       │   ├── HG002_deepvariant.roc.Locations.INDEL.csv.gz
│       │   ├── HG002_deepvariant.roc.Locations.SNP.PASS.csv.gz
│       │   ├── HG002_deepvariant.roc.Locations.SNP.csv.gz
│       │   ├── HG002_deepvariant.roc.all.csv.gz
│       │   ├── HG002_deepvariant.runinfo.json
│       │   ├── HG002_deepvariant.summary.csv
│       │   ├── HG002_deepvariant.vcf.gz
│       │   └── HG002_deepvariant.vcf.gz.tbi
│       ├── freebayes
│       │   ├── HG002_freebayes.extended.csv
│       │   ├── HG002_freebayes.formatted.summary.csv
│       │   ├── HG002_freebayes.log
│       │   ├── HG002_freebayes.metrics.json.gz
│       │   ├── HG002_freebayes.roc.Locations.INDEL.PASS.csv.gz
│       │   ├── HG002_freebayes.roc.Locations.INDEL.csv.gz
│       │   ├── HG002_freebayes.roc.Locations.SNP.PASS.csv.gz
│       │   ├── HG002_freebayes.roc.Locations.SNP.csv.gz
│       │   ├── HG002_freebayes.roc.all.csv.gz
│       │   ├── HG002_freebayes.runinfo.json
│       │   ├── HG002_freebayes.summary.csv
│       │   ├── HG002_freebayes.vcf.gz
│       │   └── HG002_freebayes.vcf.gz.tbi
│       ├── haplotypecaller
│       │   ├── HG002_haplotypecaller.extended.csv
│       │   ├── HG002_haplotypecaller.formatted.summary.csv
│       │   ├── HG002_haplotypecaller.log
│       │   ├── HG002_haplotypecaller.metrics.json.gz
│       │   ├── HG002_haplotypecaller.roc.Locations.INDEL.PASS.csv.gz
│       │   ├── HG002_haplotypecaller.roc.Locations.INDEL.csv.gz
│       │   ├── HG002_haplotypecaller.roc.Locations.SNP.PASS.csv.gz
│       │   ├── HG002_haplotypecaller.roc.Locations.SNP.csv.gz
│       │   ├── HG002_haplotypecaller.roc.all.csv.gz
│       │   ├── HG002_haplotypecaller.runinfo.json
│       │   ├── HG002_haplotypecaller.summary.csv
│       │   ├── HG002_haplotypecaller.vcf.gz
│       │   └── HG002_haplotypecaller.vcf.gz.tbi
│       ├── manta
│       │   ├── HG002_manta.extended.csv
│       │   ├── HG002_manta.formatted.summary.csv
│       │   ├── HG002_manta.log
│       │   ├── HG002_manta.metrics.json.gz
│       │   ├── HG002_manta.roc.Locations.INDEL.PASS.csv.gz
│       │   ├── HG002_manta.roc.Locations.INDEL.csv.gz
│       │   ├── HG002_manta.roc.Locations.SNP.PASS.csv.gz
│       │   ├── HG002_manta.roc.Locations.SNP.csv.gz
│       │   ├── HG002_manta.roc.all.csv.gz
│       │   ├── HG002_manta.runinfo.json
│       │   ├── HG002_manta.summary.csv
│       │   ├── HG002_manta.vcf.gz
│       │   └── HG002_manta.vcf.gz.tbi
│       ├── merged_HG002_benchmark.csv
│       └── strelka
│           ├── HG002_strelka.extended.csv
│           ├── HG002_strelka.formatted.summary.csv
│           ├── HG002_strelka.log
│           ├── HG002_strelka.metrics.json.gz
│           ├── HG002_strelka.roc.Locations.INDEL.PASS.csv.gz
│           ├── HG002_strelka.roc.Locations.INDEL.csv.gz
│           ├── HG002_strelka.roc.Locations.SNP.PASS.csv.gz
│           ├── HG002_strelka.roc.Locations.SNP.csv.gz
│           ├── HG002_strelka.roc.all.csv.gz
│           ├── HG002_strelka.runinfo.json
│           ├── HG002_strelka.summary.csv
│           ├── HG002_strelka.vcf.gz
│           └── HG002_strelka.vcf.gz.tbi
```

#### 3.3.3 Đọc kết quả

Chúng tôi đã benchmark một số công cụ gọi biến thể được dùng phổ biến — **DeepVariant, FreeBayes, HaplotypeCaller, Strelka và Manta** — trên bộ dữ liệu **HG002**, đánh giá riêng **SNP và indel** bằng **recall, precision và F1 score**.

Trong các lần chạy này, **DeepVariant cho hiệu năng cân bằng nhất**, với **mức kết hợp recall và precision cao nhất** cho cả **SNP (F1 ≈ 0,996)** và **indel (F1 ≈ 0,992)**. **HaplotypeCaller** và **Strelka** cũng hoạt động tốt, với recall hoặc precision thấp hơn một chút tùy loại biến thể. **FreeBayes** đạt recall tương đương nhưng precision thấp hơn rõ rệt, cho thấy **nhiều dương tính giả hơn**.

**Việc phát hiện SNP ổn định ở phần lớn công cụ (recall ≈ 0,99)**, trong khi **gọi indel biến thiên nhiều hơn**, điều này phù hợp với việc phát hiện chính xác các insertion và deletion nhỏ khó hơn.

Đúng như kỳ vọng, **Manta cho kết quả kém với SNP và indel**, vì nó **được thiết kế cho việc phát hiện biến thể cấu trúc chứ không phải biến thể nhỏ**.

Nhìn chung, các kết quả này gợi ý rằng **các công cụ gọi biến thể dựa trên học máy như DeepVariant cho hiệu năng cân bằng nhất**, trong khi **các công cụ truyền thống vẫn cạnh tranh nhưng có thể cần lọc chặt hơn để kiểm soát dương tính giả**.

:::tip
+ Những quan sát này tương đồng với kết quả được báo cáo cho một phiên bản sarek cũ hơn, công bố tháng 6 năm 2024: https://academic.oup.com/nargab/article/doi/10.1093/nargab/lqae031/7658070
:::

Kết quả tổng hợp trong `merged_HG002_benchmark.csv` được hiển thị dưới đây.

| Type  | Filter | TRUTH.TOTAL | TRUTH.TP | TRUTH.FN | QUERY.TOTAL | QUERY.FP | QUERY.UNK | FP.gt | FP.al | METRIC.Recall | METRIC.Precision | METRIC.Frac_NA | METRIC.F1_Score | TRUTH.TOTAL.TiTv_ratio | QUERY.TOTAL.TiTv_ratio | TRUTH.TOTAL.het_hom_ratio | QUERY.TOTAL.het_hom_ratio | run                   |
| ----- | ------ | ----------- | -------- | -------- | ----------- | -------- | --------- | ----- | ----- | ------------- | ---------------- | -------------- | --------------- | ---------------------- | ---------------------- | ------------------------- | ------------------------- | --------------------- |
| INDEL | ALL    | 525469      | 520048   | 5421     | 908475      | 2949     | 363798    | 2010  | 455   | 0.989684      | 0.994586         | 0.400449       | 0.992129        |                        |                        | 1.528275734138537         | 1.9313187724266925        | deepvariant_HG002     |
| INDEL | PASS   | 525469      | 520048   | 5421     | 908475      | 2949     | 363798    | 2010  | 455   | 0.989684      | 0.994586         | 0.400449       | 0.992129        |                        |                        | 1.528275734138537         | 1.9313187724266925        | deepvariant_HG002     |
| SNP   | ALL    | 3365127     | 3344549  | 20578    | 3841759     | 5292     | 490176    | 1401  | 562   | 0.993885      | 0.998421         | 0.127592       | 0.996148        | 2.1001284867575745     | 1.9839843850083037     | 1.5811958532541182        | 1.4858796715961773        | deepvariant_HG002     |
| SNP   | PASS   | 3365127     | 3344549  | 20578    | 3841759     | 5292     | 490176    | 1401  | 562   | 0.993885      | 0.998421         | 0.127592       | 0.996148        | 2.1001284867575745     | 1.9839843850083037     | 1.5811958532541182        | 1.4858796715961773        | deepvariant_HG002     |
| INDEL | ALL    | 525469      | 504432   | 21037    | 881738      | 19441    | 341005    | 13873 | 1528  | 0.959965      | 0.964047         | 0.386742       | 0.962002        |                        |                        | 1.528275734138537         | 1.8211051374734122        | freebayes_HG002       |
| INDEL | PASS   | 525469      | 504432   | 21037    | 881738      | 19441    | 341005    | 13873 | 1528  | 0.959965      | 0.964047         | 0.386742       | 0.962002        |                        |                        | 1.528275734138537         | 1.8211051374734122        | freebayes_HG002       |
| SNP   | ALL    | 3365127     | 3344473  | 20654    | 4423242     | 129028   | 946030    | 3762  | 16431 | 0.993862      | 0.962893         | 0.213877       | 0.978133        | 2.1001284867575745     | 1.8132303933942775     | 1.5811958532541182        | 1.8836484571228804        | freebayes_HG002       |
| SNP   | PASS   | 3365127     | 3344473  | 20654    | 4423242     | 129028   | 946030    | 3762  | 16431 | 0.993862      | 0.962893         | 0.213877       | 0.978133        | 2.1001284867575745     | 1.8132303933942775     | 1.5811958532541182        | 1.8836484571228804        | freebayes_HG002       |
| INDEL | ALL    | 525469      | 516926   | 8543     | 895219      | 6343     | 351037    | 3797  | 436   | 0.983742      | 0.988344         | 0.392124       | 0.986038        |                        |                        | 1.528275734138537         | 1.8797119780755498        | haplotypecaller_HG002 |
| INDEL | PASS   | 525469      | 516926   | 8543     | 895219      | 6343     | 351037    | 3797  | 436   | 0.983742      | 0.988344         | 0.392124       | 0.986038        |                        |                        | 1.528275734138537         | 1.8797119780755498        | haplotypecaller_HG002 |
| SNP   | ALL    | 3365127     | 3340110  | 25017    | 3957190     | 28452    | 587714    | 2758  | 2288  | 0.992566      | 0.991556         | 0.148518       | 0.992061        | 2.1001284867575745     | 1.9560158340309197     | 1.5811958532541182        | 1.7246457081290798        | haplotypecaller_HG002 |
| SNP   | PASS   | 3365127     | 3340110  | 25017    | 3957190     | 28452    | 587714    | 2758  | 2288  | 0.992566      | 0.991556         | 0.148518       | 0.992061        | 2.1001284867575745     | 1.9560158340309197     | 1.5811958532541182        | 1.7246457081290798        | haplotypecaller_HG002 |
| INDEL | ALL    | 525469      | 8        | 525461   | 7821        | 114      | 7699      | 0     | 42    | 1.5e-05       | 0.065574         | 0.984401       | 3e-05           |                        |                        | 1.528275734138537         | 1.0282749675745784        | manta_HG002           |
| INDEL | PASS   | 525469      | 8        | 525461   | 6877        | 106      | 6763      | 0     | 36    | 1.5e-05       | 0.070175         | 0.983423       | 3e-05           |                        |                        | 1.528275734138537         | 1.060851318944844         | manta_HG002           |
| SNP   | ALL    | 3365127     | 3        | 3365124  | 1416        | 4        | 1408      | 0     | 0     | 1e-06         | 0.5              | 0.99435        | 2e-06           | 2.1001284867575745     | 0.9005524861878453     | 1.5811958532541182        | 1.002828854314003         | manta_HG002           |
| SNP   | PASS   | 3365127     | 3        | 3365124  | 1230        | 4        | 1222      | 0     | 0     | 1e-06         | 0.5              | 0.993496       | 2e-06           | 2.1001284867575745     | 0.8307692307692308     | 1.5811958532541182        | 0.9967532467532467        | manta_HG002           |
| INDEL | ALL    | 525469      | 515560   | 9909     | 875380      | 6569     | 334974    | 4149  | 572   | 0.981143      | 0.987844         | 0.382661       | 0.984482        |                        |                        | 1.528275734138537         | 1.8953993716115898        | strelka_HG002         |
| INDEL | PASS   | 525469      | 513675   | 11794    | 834212      | 3403     | 298722    | 2401  | 324   | 0.977555      | 0.993645         | 0.358089       | 0.985535        |                        |                        | 1.528275734138537         | 1.8205751890885689        | strelka_HG002         |
| SNP   | ALL    | 3365127     | 3341546  | 23581    | 4233605     | 67357    | 821358    | 4302  | 7749  | 0.992993      | 0.98026          | 0.194009       | 0.986585        | 2.1001284867575745     | 1.8583435698762165     | 1.5811958532541182        | 1.8781977072413574        | strelka_HG002         |
| SNP   | PASS   | 3365127     | 3323449  | 41678    | 3676907     | 4389     | 345864    | 909   | 758   | 0.987615      | 0.998682         | 0.094064       | 0.993118        | 2.1001284867575745     | 2.038753419553027      | 1.5811958532541182        | 1.57305061157284          | strelka_HG002         |

## 4. Tóm tắt

:::info
+ Dùng framework hiện đại là hữu ích, nhưng điều quan trọng hơn là pipeline thể hiện được mức **độ chính xác và độ tin cậy** đến đâu.
+ Trong quá trình phát triển, pipeline cần được xem xét và benchmark với chuẩn vàng của chính nó.
+ Việc thêm bước không nhất thiết cải thiện kết quả, và có thể làm tăng chi phí tính toán; đây là chủ đề của một bài sau.
:::

## Tài liệu tham khảo

1. **hap.py** — công cụ được dùng ở đây để benchmark biến thể đọc ngắn germline: https://github.com/Illumina/hap.py
2. **Genome in a Bottle (GIAB)** — bộ dữ liệu tham chiếu chuẩn vàng của NIST: https://www.nist.gov/programs-projects/genome-bottle
3. **Bài công bố nf-core/sarek** — bản hiện thực tham chiếu và độ chính xác được báo cáo: https://academic.oup.com/nargab/article/doi/10.1093/nargab/lqae031/7658070
4. **File benchmark GIAB HG002 (NISTv4.2.1, GRCh38)**: https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/
5. **nf-germline-short-read-variant-calling** — repository dùng trong bài này: https://github.com/nttg8100/nf-germline-short-read-variant-calling
- Ảnh bìa: [Laboratory reactives for Sanger sequencing](https://commons.wikimedia.org/wiki/File:Laboratory_reactives_for_Sanger_sequencing.jpg) — LuisCG11, Wikimedia Commons, CC BY-SA 4.0
