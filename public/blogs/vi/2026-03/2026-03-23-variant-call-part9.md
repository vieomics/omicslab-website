---
slug: storage-cost-optimization-cram-format
title: "Gọi biến thể (Phần 9): Tối ưu chi phí lưu trữ với định dạng CRAM"
description: "Định dạng CRAM nén dựa trên hệ gen tham chiếu giúp giảm dung lượng lưu trữ alignment khoảng 45% so với BAM trên subset chr22, và cách pipeline germline xuất đồng thời BAM và CRAM."
series: Variant Calling from Bash to Production
seriesOrder: 9
authors: [vieomics]
tags: [variant-calling, hpc]
image: ./imgs/storage-cost-optimization-cram-format.png
---

Các dự án giải trình tự toàn hệ gen (WGS) tạo ra lượng dữ liệu lớn. Chi phí phân tích đã đáng kể, nhưng theo thời gian chi phí lưu trữ thường trở thành khoản chi lớn nhất. Thách thức là giữ lại dữ liệu thô và dữ liệu align để có thể phân tích lại bằng công cụ mới, mà không phải trả cho dung lượng lưu trữ vô hạn. Bài này xem xét cách định dạng CRAM hỗ trợ việc đó: trên subset chr22 của chúng tôi, CRAM giảm dung lượng lưu trữ alignment khoảng 45% so với BAM, trong khi vẫn nén lossless và cho phép align lại. Ở phiên bản mới, [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling) hỗ trợ xuất file CRAM để giảm chi phí lưu trữ và thuận tiện phân tích lại.

<!--truncate-->

:::tip

- Môi trường và script được đăng tại [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
- Clone repository với tag **0.7.0** để tái lập nội dung bài viết này
  :::

## Tổng quan chuỗi bài

- **[Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: Pipeline germline bằng bash quản lý với Pixi
- **[Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Kiểm chứng workflow bash
- **[Phần 3](/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: Từ bash sang Nextflow
- **[Phần 4](/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Chạy trong container và tái lập kết quả
- **[Phần 5](/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmark gọi biến thể germline với nf-core/sarek
- **[Phần 6](/blogs/gatk-variant-calling-production-slurm-optimization-part6)**: Có cần một pipeline phức tạp để gọi biến thể chất lượng cao?
- **[Phần 7](/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Chú giải biến thể với SnpEff và Ensembl VEP
- **[Phần 8](/blogs/gatk-variant-calling-production-slurm-optimization-part8)**: Gọi biến thể cấu trúc — một benchmark với short read
- **Phần 9 (bài này)**: Tối ưu chi phí lưu trữ với định dạng CRAM
- **[Phần 10](/blogs/structural-variant-calling-short-reads-challenges)**: Những thách thức khi gọi biến thể cấu trúc với short read
- **[Phần 11](/blogs/gvcf-population-scale-genotyping)**: Genotyping quy mô quần thể với gVCF

Clone repository:

```bash
# clone and run the new workflow version with cram file output support, removing intermediate files
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.7.0
cd nf-germline-short-read-variant-calling
make test-e2e
```

Thư mục đầu ra mới được tổ chức với các file CRAM đặt trong thư mục alignment:

```bash
# the output folder
├── alignment
│   └── sample1
│       ├── sample1_merged.cram
│       └── sample1_merged.cram.crai
```

## 1. Tìm hiểu các định dạng dữ liệu hệ gen

### 1.1. File FASTQ (reads giải trình tự thô)

File FASTQ chứa reads giải trình tự thô kèm điểm chất lượng. Đây là đầu ra ban đầu từ các máy giải trình tự như thiết bị Illumina.

**Đặc điểm:**

- Reads **chưa align** (không có tọa độ hệ gen)
- Định dạng paired-end (file R1 và R2)
- Nén gzip
- Chứa thông tin chất lượng cho từng base
- Thường 30-100 GB mỗi mẫu (với WGS 30X)

**Ví dụ dữ liệu test (subset chr22):**

```
sample1_R1.fastq.gz: 37 MB
sample1_R2.fastq.gz: 37 MB
Total per sample: 74 MB
```

**Ưu điểm:**

- Giữ nguyên dữ liệu thô - có thể align lại bằng bất kỳ công cụ/hệ gen tham chiếu nào
- Không mất mát thông tin
- Độc lập với hệ gen tham chiếu

**Nhược điểm:**

- Kích thước file lớn nhất (reads chưa map được lưu kém hiệu quả)
- Phải align lại cho mọi phân tích
- Cần nhiều dung lượng lưu trữ và băng thông truyền dữ liệu

### 1.2. File BAM (định dạng alignment nhị phân)

File BAM chứa reads đã align kèm tọa độ hệ gen. Đây là đầu ra tiêu chuẩn từ các aligner như BWA-MEM2.

**Nội dung file:**

- Mỗi bản ghi read gồm: tên sequence, điểm chất lượng, thông tin alignment (chromosome, position, chuỗi CIGAR mô tả chi tiết alignment)
- Toàn bộ trình tự read được lưu tường minh trong file
- Tất cả reads được lưu ở dạng nhị phân với nén tiêu chuẩn (deflate)
- Với các read khớp tham chiếu, toàn bộ trình tự vẫn được lưu

**Ví dụ BAM thực tế (định dạng text SAM cho dễ đọc):**

```
HISEQ1:18:H8VC6ADXX:1:2203:4067:21293   163     chr22   11016745        8       148M    =       11017040        443
TTAATGTATTGCTTAAAGGTTTGCTAGCATTTTGTTGAGGATTTTTGCATCAATATTAATTGGAGATATTGTAGTTTTCTTTTTTTAAAGTGTCTTTGATTTTGGTATAAAGGTAATTCTGGTGTTATAGAATGAGTTTGGAAGTATT
CC@FFFFFHHHHHJJJJJJCHIJJJJJJJIJJJJIJIFIJGHJJJJJJIJIJIIIJIJJIIIJBGFHIIJJGHIJJJJIJJJHHFDACDDCCEEDDDDCDDACCDACDDEEDDCDCDEDDDDDDDDDEEDCDDDCDDEDDDDDDCDDE
NM:i:0  MD:Z:148        MC:Z:148M      AS:i:148 XS:i:143        XA:Z:chr22,-17016043,148M,1;    RG:Z:sample1_1
```

**Phân tích read này:**

- **Read ID:** `HISEQ1:18:H8VC6ADXX:1:2203:4067:21293` - định danh duy nhất
- **FLAG:** `163` - paired-end, cặp align đúng
- **Chromosome:** `chr22`
- **Position:** `11016745` - tọa độ hệ gen trên chr22
- **MAPQ:** `8` - chất lượng mapping
- **CIGAR:** `148M` - cả 148 base khớp tham chiếu
- **Sequence:** Toàn bộ trình tự 148 base được lưu (165 ký tự)
- **Quality:** Điểm chất lượng cho từng base (165 ký tự)
- **Tag tùy chọn:** `NM:i:0` (0 mismatch), `MD:Z:148` (148 khớp chính xác), v.v.

**Điểm quan trọng:** Toàn bộ trình tự 148 base được lưu đầy đủ, dù nó khớp tham chiếu hoàn hảo (NM:i:0 = không có mismatch).

**Đặc điểm:**

- Reads **đã align** kèm tọa độ hệ gen
- Định dạng sắp xếp theo tọa độ để truy cập hiệu quả
- Định dạng nhị phân (gọn hơn SAM)
- Có index (file `.bai`) để truy cập ngẫu nhiên
- Tương thích với mọi công cụ bioinformatics

**Ví dụ dữ liệu test (subset chr22):**

Sau khi align bằng BWA-MEM2:

```
sample1_aligned.bam: 74 MB (unsorted, same size as FASTQ)
```

Sau khi sắp xếp theo tọa độ:

```
sample1_sorted.bam: 51 MB (31% reduction from unsorted)
```

**Ưu điểm:**

- Sắp xếp theo tọa độ để truy cập hiệu quả
- Có index để truy cập ngẫu nhiên nhanh
- Tương thích phổ biến với các công cụ
- Hiệu năng I/O nhanh
- Sẵn sàng cho phân tích phía sau mà không cần align lại

**Nhược điểm:**

- Lưu toàn bộ trình tự read (không nén dựa trên tham chiếu)
- Lớn hơn CRAM 45%
- Kém hiệu quả cho lưu trữ dài hạn

### 1.3. File CRAM (định dạng alignment nén dựa trên tham chiếu)

CRAM là định dạng chuẩn GA4GH dùng nén dựa trên hệ gen tham chiếu để giảm mạnh kích thước file mà vẫn giữ thông tin lossless.

**Nội dung file và chiến lược nén:**

Khác với file BAM lưu toàn bộ trình tự read, file CRAM dùng nén dựa trên tham chiếu:

- **Với các base khớp:** Thay vì lưu toàn bộ trình tự, CRAM chỉ lưu khác biệt giữa read và hệ gen tham chiếu (SNP, indel)
- **Tọa độ tham chiếu:** Các read khớp tham chiếu được mã hóa thành tọa độ hệ gen + thông tin khác biệt
- **Điểm chất lượng:** Thông tin chất lượng được giữ lại
- **Read không khớp:** Các read không align hoặc có khác biệt đáng kể được lưu bằng nén DEFLATE tiêu chuẩn

**Cách CRAM nén cùng một read:**

Dùng lại read từ ví dụ BAM (NM:i:0, cả 148 base khớp tham chiếu):

**Lưu trong BAM:**

```
Full sequence (148 bp):
TTAATGTATTGCTTAAAGGTTTGCTAGCATTTTGTTGAGGATTTTTGCATCAATATTAATTGGAGATATTGTAGTTTTCTTTTTTTAAAGTGTCTTTGATTTTGGTATAAAGGTAATTCTGGTGTTATAGAATGAGTTTGGAAGTATT
(165 characters = ~165 bytes)

Quality scores (148 bp):
CC@FFFFFHHHHHJJJJJJCHIJJJJJJJIJJJJIJIFIJGHJJJJJJIJIJIIIJIJJIIIJBGFHIIJJGHIJJJJIJJJHHFDACDDCCEEDDDDCDDACCDACDDEEDDCDCDEDDDDDDDDDEEDCDDDCDDEDDDDDDCDDE
(165 characters = ~165 bytes)

Total per read: ~330+ bytes
```

**Lưu trong CRAM (với cùng read không có mismatch):**

```
Chromosome: chr22
Position: 11016745
CIGAR: 148M (all matched)
Stored information:
  - Reference position (4 bytes)
  - CIGAR string: 148M (2 bytes)
  - Difference array: (empty - all bases match) (0 bytes)
  - Quality scores: (can be compressed or stored at reduced precision) (~50 bytes)

Total per read: ~60 bytes (for exact match reads)
```

**Hiệu quả nén:** giảm ~82% cho riêng read này.

**Vì sao hiệu quả:** Nếu một read 148 base khớp tham chiếu hoàn hảo, CRAM chỉ ghi:

- "Bắt đầu tại vị trí 11016745 trên chr22"
- "148 base tiếp theo khớp tham chiếu"
- "Điểm chất lượng được [giữ lại]"

Thay vì lưu lại cả 148 base.

**Đặc điểm:**

- Định dạng alignment **nén dựa trên tham chiếu**
- Cần hệ gen tham chiếu để mã hóa/giải mã
- Read khớp chỉ lưu tọa độ tham chiếu + khác biệt
- Read không khớp nén bằng DEFLATE
- Có index (file `.crai`) như BAM

**Ví dụ dữ liệu test (subset chr22):**

```
sample1_merged.cram: 28 MB (45% reduction from BAM)
sample1_merged.cram.crai: index file
```

**So sánh mức giảm dung lượng:**

```
FASTQ:  74 MB → CRAM: 28 MB = 62% savings overall
BAM:    51 MB → CRAM: 28 MB = 45% savings vs BAM
```

**Ưu điểm:**

- **Nhỏ hơn BAM 45%** - quan trọng nhất cho việc giảm chi phí
- **Nhỏ hơn FASTQ 62%** - tiết kiệm đáng kể so với dữ liệu thô
- Nén lossless - không mất dữ liệu
- Định dạng chuẩn GA4GH - ngày càng nhiều công cụ hỗ trợ
- Được các công cụ hiện đại hỗ trợ: GATK, DeepVariant, samtools, bcftools
- Cho phép align lại với hệ gen tham chiếu

**Cần lưu ý:**

- Cần hệ gen tham chiếu để giải nén
- Hệ gen tham chiếu phải khớp với lần align gốc

## 2. Phân tích và chiến lược chi phí lưu trữ

### 2.1 Bảng so sánh nhanh

| Loại dữ liệu           | Định dạng | Kích thước | Kích thước tương đối | Mục đích            |
| ---------------------- | -------- | ----- | ------------- | ----------------- |
| **Reads thô**          | FASTQ.GZ | 74 MB | 100%          | Đầu vào ban đầu   |
| **Đã align (chưa sắp xếp)** | BAM  | 74 MB | 100%          | Tạm thời          |
| **Đã align (đã sắp xếp)**   | BAM  | 51 MB | 69%           | Xử lý             |
| **Alignment lưu trữ**  | CRAM     | 28 MB | **38%**       | Lưu trữ dài hạn   |

**Điểm chính:** Trên subset này, CRAM cho sự cân bằng tốt nhất giữa chi phí lưu trữ và chức năng.

### 2.2 Chiến lược lưu trữ trong pipeline

Pipeline nf-germline-short-read-variant-calling triển khai chiến lược đầu ra kép:

```
Alignment Process:
  ├── BWA-MEM2 alignment
  ├── Sorting (samtools sort)
  ├── Marking duplicates (picard)
  ├── Base quality recalibration (GATK)
  │
  └── SAMTOOLS_MERGE produces:
      ├── BAM file → downstream variant calling (fast processing)
      └── CRAM file → archival storage (45% savings)
```

Cách làm này giữ lại cả hai lựa chọn:

- **BAM cho phân tích:** I/O nhanh, tương thích phổ biến, sẵn sàng cho gọi biến thể
- **CRAM cho lưu trữ:** tiết kiệm 45% dung lượng, lossless, hỗ trợ phân tích lại

### 2.3 Mở rộng lên production

Với các dự án WGS độ phủ 30X:

**Chi phí mỗi mẫu (độ phủ 30X):**
| Định dạng | Kích thước | Chi phí lưu trữ hằng năm\* |
|--------|------|---------------------|
| FASTQ | 100 GB | $400 |
| BAM | 50 GB | $200 |
| CRAM | 28 GB | **$112** |

\*Assuming AWS S3 Standard at ~$0.023/GB/month

**Chi phí hằng năm cho cohort 100 mẫu:**
| Định dạng | Tổng kích thước | Chi phí hằng năm | Chi phí mỗi mẫu |
|--------|-----------|-------------|-----------------|
| FASTQ | 10 TB | $40,000 | $400 |
| BAM | 5 TB | $20,000 | $200 |
| CRAM | 2.8 TB | **$11,200** | **$112** |

**Chi phí dự án 5 năm:**

- FASTQ: $200,000
- BAM: $100,000
- **CRAM: $56,000 (tiết kiệm 72% so với FASTQ)**

Các con số này dựa trên giá AWS S3 Standard tại thời điểm viết bài và nên được xem là minh họa, không phải báo giá.

## 3. Triển khai trong pipeline

### 3.1 Process SAMTOOLS_MERGE

Pipeline triển khai đầu ra CRAM trong process `SAMTOOLS_MERGE`:

```groovy
process SAMTOOLS_MERGE {
    // Strategy: Output BOTH BAM (for processing) and CRAM (for storage)
    // This gives best of both worlds:
    //   - BAM continues to downstream processing (fast, compatible)
    //   - CRAM saved for long-term storage (45% space savings)

    input:
    tuple val(meta), path(bams)
    path ref_fasta

    output:
    tuple val(meta), path("*_merged.bam"), emit: bam
    tuple val(meta), path("*_merged.bam.bai"), emit: bai
    tuple val(meta), path("*_merged.cram"), emit: cram      // ← CRAM output
    tuple val(meta), path("*_merged.cram.crai"), emit: crai // ← CRAM index
}
```

### 3.2 Process mã hóa CRAM

Lệnh samtools để chuyển sang CRAM:

```bash
# Convert sorted BAM to CRAM using reference genome
samtools view \
    -@ 8 \
    -T reference/GRCh38.fasta \
    -C \
    -o sample1_merged.cram \
    sample1_merged.bam

# Index the CRAM file for random access
samtools index sample1_merged.cram
```

**Tham số chính:**

- `-T` : File FASTA hệ gen tham chiếu (bắt buộc cho mã hóa CRAM)
- `-C` : Xuất định dạng CRAM
- `-@` : Số luồng để xử lý song song

### 3.3 Truy cập file CRAM

Để xem hoặc xử lý file CRAM, các công cụ hiện đại tự động giải nén:

```bash
# View CRAM file (samtools handles decompression)
samtools view sample1_merged.cram | head

# Extract specific region
samtools view sample1_merged.cram chr22:1000000-2000000

# Run variant calling directly on CRAM
gatk HaplotypeCaller -I sample1_merged.cram -R reference/GRCh38.fasta -O variants.vcf

# Deep Variant also supports CRAM input
deepvariant/run_deepvariant.py \
    --input_file sample1_merged.cram \
    --reference_fasta reference/GRCh38.fasta
```

## 4. Workflow phân tích lại

Một ưu điểm của CRAM: có thể phân tích lại bằng công cụ mới mà không cần giữ file BAM. Cần lưu ý rằng một số công cụ có thể không hỗ trợ CRAM gốc.

### 4.1 Align lại từ CRAM

Để align lại reads (ví dụ với hệ gen tham chiếu hoặc aligner mới hơn):

```bash
# Extract reads from CRAM (automatically decompresses)
samtools view -h -b sample1_merged.cram | samtools bam2fq \
    | bwa mem -t 8 reference/GRCh38_updated.fasta - \
    | samtools sort -O BAM > sample1_new_alignment.bam
```

File CRAM chứa toàn bộ reads gốc kèm điểm chất lượng, cho phép align lại đầy đủ.

### 4.2 Gọi biến thể với công cụ hỗ trợ CRAM gốc

Nhiều công cụ gọi biến thể hiện đại hỗ trợ input CRAM trực tiếp:

```bash
# Using GATK with CRAM
gatk HaplotypeCaller \
    -I sample1_merged.cram \
    -R reference/GRCh38.fasta \
    -O variants_new_caller.vcf

# Using DeepVariant with CRAM
deepvariant/run_deepvariant.py \
    --input_file sample1_merged.cram \
    --reference_fasta reference/GRCh38.fasta
```

### 4.3 Chuyển CRAM sang BAM

:::info

- Các công cụ như phiên bản cũ của Strelka2 hoặc một số công cụ gọi biến thể cấu trúc chuyên biệt có thể không hỗ trợ CRAM. Hãy kiểm tra tài liệu công cụ và chuyển sang BAM nếu cần.
  :::

Nếu một công cụ không hỗ trợ file CRAM, có thể chuyển CRAM trở lại BAM:

```bash
# Convert CRAM to BAM
samtools view -h -b sample1_merged.cram > sample1_converted.bam

# Index the BAM file
samtools index sample1_converted.bam
```

Cách này cho phép lưu trữ alignment dưới dạng CRAM (tiết kiệm 45% dung lượng) và chỉ chuyển sang BAM khi một công cụ cụ thể yêu cầu.

## 5. Thực hành tốt và khuyến nghị

### 5.1 Chiến lược phân tầng lưu trữ

```
Tier 1 (Hot - Frequent Access):
├── BAM files (variant calling in progress)
└── VCF results (active analysis)
   Cost: AWS S3 Standard ($0.023/GB/month)

Tier 2 (Warm - Occasional Access):
├── CRAM files (re-analysis ready)
└── FASTQ files (raw data backup)
   Cost: AWS S3 Intelligent-Tiering (~$0.0125/GB/month average)

Tier 3 (Cold - Archive):
├── Backup CRAM files
└── Project documentation
   Cost: AWS Glacier Deep Archive ($0.00099/GB/month)
```

### 5.2 Checklist cho pipeline production

- Luôn tạo file CRAM để lưu trữ dài hạn
- Giữ file BAM trong giai đoạn phân tích đang hoạt động
- Lưu trữ hệ gen tham chiếu cùng file CRAM (để đảm bảo tính nhất quán)
- Kiểm thử workflow phân tích lại để xác nhận tính toàn vẹn của CRAM
- Ghi lại phiên bản hệ gen tham chiếu trong metadata
- Triển khai chuyển đổi tự động: xóa BAM sau 6 tháng
- Theo dõi khả năng truy cập file CRAM (kiểm thử giải nén định kỳ mỗi quý)

### 5.3 Tương thích công cụ

**Hỗ trợ đầy đủ (đọc CRAM gốc):**

- samtools - hỗ trợ CRAM gốc
- GATK 4.x - hỗ trợ CRAM đầy đủ
- DeepVariant - hỗ trợ input CRAM
- bcftools - tương thích CRAM
- Picard - hỗ trợ CRAM

**Cần chuyển sang BAM:**

- Một số công cụ gọi biến thể cũ (kiểm tra tài liệu)
- Các phiên bản cũ của Strelka2
- Một số công cụ gọi biến thể cấu trúc chuyên biệt

**Cách chuyển đổi cho công cụ không hỗ trợ:**

```bash
# Quick conversion when needed
samtools view -h -b sample1_merged.cram > sample1_temp.bam
samtools index sample1_temp.bam

# Use converted BAM with legacy tools
legacy_tool --input sample1_temp.bam

# Delete temporary BAM after use
rm sample1_temp.bam sample1_temp.bam.bai
```

Như vậy, kho lưu trữ dài hạn chỉ giữ file CRAM, và chỉ chuyển đổi khi một công cụ cụ thể yêu cầu.

## 6. Kết quả benchmark

### 6.1 Hiệu năng thực tế

Dùng pipeline trên subset chr22 của HG002 (Genome in a Bottle):

**Thống kê nén:**

```
Original BAM:        51 MB
CRAM output:         28 MB
Compression ratio:   45% reduction
```

**Chất lượng gọi biến thể (không bị ảnh hưởng):**

- Độ chính xác SNP của DeepVariant: **99,39% recall, 99,82% precision**
- Nén CRAM không ảnh hưởng đến chất lượng biến thể trong thử nghiệm này
- Kết quả giống hệt so với input BAM

### 6.2 Tiết kiệm chi phí trong 5 năm

Dự án: cohort WGS 100 mẫu (độ phủ 30X)

```
Storage Timeline:
Year 1: FASTQ + BAM + CRAM (full raw + processed)    = 16.8 TB
Year 2-5: CRAM only (after analysis complete)        = 2.8 TB

Total 5-year cost:
├── FASTQ retention strategy: $200,000
├── BAM retention strategy:   $100,000
└── CRAM-only strategy:       $56,000 (72% savings)
```

## Tóm tắt

CRAM là một lựa chọn thực tế cho bài toán lưu trữ dữ liệu hệ gen:

1. **Hiệu quả chi phí:** nhỏ hơn BAM 45% trên subset này, cho phép lưu trữ dài hạn bền vững hơn
2. **Lossless:** giữ lại đầy đủ thông tin - không mất dữ liệu
3. **Khả năng truy cập:** các công cụ hiện đại hỗ trợ CRAM cho phân tích
4. **Bền vững về sau:** thiết kế dựa trên tham chiếu hỗ trợ phân tích lại bằng công cụ cập nhật
5. **Tiêu chuẩn:** định dạng chuẩn GA4GH hỗ trợ tính khả dụng dài hạn

Bằng cách triển khai đầu ra kép BAM/CRAM, pipeline vừa giữ được tốc độ gọi biến thể trong giai đoạn phân tích vừa tiết kiệm cho lưu trữ dài hạn. Mức tiết kiệm phụ thuộc vào công cụ, dữ liệu và dịch vụ lưu trữ được dùng, nên cần đo đạc cho từng dự án.

## Tài liệu tham khảo

- [CRAM Format Specification](https://samtools.github.io/hts-specs/CRAMv3.pdf) - tiêu chuẩn GA4GH
- [samtools CRAM Documentation](http://www.htslib.org/doc/samtools.html)
- [GATK CRAM Support](https://gatk.broadinstitute.org/hc/en-us/articles/360035890791-SAM-or-BAM-or-CRAM-Mapped-sequence-data-formats)
- [Storage Optimization Documentation](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
- [Pipeline Repository](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
- Ảnh bìa: [Hard disk drive platter, Western Digital Caviar 250Gb WD2500AAKS](https://commons.wikimedia.org/wiki/File:Hard_disk_drive_platter%2C_Western_Digital_Caviar_250Gb_WD2500AAKS.jpg) — Mk2010, Wikimedia Commons, CC BY 4.0
