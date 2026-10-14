---
slug: gatk-variant-calling-production-slurm-optimization-part4
title: "Gọi biến thể (Phần 4): Kiểm thử và lint workflow Nextflow"
description: "Lint workflow Nextflow để giữ quy ước nhất quán, thêm snapshot của nf-test so sánh hash output giữa các lần chạy, và đưa cả hai kiểm tra vào GitHub Actions thông qua Makefile."
series: Variant Calling from Bash to Production
seriesOrder: 4
authors: [vieomics]
tags: [nextflow, testing, linting, nf-test, ci-cd, workflow]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part4.png
---

Ở [Phần 3](/blogs/gatk-variant-calling-production-slurm-optimization-part3), chúng ta đã có một pipeline chạy được trên cluster. Điều còn thiếu là một cách tự động kiểm tra rằng pipeline vẫn cho ra kết quả như trước. Bài này bàn về lint và kiểm thử: vì sao chúng quan trọng và cách thiết lập.

<!--truncate-->

## Tổng quan chuỗi bài

1. [Phần 1 — workflow bash với môi trường Pixi tái lập được](/blogs/gatk-variant-calling-bash-workflow-pixi-part1).
2. [Phần 2 — chuyển các bước tương tự sang Nextflow và kiểm chứng kết quả](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2).
3. [Phần 3 — triển khai quy mô production](/blogs/gatk-variant-calling-production-slurm-optimization-part3).
4. **Phần 4 (bài này)** — quy tắc lint và snapshot của `nf-test`.
5. [Phần 5 — benchmark](/blogs/gatk-variant-calling-production-slurm-optimization-part5).

## 1. Cài đặt extension và công cụ

Bài hướng dẫn này dùng Visual Studio Code hoặc Code Server, đều là những môi trường phổ biến để phát triển pipeline Nextflow.

### 1.1 Gói extension

Ở thanh bên trái, mở bảng Extensions và tìm kiếm extension.

![search_ext](./imgs/extensions_search.png)

Kiểm tra các extension đã cài:

![installed_ext](./imgs/installed_extension_pack.png)

### 1.2 nf-core và nf-test

Cả hai đều có thể cài bằng Pixi:

```bash
pixi add nf-core nf-test python==3.11
```

## 2. Bắt đầu

### 2.1 Lint

Lint giúp script tự động tuân theo một định dạng đã được thống nhất trước đó. Logic có thể đúng, nhưng thụt lề, quy ước đặt tên và cách tổ chức process nhất quán vẫn quan trọng.

Điều này giữ quy ước code nhất quán trong một nhóm, giúp cộng tác dễ hơn và code dễ đọc hơn. Ví dụ, khi mở một script `main.nf` trong Visual Studio Code, các vi phạm quy tắc lint của nf-core sẽ được tô sáng.

Hãy sửa thủ công cho đến khi các cảnh báo biến mất:

![unlint](./imgs/un_lint_nf.png)

Cũng có thể chuẩn hóa thụt lề bằng lệnh `nextflow`:

```bash
nextflow lint . -format
```

:::info
+ **nf-core/tools** là công cụ Python áp dụng lint chặt chẽ hơn theo quy ước nf-core: https://github.com/nf-core/tools
+ Nó áp một số quy tắc có thể không phù hợp với mọi workflow, ví dụ yêu cầu MultiQC hay một cấu trúc file cụ thể. Có dùng hay không tùy vào trường hợp.
:::

### 2.2 Kiểm thử

Trong phát triển phần mềm, các bài kiểm thử thường được nhóm như sau:

+ **Unit test:** tập trung vào từng thành phần hoặc hàm riêng lẻ, kiểm tra rằng chúng hoạt động như mong đợi khi tách riêng. Loại này phát hiện lỗi sớm và giúp việc refactor an toàn hơn.
+ **End-to-end test:** chạy toàn bộ workflow từ đầu đến cuối, mô phỏng một tình huống thực tế, và xác nhận rằng các phần đã tích hợp hoạt động đúng cùng nhau.
+ **Performance test:** đo cách workflow hành xử trong các điều kiện khác nhau, ví dụ kích thước dữ liệu hay tải hệ thống, để xác nhận rằng nó đáp ứng yêu cầu về tốc độ và tài nguyên.

Áp dụng những chiến lược này cho workflow Nextflow hỗ trợ độ tin cậy, khả năng bảo trì và tính tái lập giữa các môi trường.

Với công việc bioinformatics, nên thiết lập công cụ kiểm thử để có thể kiểm tra tính tái lập giữa các môi trường. Từ góc độ kỹ thuật, chạy bộ dữ liệu test nhỏ cho tính năng mới và chạy toàn bộ dữ liệu trước khi phát hành là một cách cân bằng thực tế. Có thể chạy kiểm thử như sau.

Kiểm thử với bộ dữ liệu nhỏ:

```bash
nextflow run main.nf -profile test,docker
```

Kiểm thử với toàn bộ dữ liệu:

```bash
nextflow run main.nf -profile test,docker
```

Nếu cả hai lần chạy đều thành công, bước tiếp theo là kiểm chứng kết quả: workflow có thể chạy xong mà không lỗi nhưng vẫn cho output không như mong đợi. Chạy cùng một đầu vào hai lần nên cho kết quả giống hệt nhau, và checksum MD5 là cách thuận tiện để xác nhận điều đó. Cách làm giống với [phần kiểm chứng ở Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2).

Kiểm chứng thủ công mọi file output rất tốn công nếu không có công cụ. [nf-test](https://www.nf-test.com/) và [nft-utils](https://github.com/nf-core/nft-utils) tự động hóa việc này.

Để thiết lập nf-test, hãy tạo các file mô tả dưới đây.

#### 2.2.1 Chuẩn bị workflow

Có thể dùng bất kỳ workflow Nextflow nào. Ở đây chúng tôi tiếp tục với repository [nf-germline-short-read-variant-calling](https://github.com/nttg8100/nf-germline-short-read-variant-calling.git):

```bash
git clone https://github.com/nttg8100/nf-germline-short-read-variant-calling.git -b 0.2.0
cd nf-germline-short-read-variant-calling
```

#### 2.2.2 Cấu hình (nf-test.config)

File này cho nf-test biết nơi tìm các test và cấu hình nào sẽ được kết hợp với workflow:

```groovy
config {
    // location for all nf-test tests
    testsDir = "."

    // nf-test directory including temporary files for each test
    workDir = System.getenv("NFT_WORKDIR") ?: ".nf-test"

    // location of an optional nextflow.config file specific for executing tests
    configFile = "tests/nextflow.config"

    // load the necessary plugins
    plugins {
        load "nft-utils@0.0.3"
    }
}
```

#### 2.2.3 Test workflow (default.nf.test)

File này chạy workflow `main.nf`, tức workflow gốc trong repository. Phần chú thích mô tả vai trò của từng đoạn:

```groovy
nextflow_pipeline {

    name "Test pipeline" // name of workflow
    script "../main.nf" // run parent folder workflow
    tag "pipeline"

    test("Test workflow completion") { // name describing what you're testing; you can define multiple tests here

        when {
            params { // define your custom parameters here; I copied these from the test profile
                outdir = "$outputDir" 
                input = "$projectDir/assets/samplesheet.csv"
                genome = 'sarek_test'
            }
        }

        then {
            // stable_name: All files + folders in ${params.outdir}/ with relative paths
            def stable_name = getAllFilesFromDir(params.outdir, relative: true, includeDir: true, ignore: ['pipeline_info/*.{html,json,txt}'])
            // stable_path: All files in ${params.outdir}/ with stable content
            def stable_path = getAllFilesFromDir(params.outdir, ignoreFile: 'tests/.nftignore')
            assertAll(
                { assert workflow.success},
                { assert snapshot(
                    // All stable path names, with relative paths
                    stable_name,
                    // All files with stable contents
                    stable_path
                ).match() }
            )
        }
    }
}
```

#### 2.2.4 File bỏ qua (.nftignore)

Nhiều công cụ ghi ra file có chứa timestamp. Những file này được loại khỏi bước kiểm chứng để có thể so sánh kết quả một cách đáng tin cậy, hoạt động tương tự `.gitignore`:

```bash
pipeline_info/*.{html,json,txt,yml}
germline_variant_calling:preprocessing:fastp/*.{html,fastq.gz,json}
germline_variant_calling:preprocessing:gatk_collectmetrics/*.txt
germline_variant_calling*/*.{bcf,vcf,vcf.gz,vcf.gz.tbi}
```

### 2.3 Chạy test workflow với snapshot

nf-test được chạy tương tự lệnh `nextflow`. Cờ `--verbose` hiển thị log chi tiết, còn `--update-snapshot` tạo cấu trúc thư mục và hash MD5 cho toàn bộ file output:

```bash
nf-test test tests/default.nf.test --verbose --update-snapshot --profile docker
```

![run_test](./imgs/nf-test-snapshot.png)

File snapshot được tạo tự động với tên `default.nf.test.snap`:

```json
{
    "Test workflow completion": {
        "content": [
            [
                "germline_variant_calling:annotation:bcftools_query",
                "germline_variant_calling:annotation:bcftools_query/sample1_variants.bed",
                "germline_variant_calling:annotation:bcftools_query/sample2_variants.bed",
                "germline_variant_calling:annotation:bcftools_query/versions.yml",
                "germline_variant_calling:annotation:bcftools_stats",
                "germline_variant_calling:annotation:bcftools_stats/sample1_indel_count.txt",
                "germline_variant_calling:annotation:bcftools_stats/sample1_snp_count.txt",
                "germline_variant_calling:annotation:bcftools_stats/sample1_variant_stats.txt",
                "germline_variant_calling:annotation:bcftools_stats/sample2_indel_count.txt",
                "germline_variant_calling:annotation:bcftools_stats/sample2_snp_count.txt",
                "germline_variant_calling:annotation:bcftools_stats/sample2_variant_stats.txt",
                "germline_variant_calling:annotation:bcftools_stats/versions.yml",
                "germline_variant_calling:annotation:bedtools_genomecov",
                "germline_variant_calling:annotation:bedtools_genomecov/sample1_coverage.bedgraph",
                "germline_variant_calling:annotation:bedtools_genomecov/sample2_coverage.bedgraph",
                "germline_variant_calling:annotation:bedtools_genomecov/versions.yml",
                "germline_variant_calling:annotation:snpeff",
                "germline_variant_calling:annotation:snpeff/sample1_annotated.vcf",
                "germline_variant_calling:annotation:snpeff/sample1_snpeff.log",
                "germline_variant_calling:annotation:snpeff/sample2_annotated.vcf",
                "germline_variant_calling:annotation:snpeff/sample2_snpeff.log",
                "germline_variant_calling:annotation:snpeff/versions.yml",
                "germline_variant_calling:preprocessing:bwa_mem2",
                "germline_variant_calling:preprocessing:bwa_mem2/sample1_1_aligned.bam",
                "germline_variant_calling:preprocessing:bwa_mem2/sample2_1_aligned.bam",
                "germline_variant_calling:preprocessing:bwa_mem2/versions.yml",
                "germline_variant_calling:preprocessing:bwamem2_index",
                "germline_variant_calling:preprocessing:bwamem2_index/genome.fasta.0123",
                "germline_variant_calling:preprocessing:bwamem2_index/genome.fasta.amb",
                "germline_variant_calling:preprocessing:bwamem2_index/genome.fasta.ann",
                "germline_variant_calling:preprocessing:bwamem2_index/genome.fasta.bwt.2bit.64",
                "germline_variant_calling:preprocessing:bwamem2_index/genome.fasta.pac",
                "germline_variant_calling:preprocessing:bwamem2_index/versions.yml",
                "germline_variant_calling:preprocessing:fastp",
                "germline_variant_calling:preprocessing:fastp/sample1_1_fastp.html",
                "germline_variant_calling:preprocessing:fastp/sample1_1_fastp.json",
                "germline_variant_calling:preprocessing:fastp/sample1_1_trimmed_1.fastq.gz",
                "germline_variant_calling:preprocessing:fastp/sample1_1_trimmed_2.fastq.gz",
                "germline_variant_calling:preprocessing:fastp/sample2_1_fastp.html",
                "germline_variant_calling:preprocessing:fastp/sample2_1_fastp.json",
                "germline_variant_calling:preprocessing:fastp/sample2_1_trimmed_1.fastq.gz",
                "germline_variant_calling:preprocessing:fastp/sample2_1_trimmed_2.fastq.gz",
                "germline_variant_calling:preprocessing:fastp/versions.yml",
                "germline_variant_calling:preprocessing:gatk_collectmetrics",
                "germline_variant_calling:preprocessing:gatk_collectmetrics/sample1_alignment_summary.txt",
                "germline_variant_calling:preprocessing:gatk_collectmetrics/sample2_alignment_summary.txt",
                "germline_variant_calling:preprocessing:gatk_collectmetrics/versions.yml",
                "germline_variant_calling:preprocessing:gatkspark_applybqsr",
                "germline_variant_calling:preprocessing:gatkspark_applybqsr/sample1_recal.bam",
                "germline_variant_calling:preprocessing:gatkspark_applybqsr/sample1_recal.bam.bai",
                "germline_variant_calling:preprocessing:gatkspark_applybqsr/sample2_recal.bam",
                "germline_variant_calling:preprocessing:gatkspark_applybqsr/sample2_recal.bam.bai",
                "germline_variant_calling:preprocessing:gatkspark_applybqsr/versions.yml",
                "germline_variant_calling:preprocessing:gatkspark_baserecalibrator",
                "germline_variant_calling:preprocessing:gatkspark_baserecalibrator/sample1_recal.table",
                "germline_variant_calling:preprocessing:gatkspark_baserecalibrator/sample2_recal.table",
                "germline_variant_calling:preprocessing:gatkspark_baserecalibrator/versions.yml",
                "germline_variant_calling:preprocessing:gatkspark_markduplicates",
                "germline_variant_calling:preprocessing:gatkspark_markduplicates/sample1.bam",
                "germline_variant_calling:preprocessing:gatkspark_markduplicates/sample1.bam.bai",
                "germline_variant_calling:preprocessing:gatkspark_markduplicates/sample2.bam",
                "germline_variant_calling:preprocessing:gatkspark_markduplicates/sample2.bam.bai",
                "germline_variant_calling:preprocessing:gatkspark_markduplicates/versions.yml",
                "germline_variant_calling:preprocessing:samtools_merge",
                "germline_variant_calling:preprocessing:samtools_merge/sample1_merged.bam",
                "germline_variant_calling:preprocessing:samtools_merge/sample1_merged.bam.bai",
                "germline_variant_calling:preprocessing:samtools_merge/sample2_merged.bam",
                "germline_variant_calling:preprocessing:samtools_merge/sample2_merged.bam.bai",
                "germline_variant_calling:preprocessing:samtools_merge/versions.yml",
                "germline_variant_calling:preprocessing:samtools_sort",
                "germline_variant_calling:preprocessing:samtools_sort/sample1_sorted.bam",
                "germline_variant_calling:preprocessing:samtools_sort/sample2_sorted.bam",
                "germline_variant_calling:preprocessing:samtools_sort/versions.yml",
                "germline_variant_calling:variant_calling:gatk_genotypegvcfs",
                "germline_variant_calling:variant_calling:gatk_genotypegvcfs/sample1_raw.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_genotypegvcfs/sample1_raw.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_genotypegvcfs/sample2_raw.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_genotypegvcfs/sample2_raw.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_genotypegvcfs/versions.yml",
                "germline_variant_calling:variant_calling:gatk_haplotypecaller",
                "germline_variant_calling:variant_calling:gatk_haplotypecaller/sample1.g.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_haplotypecaller/sample1.g.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_haplotypecaller/sample2.g.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_haplotypecaller/sample2.g.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_haplotypecaller/versions.yml",
                "germline_variant_calling:variant_calling:gatk_mergevcfs",
                "germline_variant_calling:variant_calling:gatk_mergevcfs/sample1_filtered.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_mergevcfs/sample1_filtered.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_mergevcfs/sample2_filtered.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_mergevcfs/sample2_filtered.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_mergevcfs/versions.yml",
                "germline_variant_calling:variant_calling:gatk_selectvariants_indel",
                "germline_variant_calling:variant_calling:gatk_selectvariants_indel/sample1_raw_indels.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_selectvariants_indel/sample1_raw_indels.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_selectvariants_indel/sample2_raw_indels.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_selectvariants_indel/sample2_raw_indels.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_selectvariants_indel/versions.yml",
                "germline_variant_calling:variant_calling:gatk_selectvariants_snp",
                "germline_variant_calling:variant_calling:gatk_selectvariants_snp/sample1_raw_snps.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_selectvariants_snp/sample1_raw_snps.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_selectvariants_snp/sample2_raw_snps.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_selectvariants_snp/sample2_raw_snps.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_selectvariants_snp/versions.yml",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_indel",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_indel/sample1_filtered_indels.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_indel/sample1_filtered_indels.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_indel/sample2_filtered_indels.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_indel/sample2_filtered_indels.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_indel/versions.yml",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_snp",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_snp/sample1_filtered_snps.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_snp/sample1_filtered_snps.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_snp/sample2_filtered_snps.vcf.gz",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_snp/sample2_filtered_snps.vcf.gz.tbi",
                "germline_variant_calling:variant_calling:gatk_variantfiltration_snp/versions.yml",
                "pipeline_info"
            ],
            [
                "sample1_variants.bed:md5,d41d8cd98f00b204e9800998ecf8427e",
                "sample2_variants.bed:md5,d41d8cd98f00b204e9800998ecf8427e",
                "versions.yml:md5,249943b1d5bd2ce57e04bea4d2dd8abf",
                "sample1_indel_count.txt:md5,897316929176464ebc9ad085f31e7284",
                "sample1_snp_count.txt:md5,897316929176464ebc9ad085f31e7284",
                "sample1_variant_stats.txt:md5,e8e84ea2acff4d7b5548b7ebaf2b05a4",
                "sample2_indel_count.txt:md5,897316929176464ebc9ad085f31e7284",
                "sample2_snp_count.txt:md5,897316929176464ebc9ad085f31e7284",
                "sample2_variant_stats.txt:md5,2301b862009bbf518a5f94f19103b5de",
                "versions.yml:md5,ff6ad194e0ec804b72bc83d8bf8cf019",
                "sample1_coverage.bedgraph:md5,d41d8cd98f00b204e9800998ecf8427e",
                "sample2_coverage.bedgraph:md5,d41d8cd98f00b204e9800998ecf8427e",
                "versions.yml:md5,6d58041eb279541e3a138c60826cefbb",
                "sample1_snpeff.log:md5,7137fc9f7d044314bea421ba06ca0f18",
                "sample2_snpeff.log:md5,7137fc9f7d044314bea421ba06ca0f18",
                "versions.yml:md5,1d4d4e229cfa017c03d08c73b5674b98",
                "sample1_1_aligned.bam:md5,90cf54bb11be1393f24791f2bafb81ba",
                "sample2_1_aligned.bam:md5,ecc75033f0c0c9a88497799323cd12af",
                "versions.yml:md5,f1355436d7ddd31b50858fe62e8adde4",
                "genome.fasta.0123:md5,d73300d44f733bcdb7c988fc3ff3e3e9",
                "genome.fasta.amb:md5,1891c1de381b3a96d4e72f590fde20c1",
                "genome.fasta.ann:md5,2df4aa2d7580639fa0fcdbcad5e2e969",
                "genome.fasta.bwt.2bit.64:md5,cd4bdf496eab05228a50c45ee43c1ed0",
                "genome.fasta.pac:md5,8569fbdb2c98c6fb16dfa73d8eacb070",
                "versions.yml:md5,2a4b9defcea58647c0b5b1cc8b2627f2",
                "versions.yml:md5,6c7466de4bab59e8df203424eb253fd6",
                "versions.yml:md5,5fa3be89c5df1c030acae287599419dd",
                "sample1_recal.bam:md5,92a4e508f76d8dfe7a7149ad8861feb3",
                "sample1_recal.bam.bai:md5,0d76977b2e36046cc176112776c5fa4e",
                "sample2_recal.bam:md5,4a4de50378f16f4ff1345c61c50df2fb",
                "sample2_recal.bam.bai:md5,0d76977b2e36046cc176112776c5fa4e",
                "versions.yml:md5,04197383659004cbbc3bcd59260d5bc0",
                "sample1_recal.table:md5,c38e5c25e24ced2c98c908cf89328ecf",
                "sample2_recal.table:md5,c38e5c25e24ced2c98c908cf89328ecf",
                "versions.yml:md5,c935190eb4847737950a118a8ef8ef53",
                "sample1.bam:md5,92a4e508f76d8dfe7a7149ad8861feb3",
                "sample1.bam.bai:md5,0d76977b2e36046cc176112776c5fa4e",
                "sample2.bam:md5,4a4de50378f16f4ff1345c61c50df2fb",
                "sample2.bam.bai:md5,0d76977b2e36046cc176112776c5fa4e",
                "versions.yml:md5,921b80662856f7496e4d181748b284ab",
                "sample1_merged.bam:md5,663f5532903b2fb669dc39fd58bfd387",
                "sample1_merged.bam.bai:md5,0d76977b2e36046cc176112776c5fa4e",
                "sample2_merged.bam:md5,137440788103c2ce509a89169d8e1a2c",
                "sample2_merged.bam.bai:md5,0d76977b2e36046cc176112776c5fa4e",
                "versions.yml:md5,df0d93935f80356c470858f91ee34f47",
                "sample1_sorted.bam:md5,663f5532903b2fb669dc39fd58bfd387",
                "sample2_sorted.bam:md5,137440788103c2ce509a89169d8e1a2c",
                "versions.yml:md5,f30c0e213665fdb93c19cde77cd1b967",
                "versions.yml:md5,28ef44a18a3310ca11717b590731eadc",
                "versions.yml:md5,1a07831fb1f0ee9f9248c68736c30695",
                "versions.yml:md5,8a62c99aa5d272e89ff0935055091745",
                "versions.yml:md5,d6c0b7ff8e09b3c996ef151bd5eb546a",
                "versions.yml:md5,cbda79c8ab968bd76b73fd7c739dcca3",
                "versions.yml:md5,dc9ae42e4bea47b9da0c0f9a905c0684",
                "versions.yml:md5,d3949b20e639f1016e9745b2a1126960"
            ]
        ],
        "timestamp": "2026-03-04T23:25:53.360079629",
        "meta": {
            "nf-test": "0.9.4",
            "nextflow": "25.10.4"
        }
    }
}
```

### 2.4 Chạy test với snapshot đã có

Sau khi đã tạo snapshot ban đầu, không cần cập nhật lại. Chạy test chỉ để kiểm tra rằng output vẫn khớp với snapshot đã lưu:

```bash
nf-test test tests/default.nf.test --verbose --profile docker
```

### 2.5 Tùy chọn: kiểm thử thủ công

Một workflow có thể chạy thành công nhưng vẫn cho output không có ý nghĩa. Các bài kiểm thử xác nhận nội dung file sẽ giải quyết điều này. Một cách làm là mô phỏng một bộ dữ liệu với các biến thể cụ thể ở những vùng đã biết và tần số allele đã biết, rồi kiểm tra rằng workflow gọi đúng các biến thể đó:

```bash
python validate_germline_variant_calling.py --expect-variant truth.vcf --pipeline-variant query.vcf
```

## 3. GitHub Actions với lint

### 3.1 Makefile

Chúng tôi đã giới thiệu Makefile trong một bài trước. Nó thiết lập môi trường nhất quán cho cả phát triển cục bộ lẫn GitHub Actions. Theo kinh nghiệm của chúng tôi, việc debug các action dựng sẵn của GitHub Actions có thể khó hơn so với chạy cùng các bước đó ở máy cục bộ, nên Makefile được dùng để chạy test nhanh trên máy phát triển, còn các workflow file chỉ gọi lại đúng target đó thay vì lặp lại logic trong YAML.

:::tip
Giới thiệu về CI/CD trong bioinformatics: [Quản lý phiên bản cho bioinformatics tái lập (Phần 2)](/blogs/how-to-version-control-git-bioinformatics-part-2).
:::

Một `Makefile` duy nhất gắn hai target `test` và `lint` lại với nhau:

```bash
.PHONY: test-e2e clean
${HOME}/.pixi/bin/pixi:
	curl -sSL https://pixi.sh/install.sh | sh

test-e2e: ${HOME}/.pixi/bin/pixi
	${HOME}/.pixi/bin/pixi run nextflow run main.nf -profile docker,test -resume

test-e2e-snapshot: ${HOME}/.pixi/bin/pixi
	${HOME}/.pixi/bin/pixi run nf-test test --verbose --profile test,docker

test-e2e-update-snapshot: ${HOME}/.pixi/bin/pixi
	${HOME}/.pixi/bin/pixi run nf-test test tests/default.nf.test --verbose --update-snapshot --profile test,docker

lint: ${HOME}/.pixi/bin/pixi
	${HOME}/.pixi/bin/pixi run nextflow lint . -format 

clean:
	rm -rf work
```

### 3.2 GitHub workflow

Các lần chạy thành công của những workflow này có thể xem trong pull request của dự án https://github.com/nttg8100/nf-germline-short-read-variant-calling/pull/7:

+ Linter: https://github.com/nttg8100/nf-germline-short-read-variant-calling/actions/runs/22679273108
+ Test: https://github.com/nttg8100/nf-germline-short-read-variant-calling/actions/runs/22679273035

#### 3.2.1 Lint

Tạo file `.github/workflows/linting.yaml`. Workflow này checkout repository rồi chạy lệnh lint, để code được định dạng đúng trước khi push lên GitHub. Nó được kích hoạt khi push và khi mở pull request vào nhánh `main`:

```yaml
name: Linting

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  clone:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Running linting
        run: |
          make lint
```

#### 3.2.2 Kiểm thử

Tạo file `.github/workflows/e2e.yml`. Workflow này checkout repository rồi chạy pipeline kèm việc so khớp snapshot output. Nó được kích hoạt khi push và khi mở pull request vào nhánh `main`:

```yaml
name: Testing e2e

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  clone:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Running testing
        run: |
          make test-e2e-snapshot
```

## 4. Tóm tắt

:::tip
Những nguyên tắc kiểm thử và lint này không chỉ áp dụng cho Nextflow mà còn cho code workflow nói chung.
:::

## Tài liệu tham khảo

1. **nf-test** — kiểm thử snapshot cho pipeline Nextflow: https://www.nf-test.com/
2. **nft-utils** — các hàm hỗ trợ dùng trong file test: https://github.com/nf-core/nft-utils
3. **nf-core/tools** — quy tắc lint và scaffolding pipeline: https://github.com/nf-core/tools
4. **Tài liệu Nextflow** — lệnh `lint` và cấu hình: https://www.nextflow.io/docs/latest/cli.html
5. **Tài liệu GitHub Actions**: https://docs.github.com/en/actions
6. **Repository tham chiếu cho bài này**: https://github.com/nttg8100/nf-germline-short-read-variant-calling
