---
slug: gatk-variant-calling-production-slurm-optimization-part7
title: "Gọi biến thể (Phần 7): Chú giải biến thể với SnpEff và Ensembl VEP"
description: "Proof of concept cho nghiên cứu về chú giải biến thể: chuẩn hóa bằng bcftools, dự đoán hậu quả chức năng bằng SnpEff và Ensembl VEP, và đọc các trường hậu quả ANN và CSQ."
series: Variant Calling from Bash to Production
seriesOrder: 7
authors: [vieomics]
tags: [variant-calling, nextflow]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part7.png
---

Sau khi gọi biến thể với độ chính xác đã báo cáo ở phần benchmark trước, bước tiếp theo là chú giải biến thể — tìm hiểu mỗi biến thể cho biết điều gì về mẫu. Các phương pháp chú giải có thể chia thành hai nhóm lớn: (1) dùng công cụ tính toán để dự đoán hậu quả chức năng của biến thể, và (2) đối chiếu với các cơ sở dữ liệu về hậu quả biến thể đã biết. Bài này mô tả một proof of concept cho mục đích nghiên cứu, kết hợp cả hai hướng trong pipeline.

<!--truncate-->
:::tip
+ Môi trường và script được đăng tại [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
+ Clone repository với tag 0.5.1 để tái lập nội dung bài viết này
:::

:::warning
Workflow này chỉ dành cho mục đích nghiên cứu. Ứng dụng lâm sàng sẽ cần xem xét kỹ hơn cấu hình của từng công cụ và sử dụng các cơ sở dữ liệu đã được tuyển chọn.
:::

## Tổng quan chuỗi bài

- **[Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: Pipeline germline bằng bash quản lý với Pixi
- **[Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Kiểm chứng workflow bash
- **[Phần 3](/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: Từ bash sang Nextflow
- **[Phần 4](/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Chạy trong container và tái lập kết quả
- **[Phần 5](/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmark gọi biến thể germline với nf-core/sarek
- **[Phần 6](/blogs/gatk-variant-calling-production-slurm-optimization-part6)**: Có cần một pipeline phức tạp để gọi biến thể chất lượng cao?
- **Phần 7 (bài này)**: Chú giải biến thể với SnpEff và Ensembl VEP
- **[Phần 8](/blogs/gatk-variant-calling-production-slurm-optimization-part8)**: Gọi biến thể cấu trúc — một benchmark với short read
- **[Phần 9](/blogs/storage-cost-optimization-cram-format)**: Tối ưu chi phí lưu trữ với định dạng CRAM
- **[Phần 10](/blogs/structural-variant-calling-short-reads-challenges)**: Những thách thức khi gọi biến thể cấu trúc với short read
- **[Phần 11](/blogs/gvcf-population-scale-genotyping)**: Genotyping quy mô quần thể với gVCF

## 1. Chuẩn bị dữ liệu và file tham chiếu cho chú giải

### 1.1: Chuẩn bị dữ liệu test
:::tip
+ Khi phát triển workflow, hãy tạo bộ dữ liệu test sinh ra kết quả có ý nghĩa
+ Một workflow có thể chạy thành công nhưng không sinh ra biến thể nào trong file VCF, khiến việc kiểm chứng toàn bộ chức năng của pipeline trở nên khó khăn
+ Dùng các file subset nhỏ hơn 50MB để có thể push lên GitHub
:::

Một phiên bản trước đây chuyển thể dữ liệu test từ nf-core/sarek; tuy nhiên, dữ liệu đó không sinh ra biến thể nào và chỉ hữu ích để kiểm chứng logic của pipeline. Bộ dữ liệu HG002 độ phủ 30X đã dùng cho benchmark được sử dụng lại. Để tạo subset cho việc test, script dưới đây được dùng và đặt trong thư mục `assets`:

```bash
# raw fastq
samtools view -b HG002_merged.bam chr22:17000000-20000000 > subset.bam
samtools sort -n -o subset_name.bam subset.bam
samtools fastq \
  -1 HG002_subset_R1.fastq.gz \
  -2 HG002_subset_R2.fastq.gz \
  -0 /dev/null \
  -s /dev/null \
  -n subset_name.bam

# subset genome
# download only chr22
aws s3 ls --no-sign-request s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/Chromosomes/chr22.fasta .
# index
samtools faidx chr22.fasta
# get fasta dict
picard CreateSequenceDictionary \
    R=chr22.fasta \
    O=chr22.dict
```

### 1.2 Cấu hình genome

Các file FASTA cần thiết đã được cập nhật trong thư mục `assets`. Cấu hình cache cho SnpEff và VEP được thiết lập như dưới đây.
:::info
+ Genome `sarek_test` được đổi tên thành `test` và thay bằng cấu hình hệ gen người chr22
:::

```groovy
params {
    genomes = [
        'test': [
            fasta: 'assets/genome/chr22.fasta',
            fasta_fai: 'assets/genome/chr22.fasta.fai',
            dict: 'assets/genome/chr22.dict',
            index_bwa2_reference: true,
            bwa2_index: 'null',
            dbsnp: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz',
            dbsnp_tbi: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz.tbi',
            known_indels: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz',
            known_indels_tbi: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz.tbi',
            snpeff_cache: "s3://annotation-cache/snpeff_cache/GRCh38.99",
            vep_cache_version : '115',
            vep_genome : 'GRCh38',
            vep_species : 'homo_sapiens',
            vep_cache: "s3://annotation-cache/vep_cache/115_GRCh38/homo_sapiens/115_GRCh38/22"
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
            known_indels_beta_tbi: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/beta/Homo_sapiens_assembly38.known_indels.vcf.gz.tbi",
            snpeff_cache: "s3://annotation-cache/snpeff_cache/GRCh38.99",
            vep_cache_version : '115',
            vep_genome : 'GRCh38',
            vep_species : 'homo_sapiens',
            vep_cache: "s3://annotation-cache/vep_cache/115_GRCh38"
        ]
    ]
}
```

Ngoại trừ tham số `vep_cache` trỏ đến một bucket S3 công khai, các tham số VEP còn lại là những giá trị mà công cụ chú giải dùng ở bước sau. Với chú giải VEP, thư mục cache phải được tổ chức với các thư mục con theo phiên bản cache và genome. Có thể liệt kê các thư mục con hiện có như dưới đây:
```bash
# list files in this folder (S3 prefix)
aws s3 ls --no-sign-request s3://annotation-cache/vep_cache/115_GRCh38/homo_sapiens/115_GRCh38
# PRE 115_GRCh38/
```
:::tip
+ Thay vì tải toàn bộ cơ sở dữ liệu, chỉ định riêng chr22 là đủ cho việc test (~300MB)
+ Module bao gồm logic bash script để xử lý yêu cầu về cấu trúc thư mục con
+ **Truy cập bucket cache**: Các bucket S3 công khai có thể truy cập bằng cờ `--no-sign-request` (không cần thông tin xác thực)
+ **Chế độ cơ sở dữ liệu**: VEP hỗ trợ hai chế độ:
  - **Cache mode** (mặc định): Các file cache tải sẵn cục bộ cho chú giải nhanh hơn mà không cần internet, phù hợp với pipeline offline
  - **SQL mode** (`--database`): Cần kết nối cơ sở dữ liệu trực tiếp (chậm hơn nhưng luôn cập nhật), hữu ích cho các job chạy một lần khi chi phí tải cache không tương xứng
+ Cả hai chế độ có thể kết hợp với `--pick_allele_gene` để chọn một transcript duy nhất cho mỗi biến thể (thường liên quan hơn cho diễn giải lâm sàng)
:::

### 2. Module và subworkflow
#### 2.1 Chuẩn hóa biến thể bằng Bcftools
Biến thể đã gọi cần được chuẩn hóa để xử lý các vấn đề thường gặp:
| Vấn đề                            | Ví dụ                                | Ảnh hưởng đến chú giải                                  |
| --------------------------------- | ------------------------------------ | ------------------------------------------------------ |
| Chưa left-align                   | chr1:1001 AT>A                       | Tọa độ HGVS có thể không chính xác                     |
| Biểu diễn allele không tối giản   | chr1:2001 TTA>TA                     | Công cụ chú giải có thể hiểu biến thể khác đi          |
| Vị trí đa allele                  | chr1:3000 A>C,G                      | Chú giải có thể trộn hậu quả giữa các allele           |
| Không khớp cơ sở dữ liệu          | Cùng biến thể biểu diễn khác nhau    | Tra cứu dbSNP hoặc gnomAD có thể thất bại              |

Module `BCFTOOLS_NORM` mới:
```groovy
process BCFTOOLS_NORM {
    tag "$meta.id"
    label 'process_medium'
    container 'community.wave.seqera.io/library/bcftools:1.21--4335bec1d7b44d11' // v1.21 (wave.seqera.io pre-built)

    input:
    tuple val(meta), path(vcf), path(tbi)
    path(fasta)

    output:
    tuple val(meta), path("${meta.id}.vcf.gz"), emit: vcf
    tuple val(meta), path("${meta.id}.vcf.gz.tbi"), emit: tbi
    path "versions.yml"               , emit: versions

    script:
    """
    bcftools norm \\
        --fasta-ref ${fasta} \\
        --output ${meta.id}.vcf.gz \\
        --output-type z \\
        --threads $task.cpus \\
        ${vcf}
    tabix -p vcf ${meta.id}.vcf.gz
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        bcftools: \$(bcftools --version 2>&1 | head -n1 | sed 's/^.*bcftools //; s/ .*\$//')
    END_VERSIONS
    """
}
```

#### 2.2 SnpEff
SnpEff kết hợp thông tin gene và transcript tham chiếu để dự đoán hậu quả chức năng của biến thể. Công cụ hỗ trợ nhiều cơ sở dữ liệu; ở đây cơ sở dữ liệu Ensembl được dùng:
```groovy
process SNPEFF {
    tag "${meta.id}"
    label 'process_medium'
    container 'quay.io/biocontainers/snpeff:5.4.0c--hdfd78af_0'

    input:
    tuple val(meta),  path(vcf), path(vcf_tbi)
    path(cache)

    output:
    tuple val(meta), path("*.ann.vcf"),     emit: vcf
    tuple val(meta), path("*.csv"),         emit: report
    tuple val(meta), path("*.html"),        emit: summary_html
    tuple val(meta), path("*.genes.txt"),   emit: genes_txt
    path "versions.yml",                    emit: versions

    when:
    task.ext.when == null || task.ext.when

    script:
    def avail_mem = 6144
    if (!task.memory) {
        log.info('[snpEff] Available memory not known - defaulting to 6GB. Specify process memory requirements to change this.')
    }
    else {
        avail_mem = (task.memory.mega * 0.8).intValue()
    }
    def prefix = task.ext.prefix ?: "${meta.id}"
    """
    snpEff \\
        -Xmx${avail_mem}M \\
        ${cache} \\
        -nodownload -canon -v \\
        -csvStats ${prefix}.csv \\
        -dataDir \${PWD}/${cache} \\
        ${vcf} \\
        > ${prefix}.ann.vcf

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        snpeff: \$(snpEff -version 2>&1 | grep -oP 'version [0-9.]+' | sed 's/version //' || echo "5.1")
    END_VERSIONS
    """
}
```

#### 2.3 VEP
Như đã nói ở trên, thư mục cache VEP phải được tổ chức với các thư mục con theo phiên bản cache và genome. Việc này có thể làm theo ba bước:
+ Tạo một thư mục cache tạm với cấu trúc phiên bản cache và genome
+ Tìm file `all_vars.gz` trong đường dẫn cache đầu vào và sao chép các thư mục con của nó vào thư mục cache tạm
+ Dùng thư mục cache tạm này cho tham số dòng lệnh của VEP

```groovy
process VEP {
    tag "${meta.id}"
    label 'process_medium'
    container 'community.wave.seqera.io/library/ensembl-vep_perl-math-cdf:1e13f65f931a6954'

    input:
    tuple val(meta), path(vcf)
    path cache
    val cache_version
    val genome
    val species
    path fasta

    output:
    tuple val(meta), path("*.vcf.gz"), emit: vcf, optional: true
    tuple val(meta), path("*.vcf.gz.tbi"), emit: tbi, optional: true
    tuple val(meta), path("*.tab.gz"), emit: tab, optional: true
    tuple val(meta), path("*.json.gz"), emit: json, optional: true
    tuple val(meta), val("${task.process}"), val('ensemblvep'), path("*.html"), topic: multiqc_files, emit: report, optional: true
    tuple val("${task.process}"), val('ensemblvep'), eval("vep --help | sed -n '/ensembl-vep/s/.*: //p'"), topic: versions, emit: versions_ensemblvep
    path "versions.yml", emit: versions
   
    script:
    def temp_vep_cache = "temp_vep_cache/${species}/${cache_version}_${genome}"
    """
    mkdir -p ${temp_vep_cache}
    cache_dirname=\$(find -L $cache -name all_vars.gz -print -quit | xargs dirname) 
    mv \$cache_dirname ${temp_vep_cache}

    vep \\
        -i ${vcf} \\
        -o ${meta.id}.vcf.gz \\
        --stats_file ${meta.id}.html --vcf --everything --filter_common --per_gene --total_length --offline --format vcf \\
        --compress_output bgzip \\
        --assembly ${genome} \\
        --species ${species} \\
        --cache \\
        --fasta ${fasta} \\
        --cache_version ${cache_version} \\
        --dir_cache \$PWD/temp_vep_cache \\
        --fork ${task.cpus}

    tabix -p vcf  ${meta.id}.vcf.gz

    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        ensembl-vep: \$(vep --version 2>&1 | grep -oP 'ensembl-vep [0-9.]+' | sed 's/ensembl-vep //' || echo "104.3")
    END_VERSIONS
    """
    
}
```

#### 2.4 Subworkflow chú giải mới
Subworkflow được tạo như dưới đây và nhận input từ bước gọi biến thể:
```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl = 2

/*
========================================================================================
    ANNOTATION SUBWORKFLOW
========================================================================================
*/

// Include modules
include { BCFTOOLS_NORM } from '../../../modules/local/bcftools/norm/main'
include { SNPEFF } from '../../../modules/local/snpeff/main'
include { VEP } from '../../../modules/local/vep/main'


workflow VARIANT_ANNOTATION {
    take:
    vcf // channel: [ val(meta), path(vcf) ]
    vcf_tbi // channel: [ val(meta), path(tbi) ]
    snpeff_cache // value 
    vep_cache // value
    vep_cache_version // value
    vep_genome // value
    vep_species // value
    fasta // path to reference fasta


    main:
    ch_versions = channel.empty()
    ch_snpeff_cache_db = channel.fromPath(snpeff_cache, checkIfExists: true).collect()
    ch_vep_cache_db = channel.fromPath(vep_cache, checkIfExists: true).collect()

    BCFTOOLS_NORM(
        vcf.join(vcf_tbi),
        fasta
    )
    ch_versions = ch_versions.mix(BCFTOOLS_NORM.out.versions)

    SNPEFF(
        BCFTOOLS_NORM.out.vcf.join(BCFTOOLS_NORM.out.tbi),
        ch_snpeff_cache_db
    )
    ch_versions = ch_versions.mix(SNPEFF.out.versions)

    VEP(
        SNPEFF.out.vcf,
        ch_vep_cache_db,
        vep_cache_version,
        vep_genome,
        vep_species,
        fasta
    )
    ch_versions = ch_versions.mix(VEP.out.versions)

    emit:
    annotated_vcf = VEP.out.vcf // channel: [ val(meta), path(annotated_vcf), path(annotated_tbi) ]
    versions = ch_versions
}
```

Workflow `main.nf` giờ đây bao gồm bước `VARIANT_ANNOTATION` mới:

```groovy
...
    VARIANT_ANNOTATION(
        VARIANT_CALLING.out.vcf,
        VARIANT_CALLING.out.vcf_tbi,
        params.snpeff_cache,
        params.vep_cache,
        params.vep_cache_version,
        params.vep_genome,
        params.vep_species,
        ref_fasta
    )
...
```
## 3. Chạy workflow đã cập nhật và đánh giá chú giải biến thể
### 3.1 Chạy workflow với test profile
```bash
make test-e2e
```
![rerun_wf](./imgs/annotation_wf.png)

### 3.2 Kiểm chứng chú giải biến thể
#### 3.2.1 Biến thể đã gọi
:::tip
Để xem header VCF với mô tả các cột trong file VCF, dùng: `bcftools view --header-only <vcf file>`
:::
Các biến thể được gọi bởi DeepVariant:
```bash
zcat results/germline_variant_calling:variant_calling:deepvariant/sample1.vcf.gz|tail -n5
```
Ví dụ kết quả:
```bash
chr22   21326676        .       A       G       11.2    PASS    .       GT:GQ:DP:AD:VAF:PL      1/1:11:6:0,6:1:10,19,0
chr22   32146109        .       T       A       0       RefCall .       GT:GQ:DP:AD:VAF:PL      0/0:20:7:0,6:0.857143:0,23,22
chr22   32146116        .       A       T       0.1     RefCall .       GT:GQ:DP:AD:VAF:PL      ./.:16:7:0,7:1:0,20,18
chr22   32146120        .       A       G       0.1     RefCall .       GT:GQ:DP:AD:VAF:PL      ./.:17:7:0,7:1:0,21,19
chr22   32146129        .       T       A       0.1     RefCall .       GT:GQ:DP:AD:VAF:PL      ./.:19:7:0,7:1:0,22,21
```

#### 3.2.2 Chú giải với SnpEff
Lấy 5 dòng cuối:
```bash
tail -n5  results/germline_variant_calling:variant_annotation:snpeff/sample1.ann.vcf
```
Các cột bổ sung hiển thị ký hiệu HGVS và cho biết biến thể nằm ở đâu so với các gene lân cận:
```bash
chr22   21326676        .       A       G       11.2    PASS    ANN=G|intergenic_region|MODIFIER|FAM230H-PPP1R26P5|ENSG00000206142-ENSG00000232771|intergenic_region|ENSG00000206142-ENSG00000232771|||n.21326676A>G||||||      GT:GQ:DP:AD:VAF:PL      1/1:11:6:0,6:1:10,19,0
chr22   32146109        .       T       A       0.0     RefCall ANN=A|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|transcript|ENST00000382097.4|protein_coding||c.*3431A>T|||||2897|,A|downstream_gene_variant|MODIFIER|Z83839.2|ENSG00000239674|transcript|ENST00000436294.1|pseudogene||n.*2837T>A|||||2837|,A|intergenic_region|MODIFIER|Z83839.2-C22orf42|ENSG00000239674-ENSG00000205856|intergenic_region|ENSG00000239674-ENSG00000205856|||n.32146109T>A||||||     GT:GQ:DP:AD:VAF:PL      0/0:20:7:0,6:0.857143:0,23,22
chr22   32146116        .       A       T       0.1     RefCall ANN=T|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|transcript|ENST00000382097.4|protein_coding||c.*3424T>A|||||2890|,T|downstream_gene_variant|MODIFIER|Z83839.2|ENSG00000239674|transcript|ENST00000436294.1|pseudogene||n.*2844A>T|||||2844|,T|intergenic_region|MODIFIER|Z83839.2-C22orf42|ENSG00000239674-ENSG00000205856|intergenic_region|ENSG00000239674-ENSG00000205856|||n.32146116A>T||||||;CSQ=T|downstream_gene_variant|MODIFIER|AP1B1P1|ENSG00000290475|Transcript|ENST00000716525|lncRNA|||||||||||2721|1||SNV|EntrezGene|HGNC:297|YES||||||||||||||||||||||||||||||||||||||||||||||||||||||,T|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|Transcript|ENST00000382097|protein_coding|||||||||||2890|-1||SNV|HGNC|HGNC:27160|YES|MANE_Select|NM_001010859.3||1|P1|CCDS33639.1|ENSP00000371529|Q6IC83.120||UPI00003765B0||||||||||||||||||||||||||||||||||||||||||||||||||||||||  GT:GQ:DP:AD:VAF:PL      ./.:16:7:0,7:1:0,20,18
chr22   32146120        .       A       G       0.1     RefCall ANN=G|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|transcript|ENST00000382097.4|protein_coding||c.*3420T>C|||||2886|,G|downstream_gene_variant|MODIFIER|Z83839.2|ENSG00000239674|transcript|ENST00000436294.1|pseudogene||n.*2848A>G|||||2848|,G|intergenic_region|MODIFIER|Z83839.2-C22orf42|ENSG00000239674-ENSG00000205856|intergenic_region|ENSG00000239674-ENSG00000205856|||n.32146120A>G||||||;CSQ=G|downstream_gene_variant|MODIFIER|AP1B1P1|ENSG00000290475|Transcript|ENST00000716525|lncRNA|||||||||||2725|1||SNV|EntrezGene|HGNC:297|YES||||||||||||||||||||||||||||||||||||||||||||||||||||||,G|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|Transcript|ENST00000382097|protein_coding|||||||||||2886|-1||SNV|HGNC|HGNC:27160|YES|MANE_Select|NM_001010859.3||1|P1|CCDS33639.1|ENSP00000371529|Q6IC83.120||UPI00003765B0||||||||||||||||||||||||||||||||||||||||||||||||||||||||  GT:GQ:DP:AD:VAF:PL      ./.:17:7:0,7:1:0,21,19
chr22   32146129        .       T       A       0.1     RefCall ANN=A|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|transcript|ENST00000382097.4|protein_coding||c.*3411A>T|||||2877|,A|downstream_gene_variant|MODIFIER|Z83839.2|ENSG00000239674|transcript|ENST00000436294.1|pseudogene||n.*2857T>A|||||2857|,A|intergenic_region|MODIFIER|Z83839.2-C22orf42|ENSG00000239674-ENSG00000205856|intergenic_region|ENSG00000239674-ENSG00000205856|||n.32146129T>A||||||;CSQ=A|downstream_gene_variant|MODIFIER|AP1B1P1|ENSG00000290475|Transcript|ENST00000716525|lncRNA|||||||||||2734|1||SNV|EntrezGene|HGNC:297|YES||||||||||||||||||||||||||||||||||||||||||||||||||||||,A|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|Transcript|ENST00000382097|protein_coding|||||||||||2877|-1||SNV|HGNC|HGNC:27160|YES|MANE_Select|NM_001010859.3||1|P1|CCDS33639.1|ENSP00000371529|Q6IC83.120||UPI00003765B0||||||||||||||||||||||||||||||||||||||||||||||||||||||||  GT:GQ:DP:AD:VAF:PL      ./.:19:7:0,7:1:0,22,21
```

#### 3.2.3 Chú giải với VEP
Xem 5 dòng cuối:
```bash
zcat results/germline_variant_calling:variant_annotation:vep/sample1.vcf.gz|tail -n5
```

Kết quả hiển thị các cột chú giải bổ sung ở những dòng đầu (trường CSQ của mỗi bản ghi rất dài và được lược bớt ở đây):
```bash
chr22   21326676        .       A       G       11.2    PASS    ANN=G|intergenic_region|MODIFIER|FAM230H-PPP1R26P5|ENSG00000206142-ENSG00000232771|intergenic_region|ENSG00000206142-ENSG00000232771|||n.21326676A>G||||||;CSQ=G|upstream_gene_variant|MODIFIER|FAM230H|ENSG00000206142|Transcript|ENST00000447720|lncRNA|||||||||||1634|-1||SNV|HGNC|HGNC:53977|YES||||5||||||||||||||||||||||||||||||||||||||||||||||||||,G|upstream_gene_variant|MODIFIER||ENSG00000303017|Transcript|ENST00000791156|lncRNA|||||||||||50|1||SNV|||YES||||||||||||||||||||||||||||||||||||||||||||||||||||||        GT:GQ:DP:AD:VAF:PL     1/1:11:6:0,6:1:10,19,0
chr22   32146109        .       T       A       0.0     RefCall ANN=A|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|transcript|ENST00000382097.4|protein_coding||c.*3431A>T|||||2897|,A|downstream_gene_variant|MODIFIER|Z83839.2|ENSG00000239674|transcript|ENST00000436294.1|pseudogene||n.*2837T>A|||||2837|,A|intergenic_region|MODIFIER|Z83839.2-C22orf42|ENSG00000239674-ENSG00000205856|intergenic_region|ENSG00000239674-ENSG00000205856|||n.32146109T>A||||||;CSQ=A|downstream_gene_variant|MODIFIER|AP1B1P1|ENSG00000290475|Transcript|ENST00000716525|lncRNA|||||||||||2714|1||SNV|EntrezGene|HGNC:297|YES||||||||||||||||||||||||||||||||||||||||||||||||||||||,A|downstream_gene_variant|MODIFIER|C22orf42|ENSG00000205856|Transcript|ENST00000382097|protein_coding|||||||||||2897|-1||SNV|HGNC|HGNC:27160|YES|MANE_Select|NM_001010859.3||1|P1|CCDS33639.1|ENSP00000371529|Q6IC83.120||UPI00003765B0||||||||||||||||||||||||||||||||||||||||||||  GT:GQ:DP:AD:VAF:PL      0/0:20:7:0,6:0.857143:0,23,22
...
```

Chú giải biến thể được tạo bằng cách kết hợp kết quả từ SnpEff (trường ANN) và Ensembl VEP (trường CSQ).
Mỗi chú giải mô tả hậu quả chức năng được dự đoán của biến thể so với các gene và transcript đã biết trong hệ gen tham chiếu GRCh38.
Vì một biến thể có thể chồng lấn với nhiều transcript hoặc gene lân cận, một biến thể có thể có nhiều chú giải.

| Trường               | Giá trị ví dụ           | Nguồn     | Mô tả                                           |
| -------------------- | ----------------------- | --------- | ----------------------------------------------- |
| Allele               | A                       | ANN / CSQ | Allele thay thế đang được chú giải              |
| Consequence          | downstream_gene_variant | ANN / CSQ | Hậu quả dự đoán so với cấu trúc gene            |
| Impact               | MODIFIER                | ANN / CSQ | Nhóm ảnh hưởng (HIGH, MODERATE, LOW, MODIFIER)  |
| Gene symbol          | C22orf42                | ANN / CSQ | Tên gene                                        |
| Gene ID              | ENSG00000205856         | ANN / CSQ | Định danh gene Ensembl                          |
| Feature type         | transcript              | ANN / CSQ | Loại đặc trưng hệ gen                           |
| Transcript ID        | ENST00000382097         | ANN / CSQ | Định danh transcript Ensembl                    |
| Biotype              | protein_coding          | ANN / CSQ | Lớp chức năng của transcript                    |
| Rank                 | -                       | ANN       | Thứ tự exon/intron trong transcript             |
| HGVS.c               | c.*3411A>T              | ANN       | Ký hiệu HGVS trên DNA mã hóa                    |
| Distance             | 2877                    | ANN / CSQ | Khoảng cách đến đặc trưng gene gần nhất (bp)    |
| Variant class        | SNV                     | CSQ       | Loại biến thể (biến thể một nucleotide)         |
| Strand               | -1                      | CSQ       | Hướng mạch của gene                             |
| Gene source          | HGNC                    | CSQ       | Nguồn chuẩn cho tên gene                        |
| HGNC ID              | HGNC:27160              | CSQ       | Định danh gene HGNC                             |
| Canonical transcript | YES                     | CSQ       | Transcript được Ensembl coi là canonical        |
| MANE Select          | MANE_Select             | CSQ       | Transcript RefSeq/Ensembl tương ứng             |
| RefSeq ID            | NM_001010859.3          | CSQ       | Transcript RefSeq tương ứng                     |
| CCDS                 | CCDS33639.1             | CSQ       | Định danh CDS đồng thuận                        |
| Protein ID           | ENSP00000371529         | CSQ       | Định danh protein Ensembl                       |
| UniProt              | Q6IC83                  | CSQ       | Định danh protein trong UniProt                 |
| Population frequency | gnomAD fields           | CSQ       | Tần số allele trong các bộ dữ liệu quần thể     |

## Tóm tắt
:::info
Bài viết này trình bày một proof of concept cho workflow chú giải biến thể dùng SnpEff và Ensembl VEP. Workflow hoạt động được cho mục đích nghiên cứu và khám phá, nhưng triển khai lâm sàng sẽ cần thêm một số yếu tố:

### Ứng dụng lâm sàng & hướng dẫn ACMG/AMP
+ **Phân loại ACMG/AMP**: Biến thể phải được phân loại theo tiêu chuẩn ACMG/AMP (benign, likely benign, uncertain significance, likely pathogenic, pathogenic)
+ **Tổng hợp bằng chứng**: Kết hợp dự đoán tính toán, tần số quần thể và bằng chứng từ tài liệu
+ **Kiểm soát chất lượng**: Triển khai lọc biến thể dựa trên điểm chất lượng, độ sâu và cân bằng allele
+ **Kiểm chứng**: Kiểm chứng độc lập bằng phương pháp trực giao (giải trình tự Sanger, PCR)

### Tích hợp cơ sở dữ liệu
Workflow chú giải có thể được mở rộng để tích hợp thêm các cơ sở dữ liệu lâm sàng:
+ **ClinVar**: Biến thể liên quan lâm sàng với mức bằng chứng và khẳng định
+ **gnomAD/ExAC**: Tần số allele quần thể để lọc biến thể lành tính
+ **COSMIC**: Biến thể somatic liên quan ung thư
+ **dbSNP/rs IDs**: Các polymorphism đã biết
+ **OMIM**: Liên kết gene - kiểu hình
+ **UniProt/Cơ sở dữ liệu protein**: Chú giải chức năng protein
+ **HGMD**: Cơ sở dữ liệu đột biến gene người cho biến thể bệnh di truyền
+ **PharmGKB**: Biến thể dược di truyền học cho dự đoán đáp ứng thuốc

### Cải tiến trong tương lai
+ Triển khai thuật toán phân loại ACMG/AMP tự động
+ Thêm điểm dự đoán chức năng (PolyPhen, SIFT, ConservationScores)
+ Tích hợp phân tích pathway và mạng lưới
+ Triển khai pipeline lọc biến thể cho báo cáo lâm sàng
+ Đồng bộ cơ sở dữ liệu theo thời gian thực để có bằng chứng mới nhất
+ Phát triển khả năng phân tích cohort nhiều mẫu

Nền tảng này có thể được mở rộng thành các workflow genomics lâm sàng toàn diện hơn, trong khi vẫn duy trì khả năng tái lập và kiểm soát phiên bản qua containerization và các thực hành infrastructure-as-code.
:::

## Tài liệu tham khảo
1. SnpEff — https://pcingola.github.io/SnpEff/
2. Ensembl VEP — https://www.ensembl.org/info/docs/tools/vep/index.html
3. Tiêu chuẩn và hướng dẫn ACMG/AMP (Richards et al., 2015) — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4544753/
4. ClinVar — https://www.ncbi.nlm.nih.gov/clinvar/
5. gnomAD — https://gnomad.broadinstitute.org/
6. COSMIC — https://cancer.sanger.ac.uk/cosmic
7. bcftools norm — https://samtools.github.io/bcftools/bcftools.html
- Ảnh bìa: [Bioinformatics workflow systems have built-in functionality that facilitates and simplifies running analysis pipelines](https://commons.wikimedia.org/wiki/File:Bioinformatics_workflow_systems_have_built-in_functionality_that_facilitates_and_simplifies_running_analysis_pipelines.jpg) — Matthew D Young, Sam Behjati, Wikimedia Commons, CC BY 4.0
