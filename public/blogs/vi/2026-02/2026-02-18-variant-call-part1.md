---
slug: gatk-variant-calling-bash-workflow-pixi-part1
title: "Gọi biến thể (Phần 1): Xây dựng workflow gọi biến thể GATK tái lập được bằng Bash với Pixi"
description: "Điểm khởi đầu thực hành cho việc gọi biến thể germline: một workflow GATK gồm mười bước viết bằng bash, với phiên bản công cụ được ghim và quản lý bằng Pixi, thử nghiệm trên bộ dữ liệu nhỏ của nf-core."
series: Variant Calling from Bash to Production
seriesOrder: 1
authors: [vieomics]
tags: [bash, gatk, variant-calling, pixi, genomics, workflow, bwa, samtools, bioinformatics, ngs]
image: ./imgs/variant_calling.png
---

Bài viết này là điểm khởi đầu thực hành cho một workflow gọi biến thể germline. Bài bắt đầu bằng một cách tiếp cận đơn giản: các script bash, kèm một môi trường tái lập được quản lý bằng Pixi. Những bài sau trong chuỗi sẽ bàn đến việc chuyển workflow này sang Nextflow, nơi có thể xem xét thêm về tối ưu hóa, tùy biến và tích hợp công cụ bổ sung.

<!--truncate-->

:::info
Mã nguồn của bài hướng dẫn này có trong GitHub repository: **https://github.com/nttg8100/nf-germline-short-read-variant-calling/tree/0.1.0**
:::

## Tổng quan chuỗi bài

Đây là chuỗi gồm năm phần, đưa một workflow gọi biến thể germline từ script bash đến triển khai production:

1. **Phần 1 (bài này)** — workflow bash với môi trường Pixi tái lập được.
2. [Phần 2 — từ Bash sang Nextflow](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2): chuyển các bước tương tự và kiểm tra sự tương đồng của kết quả.
3. [Phần 3 — triển khai quy mô production](/blogs/gatk-variant-calling-production-slurm-optimization-part3): cấu hình SLURM và tinh chỉnh tài nguyên cho từng công cụ.
4. [Phần 4 — kiểm thử và lint](/blogs/gatk-variant-calling-production-slurm-optimization-part4): quy tắc lint và snapshot của `nf-test`.
5. [Phần 5 — benchmark](/blogs/gatk-variant-calling-production-slurm-optimization-part5): đánh giá pipeline trên bộ truth set HG002 của GIAB.

## Kiến thức cần có và bài đọc liên quan

Trước khi bắt đầu, việc quen với các nội dung sau sẽ hữu ích:

1. [Pixi — kỷ nguyên mới dựa trên conda](/blogs/pixi-is-new-conda-based-era) — cách quản lý gói được dùng ở đây.
2. [Container trên HPC: từ Docker đến Singularity và Apptainer](/blogs/containers-hpc-docker-singularity-apptainer) — kiến thức cơ bản về container cho tính tái lập.
3. [Quản lý phiên bản — vai trò của Git trong bioinformatics tái lập (Phần 1)](/blogs/how-to-version-control-git-bioinformatics-part-1) — kiến thức cơ bản về quản lý phiên bản.

## 1. Workflow gọi biến thể GATK

### 1.1 Tìm hiểu workflow

[Hướng dẫn GATK của NGS101](https://ngs101.com/how-to-analyze-whole-genome-sequencing-data-for-absolute-beginners-part-1-from-raw-reads-to-high-quality-variants-using-gatk/) giới thiệu khá rõ ràng về việc gọi biến thể germline. Phần này đi theo mười bước được mô tả ở đó để cấu trúc của pipeline dễ theo dõi.

Gọi biến thể germline là một phần cốt lõi của phân tích giải trình tự DNA trên dữ liệu toàn hệ gen. DNA gồm 23 cặp nhiễm sắc thể và hơn ba tỉ cặp base. Các cá thể có cấu trúc tổng thể giống nhau, nhưng trình tự nucleotide cụ thể (A, T, C, G) khác nhau giữa các cá thể; những khác biệt này được gọi là biến thể.

Dự án Human Genome Project đã thiết lập một hệ gen tham chiếu, được dùng làm khuôn mẫu để so sánh hệ gen của từng cá thể. Biến thể là khác biệt giữa DNA của một cá thể và hệ gen tham chiếu đó. Phần lớn biến thể là lành tính và chỉ góp phần tạo nên sự khác biệt giữa các cá thể.

Hình dưới minh họa cách các read paired-end (màu đỏ và xanh) được align vào hệ gen tham chiếu. Khi một read khác với tham chiếu tại một vị trí (được tô xanh), có thể có một biến thể tại đó. Nếu nhiều read cùng ủng hộ một khác biệt, bằng chứng cho biến thể thật sẽ mạnh hơn.

![variant](./imgs/variant_align_ref.png)

Tham khảo: https://gatk.broadinstitute.org/hc/en-us/community/posts/360077647812-Why-do-a-clear-expected-variant-not-show-up-in-the-Mutect2-vcf-file

Để xác định biến thể với độ tin cậy hợp lý, các read giải trình tự ngắn cần được align chính xác vào tham chiếu. Biến thể germline được di truyền và thường xuất hiện ở khoảng 40–50% số read khi dị hợp (nhận từ một bố/mẹ) hoặc gần 100% khi đồng hợp (nhận từ cả hai). Đột biến somatic phát sinh ở các tế bào không được di truyền, ví dụ trong ung thư, và thường cần so sánh mẫu u với mẫu bình thường để tách biến thể somatic thật khỏi biến thể di truyền.

Đi theo các bước nền tảng này sẽ cho một workflow gọi biến thể germline khả dụng, đồng thời giúp hiểu bối cảnh sinh học đằng sau mỗi giai đoạn.

### 1.2 Dữ liệu

Có nhiều bộ dữ liệu công khai để phát triển workflow gọi biến thể. Trong bài này, chúng tôi dùng bộ dữ liệu test nhỏ do [nf-core/sarek](https://github.com/nf-core/sarek) cung cấp, vốn được thiết kế cho việc prototype pipeline nhanh.

Trong quá trình phát triển, việc dùng một tập con dữ liệu đại diện và dễ quản lý là hữu ích. Các bộ dữ liệu như của sarek thường được tạo bằng cách trích ra các read raw align vào một vùng hệ gen cụ thể. Một cách làm là align các file FASTQ gốc vào hệ gen tham chiếu bằng một script bash ngắn, rồi chỉ giữ các read được map vào một vùng như `chr22:100,000-200,000`. Tương tự, hệ gen tham chiếu có thể được rút gọn còn `chr22:1-250,000`. Cách này giảm đáng kể kích thước dữ liệu đầu vào và tăng tốc kiểm thử, lặp lại. Sau khi workflow đã được kiểm chứng trên dữ liệu nhỏ, có thể chạy trên toàn bộ dữ liệu.

### 1.3 Giải thích từng bước

#### 1.3.1 Kiểm soát chất lượng read raw (FastQC)

- Đánh giá các chỉ số chất lượng của read.
- Nhận diện những vấn đề tiềm ẩn của quá trình giải trình tự.
- Tạo báo cáo HTML.

```bash
# download raw small data
wget https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz
# view file
zcat test_1.fastq.gz|head
```

**Cấu trúc của file FASTQ**

```
@normal#21#998579#1/1
CCTTCTCCCTGCTGGGGTTGCTTGTCAGTAGCGGGCAAGGTAGGAGTGTGGCGCTTTATTGCATTTACTTTCCCTCCCCCTTCCCCCCGGCCAAGAGAGG
+
102302000331;3333;23133320233330*33/233333333333333/313232333/3;3;3/333000;11/00;;01//103*1032323233
@normal#21#998572#2/1
CTCCTCTCCTTCTACCTGCTGGGGTTGCTTGTCAGTAGCGGGCAAGGTCGGAGTGTTGCGCTTTATTGCATTTACTTTCCCTCCCCCTTCCACCCGGCCA
+
/201302/0330;30033133333;230;333033333033300333203333333;*03133;223300;2;3/33211/210001;2/13/0133//3
@normal#21#998620#3/1
AGGAGTGGGCGCTTTATTGCATTTACTTTCCGTCCCCCTTCCACCCGGCCAAGAGAGGCAAAGAGGGAGGCCAGGAAGAATGAAATGAAAGAACTAAA
```

FASTQ là định dạng chuẩn để lưu các read giải trình tự raw từ các nền tảng NGS. Mỗi read được biểu diễn bằng bốn dòng:

1. **Định danh trình tự** (bắt đầu bằng `@`): thông tin về read, ví dụ thiết bị, lần chạy và tọa độ.
2. **Trình tự nucleotide**: các base DNA thực tế (A, T, C, G hoặc N).
3. **Dòng phân cách** (bắt đầu bằng `+`): có thể lặp lại định danh hoặc chỉ là dấu cộng.
4. **Điểm chất lượng**: điểm chất lượng Phred mã hóa theo ASCII cho từng base trong trình tự.

**Ví dụ:**

```
@normal#21#998579#1/1
CCTTCTCCCTGCTGGGGTTGCTTGTCAGTAGCGGGCAAGGTAGGAGTGTGGCGCTTTATTGCATTTACTTTCCCTCCCCCTTCCCCCCGGCCAAGAGAGG
+
102302000331;3333;23133320233330*33/233333333333333/313232333/3;3;3/333000;11/00;;01//103*1032323233
```

- **Dòng đầu** là tên read.
- **Dòng thứ hai** là trình tự.
- **Dòng thứ ba** là dòng phân cách.
- **Dòng thứ tư** mã hóa chất lượng của từng base (cùng độ dài với trình tự).

Cấu trúc này lặp lại cho mọi read trong file. Thông thường người ta trim các read có chất lượng thấp; nếu không, chúng có thể align kém vào tham chiếu và làm giảm độ tin cậy của việc gọi biến thể.

#### 1.3.2 Trim read (Trim Galore)

- Mục tiêu đơn giản là cắt bỏ các read chất lượng thấp.
- Với Trim Galore, FastQC được chạy lại trên dữ liệu đã trim để kiểm tra kết quả — xác nhận rằng read được trim đúng như mong đợi và không bị loại bỏ quá nhiều dữ liệu.

#### 1.3.3 Align vào hệ gen tham chiếu

Tải hệ gen tham chiếu và xem cấu trúc của nó:

```bash
# Download reference genome
wget https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta
head genome.fasta
```

Mười dòng đầu tiên dưới đây chỉ cho thấy tham chiếu dưới dạng một trình tự A, T, C, G có thứ tự. So sánh bằng mắt một read với tham chiếu là không thực tế, nên chúng tôi dùng `bwa`, công cụ thực hiện việc so sánh nhanh hơn nhiều. Chuỗi bài giảng của Ben Langmead giải thích thuật toán đằng sau việc này: https://www.youtube.com/watch?v=6BJbEWyO_N0&list=PL2mpR0RYFQsADmYpW2YWBrXJZ_6EL_3nu&index=4

```bash
>chr22
ACTCAAGATAATGATGAGTAAAGAATATATTTCTAACAACAAAAAGGAAATTTGATAGTA
TTTCTAAAGACAAAAAGGAAATTTGTATTCACATTCAGTTAGTCATTCCACCAGAATGAC
TTCATCACACAATATTTTGTGACAAGAACCTGAACAGCCTCATGTTTTACAATATTCTTT
TCATCTTTTATTATATGCACCAAAATTTTCTTTTTTAAATTTTCTTGAACCTCTAAATCT
ACTTTAAAAATTTACCTGATACACTTTTTAAATGGACAAATGCTGAAGGTAGCTGTGTAT
ACAAATGTGACTAGAAGGAAAAAGATGATGTAGAAATACAATAACTCCTTGAGTTGATCA
TTCTGATTGGCATTTATAGAGTAGAAATGTTTTGTAATTACAGAGGAAAAAAGATGGCCT
TTCCTTCAACAGTTATGAGCCGTCAGAATTTTCAAAAATATTGCATTTTGACAATGTAGT
TTCTAGTTTGACAATGATATATTTATCTTCAAAACCAGGAAAATGTAGATAAGGATTTGG
```

Nên index hệ gen tham chiếu một lần rồi tái sử dụng, thay vì index lại ở mỗi lần chạy khi tham chiếu không đổi:

```bash
# simple command, however, to install bwa, later we use pixi
bwa index genome.fasta
```

#### 1.3.4 Sort và index read đã align (Samtools)

Sau khi align, các read được sort theo tọa độ hệ gen bằng Samtools. Việc sort là cần thiết cho phân tích về sau, đặc biệt là gọi biến thể và trực quan hóa, vì nhiều công cụ yêu cầu file BAM đã sort. Index tạo ra file `.bai` đóng vai trò như mục lục, cho phép truy cập nhanh vào một vùng cụ thể của file BAM.

#### 1.3.5 Đánh dấu duplicate (GATK MarkDuplicates)

GATK MarkDuplicates nhận diện các read duplicate do PCR hoặc quang học — những read có trình tự và vị trí align giống hệt nhau. Vì DNA bị cắt thành các đoạn ngắn, duplicate thật là hiếm; phần lớn duplicate đến từ các artefact kỹ thuật. Việc đánh dấu hoặc loại bỏ chúng ngăn chúng làm phồng bằng chứng cho một biến thể. Ví dụ, nếu 14% read ủng hộ một biến thể nhưng 10% là duplicate, thì chỉ 4% là bằng chứng thực sự.

#### 1.3.6 Hiệu chỉnh điểm chất lượng base (GATK BaseRecalibrator)

Bước này mô hình hóa và hiệu chỉnh các sai số hệ thống trong điểm chất lượng base do thiết bị giải trình tự gán. Dùng các vị trí biến thể đã biết, GATK BaseRecalibrator tạo ra bảng hiệu chỉnh dùng để điều chỉnh điểm chất lượng, qua đó cải thiện độ chính xác của việc gọi biến thể về sau.

```bash
# Download one db, we still have indel database
wget https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz
# Check first few line, it shows the variant at specific position
zcat dbsnp_146.hg38.vcf.gz|grep -v "#"|head|column -t 
```

```bash
chr22  66   rs568512106  A      G  .  PASS  RS=568512106;RSPOS=16570065;dbSNPBuildID=142;SSR=0;SAO=0;VP=0x050000000005040024000100;WGT=1;VC=SNV;ASP;VLD;KGPhase3;CAF=0.9994,0.000599;COMMON=0
chr22  67   rs371364157  A      G  .  PASS  RS=371364157;RSPOS=16570066;dbSNPBuildID=138;SSR=0;SAO=0;VP=0x050000000005000002000100;WGT=1;VC=SNV;ASP
chr22  68   rs536054182  A      C  .  PASS  RS=536054182;RSPOS=16570067;dbSNPBuildID=142;SSR=0;SAO=0;VP=0x050000000005040024000100;WGT=1;VC=SNV;ASP;VLD;KGPhase3;CAF=0.9994,0.000599;COMMON=0
chr22  91   rs149338188  ACATT  A  .  PASS  RS=149338188;RSPOS=16570091;dbSNPBuildID=134;SSR=0;SAO=0;VP=0x05000000000515003e000200;WGT=1;VC=DIV;ASP;VLD;G5;KGPhase1;KGPhase3;CAF=0.8083,0.1917;COMMON=1
chr22  91   rs75245162   ACATT  A  .  PASS  RS=75245162;RSPOS=16570093;dbSNPBuildID=131;SSR=0;SAO=0;VP=0x050000000005000002000200;WGT=1;VC=DIV;ASP;CAF=0.8083,0.1917;COMMON=1
chr22  96   rs150045226  C      T  .  PASS  RS=150045226;RSPOS=16570095;dbSNPBuildID=134;SSR=0;SAO=0;VP=0x050000000005000002000100;WGT=1;VC=SNV;ASP
chr22  103  rs563344083  TC     T  .  PASS  RS=563344083;RSPOS=16570103;dbSNPBuildID=142;SSR=0;SAO=0;VP=0x050000000005040026000200;WGT=1;VC=DIV;ASP;VLD;KGPhase3;CAF=0.997,0.002995;COMMON=1
chr22  140  rs370473918  T      C  .  PASS  RS=370473918;RSPOS=16570139;dbSNPBuildID=138;SSR=0;SAO=0;VP=0x050000000005000002000100;WGT=1;VC=SNV;ASP
chr22  177  rs553984036  C      A  .  PASS  RS=553984036;RSPOS=16570176;dbSNPBuildID=142;SSR=0;SAO=0;VP=0x050000000005040024000100;WGT=1;VC=SNV;ASP;VLD;KGPhase3;CAF=0.9996,0.0003994;COMMON=0
chr22  208  rs565829750  T      C  .  PASS  RS=565829750;RSPOS=16570207;dbSNPBuildID=142;SSR=0;SAO=0;VP=0x050000000005000024000100;WGT=1;VC=SNV;ASP;KGPhase3;CAF=0.9998,0.0001997;COMMON=0
```

#### 1.3.7 Áp dụng BQSR (GATK ApplyBQSR)

Bảng hiệu chỉnh được áp dụng vào file BAM, cập nhật điểm chất lượng base. Kết quả là một file BAM sẵn sàng cho phân tích với các chỉ số chất lượng đáng tin cậy hơn, điều này then chốt cho việc phát hiện biến thể với độ tin cậy cao.

#### 1.3.8 Đánh giá chất lượng

Thu thập các chỉ số tổng hợp về align.

#### 1.3.9 Gọi biến thể (GATK HaplotypeCaller)

GATK HaplotypeCaller phân tích file BAM đã hiệu chỉnh để nhận diện SNP và indel. Công cụ này thực hiện lắp ráp cục bộ các haplotype và ghi biến thể ở định dạng VCF hoặc GVCF, tạo nền tảng cho việc genotype và lọc tiếp theo.

#### 1.3.10 Genotype (GATK GenotypeGVCFs)

Genotyping là quá trình xác định các allele có mặt tại những vị trí cụ thể trong DNA của một mẫu. GATK GenotypeGVCFs kết hợp kết quả gọi biến thể từ nhiều mẫu (ở định dạng GVCF) thành một tập genotype cuối cùng, cho phép nhận diện biến thể một cách nhất quán trên cả cohort.

## 2. Cài đặt công cụ

### 2.1 Vì sao dùng Pixi

Pixi có một số đặc điểm thực dụng cho workflow bioinformatics:

- **Nhanh**: việc giải quyết môi trường thường nhanh hơn nhiều so với conda.
- **Tái lập được**: lock file ghim chính xác môi trường.
- **Đơn giản**: một file `pixi.toml` mô tả mọi thứ.
- **Đa nền tảng**: hoạt động trên Linux, macOS và Windows.

:::tip
Để tìm hiểu kỹ hơn về Pixi, xem [Pixi — kỷ nguyên mới dựa trên conda](/blogs/pixi-is-new-conda-based-era).
:::

### 2.2 Tạo project

Tạo một thư mục mới và khởi tạo project Pixi:

```bash
mkdir bash-gatk
cd bash-gatk

# install Pixi if not already installed
curl -fsSL https://pixi.sh/install.sh | bash
pixi init
# activate env that is similar to conda
pixi shell
```

Tạo file `pixi.toml`, có thể bằng dòng lệnh hoặc bằng trình soạn thảo:

```toml
[workspace]
name = "bash-gatk"
version = "0.1.0"
description = "GATK variant calling workflow - from bash to Nextflow transformation"
channels = ["conda-forge", "bioconda"]
platforms = ["linux-64"]

[dependencies]
```

Để cài một công cụ, chạy lệnh dưới đây. Nên ghim phiên bản; Pixi ghi phiên bản đã giải quyết vào lock file, nên sau này có thể đọc lại chính xác phiên bản từ file cấu hình.

```bash
# add bwa tools, better with hard version, pixi add lock file while adding hard version that we can quickly check version on the config file
pixi add bwa==0.7.17
# show where you tool is installed
which bwa
```

Có thể cài từng công cụ một. Bộ công cụ đầy đủ dùng cho workflow chuẩn mô tả ở đây là:

```toml
[workspace]
name = "bash-gatk"
version = "0.1.0"
description = "GATK variant calling workflow - from bash to Nextflow transformation"
channels = ["conda-forge", "bioconda"]
platforms = ["linux-64"]

[dependencies]
bwa = "==0.7.17"
samtools = "==1.16.1"
gatk4 = "==4.6.2.0"
fastqc = "==0.12.1"
curl = "*"
trim-galore = "==0.6.11"
r-base = "==4.4.0"
```

## 3. Chuẩn bị dữ liệu đầu vào và tham chiếu

Dữ liệu đầu vào được tải một lần rồi tái sử dụng. Không cần tải lại ở mỗi lần chạy.

```bash
#!/bin/bash
#
# Download test data for GATK variant calling pipeline
# This script downloads reference genome, known sites, and test FASTQ files from nf-core
#

set -euo pipefail

echo "=========================================="
echo "Downloading GATK Pipeline Test Data"
echo "=========================================="
echo

# Create directories
echo "Creating directories..."
mkdir -p data reference
echo "✓ Directories created"
echo

# Download reference genome
echo "Downloading reference genome..."
cd reference

curl -L -o genome.fasta \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta
echo "✓ genome.fasta downloaded"

curl -L -o genome.fasta.fai \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta.fai
echo "✓ genome.fasta.fai downloaded"

curl -L -o genome.dict \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.dict
echo "✓ genome.dict downloaded"

# Download known sites for BQSR
echo ""
echo "Downloading known sites VCF files..."

curl -L -o dbsnp_146.hg38.vcf.gz \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz
echo "✓ dbsnp_146.hg38.vcf.gz downloaded"

curl -L -o dbsnp_146.hg38.vcf.gz.tbi \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz.tbi
echo "✓ dbsnp_146.hg38.vcf.gz.tbi downloaded"

curl -L -o mills_and_1000G.indels.vcf.gz \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz
echo "✓ mills_and_1000G.indels.vcf.gz downloaded"

curl -L -o mills_and_1000G.indels.vcf.gz.tbi \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz.tbi
echo "✓ mills_and_1000G.indels.vcf.gz.tbi downloaded"

cd ..

# Index the reference genome
echo ""
echo "Creating BWA index for reference genome..."
echo "This may take a few moments..."
bwa index reference/genome.fasta
echo "✓ BWA index created"

# Download test FASTQ files
echo ""
echo "Downloading test FASTQ files..."
cd data

curl -L -o sample1_R1.fastq.gz \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_1.fastq.gz
echo "✓ test_1.fastq.gz downloaded"

curl -L -o sample1_R2.fastq.gz \
  https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/illumina/fastq/test_2.fastq.gz
echo "✓ test_2.fastq.gz downloaded"

cd ..

# Summary
echo ""
echo "=========================================="
echo "Data Download Completed Successfully!"
echo "=========================================="
echo ""
echo "Downloaded files:"
echo "Reference genome:"
ls -lh reference/genome.fasta* reference/genome.dict 2>/dev/null || true
echo ""
echo "BWA indices:"
ls -lh reference/genome.fasta.{amb,ann,bwt,pac,sa} 2>/dev/null || true
echo ""
echo "Known sites VCFs:"
ls -lh reference/*.vcf.gz* 2>/dev/null || true
echo ""
echo "Test FASTQ files:"
ls -lh data/*.fastq.gz 2>/dev/null || true
echo ""
echo "=========================================="
echo "You can now run the pipeline with: Nextflow workflow"
echo "  cd nextflow-gatk; pixi run nextflow run main.nf -profile singularity --input samplesheet.csv"
echo "You can now run the pipeline with: Bash workflow"
echo "  cd nextflow-gatk; pixi run bash gatk_pipeline.sh"
echo "=========================================="
```

## 4. Chạy toàn bộ workflow

### 4.1 Chạy pipeline

Workflow có cấu trúc như sau:

```bash
├── bash-gatk
│   ├── gatk_pipeline.sh
│   ├── pixi.lock
│   └── pixi.toml
├── README.md
└── scripts
    ├── download_data.sh
```

Tải dữ liệu trước, rồi chạy pipeline gọi biến thể:

```bash
# Activate env on this folder
pixi shell --manifest-path  bash-gatk
# Run the download script (uses Pixi environment for BWA indexing)
bash scripts/download_data.sh
```

Kiểm tra rằng thư mục `data` và `reference` đã có dữ liệu như mong đợi:

```bash
├── bash-gatk
│   ├── gatk_pipeline.sh
│   ├── pixi.lock
│   └── pixi.toml
├── data
│   ├── sample1_R1.fastq.gz
│   └── sample1_R2.fastq.gz
├── README.md
├── reference
│   ├── dbsnp_146.hg38.vcf.gz
│   ├── dbsnp_146.hg38.vcf.gz.tbi
│   ├── genome.dict
│   ├── genome.fasta
│   ├── genome.fasta.amb
│   ├── genome.fasta.ann
│   ├── genome.fasta.bwt
│   ├── genome.fasta.fai
│   ├── genome.fasta.pac
│   ├── genome.fasta.sa
│   ├── mills_and_1000G.indels.vcf.gz
│   └── mills_and_1000G.indels.vcf.gz.tbi
└── scripts
    ├── download_data.sh
```

Bản thân workflow bash là file `bash-gatk/gatk_pipeline.sh`:

```bash
#!/bin/bash
#
# GATK Variant Calling Pipeline - Complete Best Practices (10 Steps)
# Based on NGS101 tutorial: https://ngs101.com/how-to-analyze-whole-genome-sequencing-data-for-absolute-beginners-part-1-from-raw-reads-to-high-quality-variants-using-gatk/
# Adapted to use nf-core test data with hard filtering (Option 2)
#
# This pipeline implements the complete GATK workflow with:
# - Adapter trimming and quality filtering (Trim Galore)
# - Read alignment with BWA-MEM
# - Duplicate marking (GATK MarkDuplicates)
# - Base quality score recalibration (BQSR)
# - Alignment quality metrics (GATK CollectMetrics)
# - Variant calling with HaplotypeCaller (GVCF mode)

set -euo pipefail

# Configuration
SAMPLE="${1:-sample1}"  # Accept sample name as first argument, default to sample1
THREADS=2
DATA_DIR="data"
REF_DIR="reference"
RESULTS_DIR="results"

# Reference files
REFERENCE="${REF_DIR}/genome.fasta"
DBSNP="${REF_DIR}/dbsnp_146.hg38.vcf.gz"
KNOWN_INDELS="${REF_DIR}/mills_and_1000G.indels.vcf.gz"

# Input FASTQ files
FASTQ_R1="${DATA_DIR}/${SAMPLE}_R1.fastq.gz"
FASTQ_R2="${DATA_DIR}/${SAMPLE}_R2.fastq.gz"

# Output directories
QC_DIR="${RESULTS_DIR}/qc/${SAMPLE}"
TRIMMED_DIR="${RESULTS_DIR}/trimmed/${SAMPLE}"
ALIGNED_DIR="${RESULTS_DIR}/aligned/${SAMPLE}"
VAR_DIR="${RESULTS_DIR}/var/${SAMPLE}"

# Output files
TRIMMED_R1="${TRIMMED_DIR}/${SAMPLE}_R1_val_1.fq.gz"
TRIMMED_R2="${TRIMMED_DIR}/${SAMPLE}_R2_val_2.fq.gz"
ALIGNED_BAM="${ALIGNED_DIR}/${SAMPLE}.bam"
SORTED_BAM="${ALIGNED_DIR}/${SAMPLE}.sorted.bam"
DEDUP_BAM="${ALIGNED_DIR}/${SAMPLE}_marked_duplicates.bam"
RECAL_TABLE="${ALIGNED_DIR}/${SAMPLE}_recal_data.table"
RECAL_BAM="${ALIGNED_DIR}/${SAMPLE}_recalibrated.bam"
GVCF="${VAR_DIR}/${SAMPLE}.g.vcf.gz"
RAW_VCF="${VAR_DIR}/${SAMPLE}_raw_variants.vcf.gz"
METRICS="${ALIGNED_DIR}/${SAMPLE}_duplicate_metrics.txt"

# Check tools are available
echo "Checking required tools..."
echo "✓ FastQC:" 
fastqc --version
echo "✓ Trim Galore:" 
trim_galore --version
echo "✓ BWA:" 
bwa || true  # BWA doesn't have a --version flag, so we ignore the error
echo "✓ Samtools:" 
samtools --version
echo "✓ GATK:" 
gatk --version
echo "✓ R (for insert size histogram):" 
R --version
echo "All required tools are available."

# Create output directories
mkdir -p ${QC_DIR} ${TRIMMED_DIR} ${ALIGNED_DIR} ${VAR_DIR}

echo "=========================================="
echo "GATK Variant Calling Pipeline - Complete"
echo "Sample: ${SAMPLE}"
echo "Based on NGS101 Best Practices"
echo "=========================================="
echo

# Step 1: Quality Control with FastQC
echo "[$(date)] Step 1: Running FastQC on raw reads..."
fastqc -o ${QC_DIR} -t ${THREADS} ${FASTQ_R1} ${FASTQ_R2}
echo "[$(date)] FastQC completed"
echo

# Step 2: Adapter Trimming and Quality Filtering
echo "[$(date)] Step 2: Adapter trimming with Trim Galore..."
trim_galore \
    --paired \
    --quality 20 \
    --length 50 \
    --fastqc \
    --output_dir ${TRIMMED_DIR} \
    ${FASTQ_R1} ${FASTQ_R2}
echo "[$(date)] Adapter trimming completed"
echo

# Step 3: Read Alignment with BWA-MEM
echo "[$(date)] Step 3: Aligning reads with BWA-MEM..."
bwa mem \
    -t ${THREADS} \
    -M \
    -R "@RG\tID:${SAMPLE}\tSM:${SAMPLE}\tPL:ILLUMINA\tLB:${SAMPLE}_lib" \
    ${REFERENCE} \
    ${TRIMMED_R1} ${TRIMMED_R2} \
    | samtools view -Sb - > ${ALIGNED_BAM}
echo "[$(date)] Alignment completed"
echo

# Step 4: Sort and Index BAM file
echo "[$(date)] Step 4: Sorting BAM file..."
samtools sort -@ ${THREADS} -o ${SORTED_BAM} ${ALIGNED_BAM}
samtools index ${SORTED_BAM}
echo "[$(date)] Sorting completed"
echo

# Step 5: Mark Duplicates
echo "[$(date)] Step 5: Marking duplicates with GATK..."
gatk MarkDuplicates \
    -I ${SORTED_BAM} \
    -O ${DEDUP_BAM} \
    -M ${METRICS} 
echo "[$(date)] Mark duplicates completed"
echo

# Step 6: Base Quality Score Recalibration (BQSR) - Generate table
echo "[$(date)] Step 6: Generating BQSR recalibration table..."
gatk BaseRecalibrator \
    -I ${DEDUP_BAM} \
    -R ${REFERENCE} \
    --known-sites ${DBSNP} \
    --known-sites ${KNOWN_INDELS} \
    -O ${RECAL_TABLE}
echo "[$(date)] BQSR table generated"
echo

# Step 7: Apply BQSR
echo "[$(date)] Step 7: Applying BQSR..."
gatk ApplyBQSR \
    -I ${DEDUP_BAM} \
    -R ${REFERENCE} \
    --bqsr-recal-file ${RECAL_TABLE} \
    -O ${RECAL_BAM}
echo "[$(date)] BQSR applied"
echo

# Step 8: Alignment Quality Assessment
echo "[$(date)] Step 8: Collecting alignment quality metrics..."
gatk CollectAlignmentSummaryMetrics \
    -R ${REFERENCE} \
    -I ${RECAL_BAM} \
    -O ${QC_DIR}/${SAMPLE}_alignment_summary.txt

# Collect insert size metrics with histogram (requires R)
gatk CollectInsertSizeMetrics \
    -I ${RECAL_BAM} \
    -O ${QC_DIR}/${SAMPLE}_insert_size_metrics.txt \
    -H ${QC_DIR}/${SAMPLE}_insert_size_histogram.pdf
echo "[$(date)] Alignment QC completed"
echo

# Step 9: Variant Calling with HaplotypeCaller (GVCF mode)
echo "[$(date)] Step 9: Calling variants with HaplotypeCaller in GVCF mode..."
gatk HaplotypeCaller \
    -R ${REFERENCE} \
    -I ${RECAL_BAM} \
    -O ${GVCF} \
    -ERC GVCF \
    --dbsnp ${DBSNP}
echo "[$(date)] GVCF generation completed"
echo

# Step 10: Genotype GVCFs
echo "[$(date)] Step 10: Genotyping GVCF to VCF..."
gatk GenotypeGVCFs \
    -R ${REFERENCE} \
    -V ${GVCF} \
    -O ${RAW_VCF}
echo "[$(date)] Genotyping completed"
echo
```

```bash
bash bash-gatk/gatk_pipeline.sh
```

Thư mục kết quả trông như sau:

```bash
── results
│   ├── aligned
│   │   └── sample1
│   │       ├── sample1.bam
│   │       ├── sample1_duplicate_metrics.txt
│   │       ├── sample1_marked_duplicates.bai
│   │       ├── sample1_marked_duplicates.bam
│   │       ├── sample1_recal_data.table
│   │       ├── sample1_recalibrated.bai
│   │       ├── sample1_recalibrated.bam
│   │       └── sample1.sorted.bam
│   ├── qc
│   │   └── sample1
│   │       ├── sample1_alignment_summary.txt
│   │       ├── sample1_insert_size_histogram.pdf
│   │       ├── sample1_insert_size_metrics.txt
│   │       ├── sample1_R1_fastqc.html
│   │       ├── sample1_R1_fastqc.zip
│   │       ├── sample1_R2_fastqc.html
│   │       └── sample1_R2_fastqc.zip
│   ├── trimmed
│   │   └── sample1
│   │       ├── sample1_R1.fastq.gz_trimming_report.txt
│   │       ├── sample1_R1_val_1_fastqc.html
│   │       ├── sample1_R1_val_1_fastqc.zip
│   │       ├── sample1_R1_val_1.fq.gz
│   │       ├── sample1_R2.fastq.gz_trimming_report.txt
│   │       ├── sample1_R2_val_2_fastqc.html
│   │       ├── sample1_R2_val_2_fastqc.zip
│   │       └── sample1_R2_val_2.fq.gz
│   └── var
│       └── sample1
│           ├── sample1.g.vcf.gz
│           ├── sample1.g.vcf.gz.tbi
│           ├── sample1_raw_variants.vcf.gz
│           └── sample1_raw_variants.vcf.gz.tbi
```

### 4.2 Kiểm chứng kết quả

Mở các báo cáo FastQC dạng HTML trong trình duyệt để xem lại kết quả kiểm soát chất lượng.

Để xem kết quả gọi biến thể, chạy:

```bash
zcat results/var/sample1/sample1_raw_variants.vcf.gz
```

## 5. Tóm tắt

:::info
Workflow bash với Pixi cung cấp môi trường tái lập được, nhưng vẫn có những hạn chế:

- Thực thi tuần tự, không xử lý song song nhiều mẫu.
- Phải quản lý trạng thái phân tích thủ công.
- Khả năng mở rộng hạn chế cho triển khai tại chỗ, trên cloud hoặc HPC.

Các framework quản lý workflow hiện đại như WDL, Snakemake, Galaxy và Nextflow giải quyết những hạn chế này. Trong bài tiếp theo, chúng tôi chuyển workflow bash này thành pipeline Nextflow để cải thiện tự động hóa và khả năng mở rộng.
:::

## Tài liệu tham khảo

1. **Hướng dẫn GATK của NGS101** — phần trình bày từng bước một workflow gọi biến thể GATK: https://ngs101.com/how-to-analyze-whole-genome-sequencing-data-for-absolute-beginners-part-1-from-raw-reads-to-high-quality-variants-using-gatk/
2. **Best practice của GATK** — tài liệu workflow của Broad Institute: https://gatk.broadinstitute.org/hc/en-us/sections/360007226651-Best-Practices-Workflows
3. **Bộ dữ liệu test nf-core** — dữ liệu công khai dùng ở trên: https://github.com/nf-core/test-datasets
4. **Pixi** — tài liệu: https://pixi.sh
5. **BWA** — manual: http://bio-bwa.sourceforge.net/bwa.shtml
6. **SAMtools / HTSlib** — tài liệu: http://www.htslib.org/
7. **GATK** — tài liệu công cụ: https://gatk.broadinstitute.org/hc/en-us
8. **Trim Galore** — Babraham Bioinformatics: https://www.bioinformatics.babraham.ac.uk/projects/trim_galore/
9. **SnpEff** — chú giải biến thể: http://pcingola.github.io/SnpEff/
10. **bcftools** — thao tác trên biến thể: http://samtools.github.io/bcftools/
11. **Hard filtering so với VQSR trong GATK** — khi nào dùng cách nào: https://gatk.broadinstitute.org/hc/en-us/articles/360035531112--How-to-Filter-variants-either-with-VQSR-or-by-hard-filtering
12. **Joint genotyping và chế độ GVCF** — logic của joint calling cho biến thể germline đọc ngắn: https://gatk.broadinstitute.org/hc/en-us/articles/360035890431-The-logic-of-joint-calling-for-germline-short-variants
13. **Mã nguồn tham chiếu cho bài này**: https://github.com/nttg8100/nf-germline-short-read-variant-calling/tree/0.1.0
