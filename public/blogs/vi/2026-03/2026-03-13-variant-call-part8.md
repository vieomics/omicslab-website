---
slug: gatk-variant-calling-production-slurm-optimization-part8
title: "Gọi biến thể (Phần 8): Gọi biến thể cấu trúc — một benchmark với short read"
description: "Benchmark Manta, công cụ gọi biến thể cấu trúc tích hợp trong nf-core/sarek, trên bộ truth set biến thể cấu trúc GIAB HG002 với Truvari, và lý do gọi SV từ short read vẫn còn khó."
series: Variant Calling from Bash to Production
seriesOrder: 8
authors: [vieomics]
tags: [nextflow, variant-calling, structural-variants, manta, truvari, benchmarking]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part8.png
---

Biến thể cấu trúc (structural variant, SV) — mất đoạn, thêm đoạn, nhân đoạn, đảo đoạn và chuyển đoạn — là những biến đổi hệ gen quy mô lớn (thường ≥50 bp), đóng vai trò quan trọng trong bệnh học nhưng khó phát hiện hơn SNP hay indel nhỏ. Trong bài này, chúng tôi benchmark **Manta**, công cụ gọi SV tích hợp trong nf-core/sarek, trên bộ truth set GIAB HG002 với **Truvari**, và xem xét lý do gọi SV từ short read vẫn là một bài toán khó.

<!--truncate-->

:::tip
+ Môi trường và script được đăng tại [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
+ Clone repository với tag **0.6.0** để tái lập nội dung bài viết này
:::

## Tổng quan chuỗi bài

- **[Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: Pipeline germline bằng bash quản lý với Pixi
- **[Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Kiểm chứng workflow bash
- **[Phần 3](/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: Từ bash sang Nextflow
- **[Phần 4](/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Chạy trong container và tái lập kết quả
- **[Phần 5](/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmark gọi biến thể germline với nf-core/sarek
- **[Phần 6](/blogs/gatk-variant-calling-production-slurm-optimization-part6)**: Có cần một pipeline phức tạp để gọi biến thể chất lượng cao?
- **[Phần 7](/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Chú giải biến thể với SnpEff và Ensembl VEP
- **Phần 8 (bài này)**: Gọi biến thể cấu trúc — một benchmark với short read
- **[Phần 9](/blogs/storage-cost-optimization-cram-format)**: Tối ưu chi phí lưu trữ với định dạng CRAM
- **[Phần 10](/blogs/structural-variant-calling-short-reads-challenges)**: Những thách thức khi gọi biến thể cấu trúc với short read
- **[Phần 11](/blogs/gvcf-population-scale-genotyping)**: Genotyping quy mô quần thể với gVCF

Clone repository:
```bash
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.6.0
cd nf-germline-short-read-variant-calling
cd benchmark
```

## 1. Hệ gen tham chiếu và truth set

Trước khi chạy benchmark, tải tất cả file tham chiếu cần thiết bằng script tại `benchmark/references/download.sh`:

```bash
# Download GATK reference genomes (GRCh38 and GRCh37/hg19)
aws s3 cp --recursive --no-sign-request \
    s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Sequence/WholeGenomeFasta/ .
aws s3 cp --recursive --no-sign-request \
    s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh37/Sequence/WholeGenomeFasta/ .

# Download GIAB HG002 SNP/INDEL truth set (GRCh38, NISTv4.2.1)
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/HG002_GRCh38_1_22_v4.2.1_benchmark.vcf.gz
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/HG002_GRCh38_1_22_v4.2.1_benchmark.vcf.gz.tbi
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NISTv4.2.1/GRCh38/HG002_GRCh38_1_22_v4.2.1_benchmark_noinconsistent.bed

# Download GIAB HG002 SV truth set (hg19, NIST_SV_v0.6)
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NIST_SV_v0.6/HG002_SVs_Tier1_v0.6.vcf.gz
wget https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/AshkenazimTrio/HG002_NA24385_son/NIST_SV_v0.6/HG002_SVs_Tier1_v0.6.bed

# Download liftover chain file (hg38 → hg19) for coordinate conversion
wget https://hgdownload.cse.ucsc.edu/goldenpath/hg38/liftOver/hg38ToHg19.over.chain.gz
```

:::info
**Vì sao cần hai hệ gen tham chiếu?**
+ Hệ gen **GRCh38** được nf-core/sarek dùng để align và gọi SV
+ Hệ gen **GRCh37/hg19** (`human_g1k_v37_decoy.fasta`) là cần thiết vì truth set SV của GIAB (v0.6) được định nghĩa theo tọa độ hg19 — cần liftover để so sánh hai bên
+ Truth set SNP/INDEL ở GRCh38, nên không cần liftover cho benchmark biến thể nhỏ
:::

## 2. Bối cảnh: Vì sao gọi SV từ short read lại khó

Giải trình tự short read (Illumina, read ~150 bp) đạt hiệu quả tốt cho phát hiện SNP và indel nhỏ, nhưng còn hạn chế với SV:

| Thách thức                | Mô tả                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| Độ dài read so với cỡ SV  | SV trải từ 50 bp đến hàng megabase — lớn hơn nhiều so với một read                            |
| Vùng lặp lại              | Nhiều SV xảy ra ở segmental duplication hoặc vùng độ phức tạp thấp, gây mơ hồ mapping         |
| Breakpoint không chính xác| Short read không bao phủ được SV lớn, nên breakpoint phải suy ra chứ không quan sát trực tiếp |
| Tín hiệu split-read yếu   | Chỉ một phần read tại breakpoint là split, hạn chế độ sâu bằng chứng                          |
| Artifact liftover         | Benchmark cần chuyển đổi tọa độ giữa các assembly, gây thêm nhiễu                             |

Manta xử lý những thách thức này bằng cách kết hợp tín hiệu **split-read** và **paired-end discordant read** để phát hiện SV. Ngay cả với bộ dữ liệu WGS 30X như HG002, gọi SV từ short read vẫn còn hạn chế so với cách tiếp cận long read.

## 3. Chạy Manta qua nf-core/sarek

Manta được chạy trong pipeline nf-core/sarek (v3.7.1) trên bộ dữ liệu HG002 WGS 30X đã align với GRCh38.

```bash
nextflow run nf-core/sarek -r 3.7.1 -profile docker,test_full_germline \
    -c customized_labels.config \
    --input ./input.csv \
    --outdir bwamem \
    --tools "deepvariant,freebayes,strelka,manta,haplotypecaller" \
    --aligner "bwa-mem" \
    -resume
```

File VCF đầu ra của Manta (`HG002.manta.diploid_sv.vcf.gz`) chứa các SV lưỡng bội gồm các loại DEL, INS, INV, DUP và BND (breakend).

## 4. Phương pháp benchmark

### 4.1 Truth set

Benchmark dùng **truth set biến thể cấu trúc GIAB HG002 Tier 1 (v0.6)**:
- Truth VCF: `HG002_SVs_Tier1_v0.6.vcf.gz`
- BED vùng tin cậy: `HG002_SVs_Tier1_v0.6.bed`
- Tham chiếu: `human_g1k_v37_decoy.fasta` (hg19/GRCh37)

Truth set được định nghĩa theo tọa độ hg19, trong khi sarek xuất VCF theo GRCh38. Cần một bước liftover trước khi benchmark.

### 4.2 Pipeline benchmark

Toàn bộ workflow benchmark được triển khai trong `benchmark/benchmark_sv_sarek.sh` và gồm bốn bước:

```bash
cd benchmark
pixi run --environment svbench bash benchmark_sv_sarek.sh
```

**Bước 1 — Chuẩn hóa VCF query** (tách multi-allelic, left-align indel):
```bash
bcftools norm -m -any \
    -o HG002_manta_hg38_normalized.vcf \
    pipelines/sarek/variant_calling/manta/HG002/HG002.manta.diploid_sv.vcf.gz
```

**Bước 2 — Liftover từ hg38 sang hg19** bằng CrossMap:
```bash
CrossMap vcf \
    references/hg38ToHg19.over.chain.gz \
    HG002_manta_hg38_normalized.vcf \
    references/human_g1k_v37_decoy.fasta \
    HG002_manta_hg19_raw.vcf
```

:::info
Trong quá trình liftover, **3.945 bản ghi** không thể map sang hg19 và được ghi vào file `.unmap`. Những bản ghi này bị loại khỏi benchmark phía sau.
:::

**Bước 3 — Bỏ tiền tố chr, sắp xếp và tạo index** (để khớp cách đặt tên của truth set):
```bash
sed -e 's/chr//g' HG002_manta_hg19_raw.vcf > HG002_manta_hg19_nochr.vcf
bcftools sort -o HG002_manta_hg19.vcf HG002_manta_hg19_nochr.vcf
bgzip -f HG002_manta_hg19.vcf
tabix -p vcf HG002_manta_hg19.vcf.gz
```

**Bước 4 — Chạy Truvari** với tham số benchmark SV mặc định:
```bash
truvari bench \
    -b references/HG002_SVs_Tier1_v0.6.vcf.gz \
    -c results/sarek/sv/manta/HG002_manta_hg19.vcf.gz \
    -o results/sarek/sv/manta/HG002_manta.truvari \
    -f references/human_g1k_v37_decoy.fasta \
    --includebed references/HG002_SVs_Tier1_v0.6.bed
```

Các tham số Truvari chính được dùng (từ `params.json`):

| Tham số    | Giá trị | Mô tả                                          |
| ---------- | ------- | ---------------------------------------------- |
| `refdist`  | 500     | Khoảng cách vị trí tham chiếu tối đa khi khớp  |
| `pctseq`   | 0.7     | Tương đồng trình tự tối thiểu khi khớp (70%)   |
| `pctsize`  | 0.7     | Tương đồng kích thước tối thiểu khi khớp (70%) |
| `sizemin`  | 50      | Kích thước SV tối thiểu để benchmark           |
| `sizemax`  | 50000   | Kích thước SV tối đa để benchmark              |
| `passonly` | false   | Gồm mọi biến thể (không chỉ PASS)              |
| `pick`     | single  | Chọn một khớp tốt nhất cho mỗi biến thể        |

## 5. Kết quả benchmark

### 5.1 Hiệu năng tổng thể

Kết quả Truvari từ `HG002_manta.truvari/summary.json`:

| Chỉ số                      | Giá trị             |
| --------------------------- | ------------------- |
| TP (True Positives)         | 1.082               |
| FP (False Positives)        | 1.858               |
| FN (False Negatives)        | 12.650              |
| Tổng SV trong truth (base cnt)  | 13.732          |
| Tổng SV được gọi (comp cnt) | 2.940               |
| **Precision**               | **0,3680 (36,8%)**  |
| **Recall**                  | **0,0788 (7,88%)**  |
| **F1 Score**                | **0,1298 (12,98%)** |
| Độ tương đồng kiểu gen      | 0,9039 (90,39%)     |

### 5.2 Phân tích kiểu gen

Trong 1.082 true positive được khớp, độ tương đồng kiểu gen là 90,4%. Ma trận nhầm lẫn kiểu gen:

| Truth GT  | Called GT | Số lượng |
| --------- | --------- | ----- |
| 0/1 (het) | 0/1 (het) | 344   |
| 0/1 (het) | 1/1 (hom) | 63    |
| 1/1 (hom) | 1/1 (hom) | 634   |
| 1/1 (hom) | 0/1 (het) | 29    |
| None/None | 1/1 (hom) | 6     |
| None/None | 0/1 (het) | 4     |
| 0/0       | 0/1 (het) | 1     |
| 0/0       | 1/1 (hom) | 1     |

Nguồn sai số kiểu gen chính là **nhầm lẫn het/hom** (92 trường hợp), điều dễ hiểu với gọi SV từ short read, khi các SV đồng hợp và dị hợp trong vùng lặp lại dễ bị nhầm.

### 5.3 Khoảng cách độ phủ: gọi được so với truth

Kết quả đáng chú ý nhất là **khoảng cách độ phủ**:

```
Truth SVs:   13,732
Called SVs:   2,940  (only 21.4% of truth SVs are even called)
True Positives: 1,082 (only 7.88% of truth SVs are recovered)
```

Manta chỉ gọi tổng cộng ~2.940 SV, trong khi truth set GIAB chứa 13.732 SV độ tin cậy cao trong các vùng Tier 1. Đây chủ yếu không phải vấn đề precision (36,8% số gọi là đúng) mà là vấn đề **độ nhạy (sensitivity)**: phần lớn SV thực không được phát hiện từ short read trong thiết lập này.

## 6. Vì sao recall lại thấp?

Recall thấp (7,88%) phản ánh các hạn chế cố hữu của phát hiện SV từ short read:

1. **Không phát hiện được đoạn thêm (insertion)**: Short read không thể bao phủ đoạn thêm lớn hơn độ dài read. Phần lớn insertion trong truth set GIAB (đặc biệt là mobile element insertion) rất khó thấy bằng read Illumina.

2. **Mất mát do liftover**: 3.945 bản ghi (~57% số gọi thô của Manta) không qua được liftover từ hg38 sang hg19, càng làm giảm tập biến thể có thể đánh giá.

3. **Vùng lặp lại "mù"**: Nhiều SV Tier 1 của GIAB nằm trong segmental duplication, nơi short read không thể map duy nhất.

4. **Phân bố kích thước SV không khớp**: Manta nhạy nhất với mất đoạn và các tái sắp xếp lớn, nhưng truth set chứa nhiều insertion nhỏ (50–200 bp), nơi tín hiệu short read yếu nhất.

## Tóm tắt

:::info
- **Gọi SV từ short read với Manta đạt recall ~7,9%** trên truth set GIAB HG002 trong benchmark này — một hồ sơ hiệu năng khác hẳn gọi SNP/INDEL (>99% F1).
- **Precision (36,8%) ở mức trung bình** so với độ khó, nhưng phần lớn các gọi không thể kiểm chứng được với truth set.
- **Độ tương đồng kiểu gen (90,4%)** cao với những biến thể được gọi đúng, gợi ý chất lượng tín hiệu tốt khi SV được phát hiện.
- **Nút thắt chính là độ nhạy**, không phải precision — phần lớn SV thực không thể phát hiện chỉ từ short read trong thí nghiệm này.
- Để phát hiện SV đạt mức lâm sàng, thường cần **giải trình tự long read (PacBio HiFi, Oxford Nanopore)**, hoặc kết hợp công cụ gọi SV từ short read với công nghệ optical mapping.
:::

## Tài liệu tham khảo

1. **Công cụ gọi SV Manta**
   Chen X et al. (2016). Manta: rapid detection of structural variants and indels for germline and cancer sequencing applications. *Bioinformatics*. https://github.com/Illumina/manta

2. **Truvari: công cụ benchmark SV**
   https://github.com/ACEnglish/truvari

3. **Truth set biến thể cấu trúc GIAB HG002 (v0.6)**
   https://www.nist.gov/programs-projects/genome-bottle

4. **CrossMap: chuyển đổi tọa độ hệ gen**
   http://crossmap.sourceforge.net/

5. **Pipeline nf-core/sarek**
   https://nf-co.re/sarek

6. **bcftools: chuẩn hóa và thao tác VCF**
   http://samtools.github.io/bcftools/
