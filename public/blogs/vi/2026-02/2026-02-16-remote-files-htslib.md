---
slug: remote-files-htslib-bcftools-samtools
title: "Làm việc với file từ xa bằng bcftools và samtools (HTSlib)"
description: "Cách các công cụ dựa trên HTSlib truy vấn dữ liệu hệ gen trên S3, FTP và HTTPS qua yêu cầu byte-range có chỉ mục, kèm xác thực, đánh chỉ mục và các workflow thực tế."
authors: [vieomics]
tags: [bioinformatics, htslib, bcftools, samtools, s3, remote-files, cloud, genomics]
image: ./imgs/intro.png
---

Các công cụ dựa trên HTSlib như `bcftools` và `samtools` có thể làm việc với dữ liệu hệ gen lưu trên server từ xa. Dù dữ liệu nằm trên AWS S3, truy cập qua FTP, hay được host trên endpoint HTTPS, những công cụ này có thể truy vấn và trích xuất một phần file từ xa mà không cần tải toàn bộ tập dữ liệu. Hướng dẫn này trình bày xác thực, các mẫu truy cập file từ xa và những workflow thực tế.

<!--truncate-->

## 1. HTSlib xử lý file từ xa với truy cập ngẫu nhiên như thế nào

HTSlib là một thư viện C nền tảng cho nhiều công cụ hệ gen. Các công cụ xây trên HTSlib — bao gồm `bcftools`, `samtools`, `tabix` và những công cụ khác — thừa hưởng hỗ trợ gốc cho **truy cập file từ xa qua truy vấn ngẫu nhiên**. Phần này giải thích cách HTSlib làm việc với file từ xa và những giao thức được hỗ trợ.

### 1.1 Cơ chế truy cập ngẫu nhiên

HTSlib cho phép truy cập file từ xa hiệu quả qua **cơ chế yêu cầu byte-range**. Thay vì tải toàn bộ file, nó dùng chỉ mục file để xác định vị trí byte chính xác và chỉ yêu cầu những byte đó từ server từ xa.

**Cách hoạt động:**

```
User Request:
  bcftools view s3://bucket/variants.vcf.gz chr1:1000-2000

HTSlib Process:
1. Reads index file (.vcf.gz.tbi) to find byte ranges
2. Index lookup: "chr1:1000-2000 is at bytes 5000-15000"
3. Sends byte-range request to remote server
4. Remote server returns ONLY requested bytes (10KB, not 1GB!)
5. HTSlib decompresses partial data
6. Returns matching variants to user

Result: 10KB downloaded instead of 1GB
Time: 1-5 seconds instead of 5-30 minutes
```

**Yêu cầu quan trọng: file phải có chỉ mục** (`.tbi`, `.bai`, `.csi`)
- Không có chỉ mục: phải tải toàn bộ file từ đầu (điều này thất bại hoặc không thực tế với file lớn)
- Có chỉ mục: chỉ tải những byte cần thiết

### 1.2 Các scheme URL được hỗ trợ

HTSlib hỗ trợ một danh sách giao thức qua `libcurl`. Hãy kiểm tra cài đặt của bạn:

```bash
# View all supported protocols
pixi run samtools --version 2>&1 | grep -A 20 "HTSlib URL"
```

**Ví dụ output đầy đủ:**

```
HTSlib URL scheme handlers present:
    built-in:        file, preload, data
    Google Cloud:    gs+http, gs+https, gs
    libcurl:         gophers, smtp, wss, smb, rtsp, tftp, pop3, smbs, imaps, pop3s, ws, ftps, ftp, gopher, imap, http, https, sftp, smtps, scp, dict, mqtt, telnet
    Amazon S3:       s3+https, s3, s3+http
    crypt4gh:        crypt4gh
    mem:             mem
```

**Phân loại giao thức:**

| Category          | Protocols                       | Typical Use               |
| ----------------- | ------------------------------- | ------------------------- |
| **Built-in**      | file, preload, data             | Local files, pipes        |
| **Cloud Storage** | s3://, gs://                    | AWS, Google Cloud         |
| **HTTP-based**    | http://, https://, ftps://      | Web servers, FTP over SSL |
| **Other**         | ftp://, sftp://, scp://, smb:// | Traditional file servers  |
| **Specialized**   | mqtt, dict, imap, etc           | Not typical for genomics  |

**Lưu ý về phạm vi giao thức:** bài này tập trung vào những giao thức phổ biến nhất cho bioinformatics: **S3, HTTPS, FTP và GCS**. Nhiều giao thức khác có sẵn nhưng ít được dùng cho dữ liệu hệ gen.

### 1.3 Các giao thức được trình bày trong bài

Những giao thức sau được dùng rộng rãi để lưu và truy cập dữ liệu hệ gen.

#### S3 (Amazon S3 và tương thích)
- **Scheme URL**: `s3://bucket-name/path/file.vcf.gz`
- **Trường hợp dùng**: repository hệ gen trên cloud, dữ liệu host trên AWS
- **Truy cập ngẫu nhiên**: qua yêu cầu byte-range, AWS SDK để xác thực
- **Tốc độ**: thường nhanh nhất cho truy vấn có chỉ mục
- **Xem phần**: 2 - Truy cập file từ xa trên S3

#### HTTPS (web server)
- **Scheme URL**: `https://server.com/path/file.vcf.gz`
- **Trường hợp dùng**: cơ sở dữ liệu công khai (NCBI, Ensembl), server của tổ chức
- **Truy cập ngẫu nhiên**: qua HTTP Range header (206 Partial Content)
- **Tốc độ**: nhanh với truy vấn có chỉ mục
- **Xem phần**: 4 - Truy cập file từ xa trên HTTPS

#### FTP (File Transfer Protocol)
- **Scheme URL**: `ftp://server.com/path/file.vcf.gz`
- **Trường hợp dùng**: cơ sở dữ liệu cũ, một số repository công khai
- **Truy cập ngẫu nhiên**: qua lệnh FTP REST để seek
- **Tốc độ**: chậm hơn S3/HTTPS với truy vấn có chỉ mục
- **Xem phần**: 3 - Truy cập file từ xa trên FTP

#### GCS (Google Cloud Storage)
- **Scheme URL**: `gs://bucket-name/path/file.vcf.gz`
- **Trường hợp dùng**: dữ liệu hệ gen host trên Google Cloud
- **Truy cập ngẫu nhiên**: tương tự S3 (yêu cầu byte-range)
- **Tốc độ**: nhanh với truy vấn có chỉ mục
- **Lưu ý**: cần thông tin xác thực Google Cloud SDK

### 1.4 Lợi ích chính của truy cập từ xa

- **Tránh tải lượng lớn**: truy vấn vùng cụ thể mà không cần truyền toàn bộ file
- **Tiết kiệm chi phí**: chỉ truyền dữ liệu bạn thực sự truy cập
- **Mở rộng**: làm việc với tập dữ liệu lớn hơn dung lượng đĩa cục bộ
- **Cộng tác**: tham chiếu trực tiếp tập dữ liệu chia sẻ mà không cần copy
- **Truy cập theo thời gian thực**: luôn làm việc với phiên bản dữ liệu mới nhất

### 1.5 Cân nhắc hiệu năng: vì sao chỉ mục quan trọng

Truy cập file từ xa cần file có chỉ mục để truy vấn theo vùng hiệu quả:
- **File VCF**: phải có chỉ mục `.vcf.gz.tbi`
- **File BAM**: phải có chỉ mục `.bam.bai`
- **File BCF**: phải có chỉ mục `.bcf.csi`

**So sánh băng thông khi truy vấn chr1:1-100000 từ file VCF 1GB:**

| Scenario               | Bytes Transferred | Time          | Method              |
| ---------------------- | ----------------- | ------------- | ------------------- |
| **Indexed S3**         | ~700KB            | <1 second     | Byte-range request  |
| **Indexed HTTPS**      | ~700KB            | 1-2 seconds   | HTTP Range header   |
| **Indexed FTP**        | ~700KB            | 3-5 seconds   | FTP REST seek       |
| **Unindexed remote**   | 1000MB+           | 5-30 minutes  | Sequential download |
| **Local indexed file** | ~700KB            | <0.5 seconds  | Direct file seek    |

**Điểm mấu chốt**: truy cập từ xa có chỉ mục chỉ truyền một phần nhỏ kích thước file.

### 1.6 Cài bcftools và samtools với Pixi

Một cách để cài bcftools và samtools có hỗ trợ file từ xa là dùng Pixi với các kênh `conda-forge` và `bioconda`. Những kênh này gồm binary đã biên dịch sẵn với hỗ trợ S3, FTP và HTTPS được bật trong HTSlib.

#### Các bước cài đặt

Tạo một thư mục mới cho dự án và khởi tạo môi trường Pixi:

```bash
# Create project directory
mkdir -p ~/htslib-project && cd ~/htslib-project

# Initialize Pixi with conda-forge and bioconda channels
pixi init --channel conda-forge --channel bioconda .

# Add bcftools and samtools
pixi add bcftools samtools
```

Lệnh này tạo file `pixi.toml`:

```toml
[workspace]
channels = ["conda-forge", "bioconda"]
name = "htslib-project"
platforms = ["linux-64"]
version = "0.1.0"

[dependencies]
bcftools = ">=1.23,<2"
samtools = ">=1.23,<2"
```

#### Kiểm tra cài đặt

```bash
# Run bcftools version
pixi run bcftools --version

# Run samtools version
pixi run samtools --version
```

Cả hai công cụ báo cáo các tính năng HTSlib bao gồm hỗ trợ S3, GCS và libcurl:

```
bcftools 1.23
Using htslib 1.23
...

Samtools 1.23
...
HTSlib compilation details:
    Features:       build=configure libcurl=yes S3=yes GCS=yes ...
```

Dòng quan trọng là `S3=yes`, cho biết hỗ trợ S3 đã được bật.

#### Vì sao dùng Pixi cho truy cập file từ xa?

- **Đã biên dịch sẵn với hỗ trợ từ xa**: gói Bioconda gồm HTSlib được biên dịch với hỗ trợ libcurl, S3 và GCS
- **Quản lý phụ thuộc dễ**: các thư viện cần thiết được đưa vào tự động
- **Môi trường tái lập**: `pixi.lock` ghim cùng phiên bản giữa các máy
- **Không cài toàn hệ thống**: công cụ được cô lập trong môi trường dự án

### 1.7 Xác minh giao thức: HTTP Range request

Để truy cập từ xa qua HTTPS/HTTP hoạt động hiệu quả, server phải hỗ trợ HTTP Range Request. Hãy xác minh điều này trước khi dựa vào truy vấn từ xa:

```bash
# Test if server supports Range Requests
curl -I -H "Range: bytes=0-500" https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz

# Expected response: HTTP/1.1 206 Partial Content
# This means byte-range requests work! ✓
```

Header phản hồi sẽ cho thấy:

```
HTTP/1.1 206 Partial Content      ← supports Range requests
Accept-Ranges: bytes              ← confirms support
Content-Length: 501               ← returns partial content
```

## 2. Truy cập file từ xa trên S3

AWS S3 là repository phổ biến cho tập dữ liệu hệ gen. HTSlib hỗ trợ S3 qua giao thức `s3://`.

### 2.1 Xác thực S3

#### Dùng thông tin xác thực AWS

Đặt thông tin xác thực AWS qua biến môi trường:

```bash
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_DEFAULT_REGION="us-east-1"
```

#### Dùng AWS IAM role (instance EC2)

Nếu chạy trên EC2 có gắn IAM role, HTSlib tự động dùng thông tin xác thực của role; không cần biến môi trường.

#### Dùng cấu hình AWS CLI

HTSlib tôn trọng `~/.aws/credentials` và `~/.aws/config`:

```bash
aws configure  # Interactive setup
```

### 2.2 Truy vấn file VCF trên S3

Truy vấn một vùng hệ gen cụ thể từ file VCF từ xa:

```bash
# Query chromosome 1, positions 1-1000000
bcftools view s3://my-bucket/data/variants.vcf.gz chr1:1-1000000

# Count variants in a region
bcftools view -H s3://my-bucket/data/variants.vcf.gz chr1:1-1000000 | wc -l

# Extract samples and subset to region
bcftools view -s sample1,sample2 s3://my-bucket/data/variants.vcf.gz chr1:1-1000000 -O v
```

### 2.3 Truy vấn file BAM trên S3

Trích read từ những vùng hệ gen cụ thể:

```bash
# Query region from remote BAM
samtools view s3://my-bucket/data/aligned.bam chr1:1-1000000

# Count reads in region
samtools view -c s3://my-bucket/data/aligned.bam chr1:1-1000000

# Extract to local BAM file
samtools view -b s3://my-bucket/data/aligned.bam chr1:1-1000000 -o region.bam
```

### 2.4 Workflow trích xuất theo vùng

Một workflow hiệu quả để trích xuất tập con từ S3:

```bash
# 1. List available S3 files (using AWS CLI)
aws s3 ls s3://my-bucket/data/ --recursive

# 2. Query specific region from VCF
bcftools view \
  s3://my-bucket/data/chr1.vcf.gz \
  chr1:10000000-20000000 \
  -O v -o local_subset.vcf

# 3. Validate and compress
bgzip -f local_subset.vcf
tabix -p vcf local_subset.vcf.gz

# 4. Annotate or further process locally
bcftools annotate local_subset.vcf.gz -a annotation.vcf.gz -c ID
```

### 2.5 Làm việc với dữ liệu hệ gen công khai

Các repository hệ gen công khai hữu ích để kiểm tra truy cập file từ xa. Dù S3 có sẵn, endpoint HTTPS thường đáng tin cậy hơn cho kiểm tra nhanh.

**Truy vấn dữ liệu NCBI dbSNP qua HTTPS:**

NCBI cung cấp truy cập công khai cho các biến thể phổ biến. Hãy kiểm tra với dữ liệu thực:

```bash
# Query NCBI dbSNP common variants (via HTTPS)
pixi run bcftools view \
  https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz \
  | pixi run bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\n' \
  | head -20
```

Output mong đợi với các biến thể thực:

```
1	10177	A	AC
1	10352	T	TA
1	10352	T	TA
1	10616	CCGCCGTTGCAAAGGCGCGCCG	C
1	10642	G	A
1	11008	C	G
1	11012	C	G
```

**Khám phá các file có sẵn:**

```bash
# List NCBI FTP VCF files
curl -s https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/ \
  | grep -i ".vcf.gz\"" | grep -o "href=\"[^\"]*\"" | cut -d'"' -f2

# Or for 1000 Genomes in S3:
aws s3 ls s3://1000genomes/phase3/data/ --no-sign-request | head -20
```

**Truy vấn theo vùng (với file có chỉ mục):**

```bash
# Query specific chromosome region
# Note: Requires .tbi index at the remote location
pixi run bcftools view \
  https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz \
  chr1:1000000-2000000
```

**Lưu ý về S3 và HTTPS:**
- **HTTPS** (như NCBI): đáng tin cậy, không cần thông tin xác thực cho dữ liệu công khai
- **S3**: nhanh nhất cho tập dữ liệu lớn, cần thông tin xác thực AWS hoặc thiết lập bucket công khai
- **FTP**: phương án thay thế cho một số repository, thường chậm hơn HTTPS

## 3. Truy cập file từ xa trên FTP

Các server FTP host nhiều tập dữ liệu hệ gen công khai. HTSlib hỗ trợ giao thức `ftp://`.

### 3.1 Xác thực FTP

#### Truy cập ẩn danh

Nhiều repository công khai cho phép FTP ẩn danh:

```bash
# No credentials needed
bcftools view ftp://ftp.ncbi.nlm.nih.gov/genomes/H_sapiens/VCF/common_all.vcf.gz chr1:1-1000000
```

#### FTP có xác thực

Với server FTP riêng, đưa thông tin xác thực vào URL:

```bash
bcftools view ftp://username:password@ftp.example.com/data/variants.vcf.gz chr1:1-1000000
```

**Lưu ý bảo mật**: thông tin xác thực nhúng trong URL hiển thị trong danh sách process. Nên dùng biến môi trường:

```bash
export FTP_USER="your_username"
export FTP_PASSWORD="your_password"

# HTSlib will use these automatically
bcftools view ftp://ftp.example.com/data/variants.vcf.gz chr1:1-1000000
```

### 3.2 Truy vấn file trên FTP

Các repository hệ gen công khai phổ biến truy cập được qua FTP:

#### Repository FTP của NCBI

```bash
# Query NCBI's common variants file
bcftools view \
  ftp://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/common_all.vcf.gz \
  chr1:1-1000000 \
  | bcftools query -f '%CHROM\t%POS\t%AC\t%AF\n' \
  | head -10
```

#### Repository FTP của Ensembl

```bash
# Query Ensembl VCF (example path)
bcftools view \
  ftp://ftp.ensembl.org/pub/data_files/homo_sapiens/VEP/Homo_sapiens_phenotypes_associated_variants-GRCh38.vcf.gz \
  1:1-1000000

# List available Ensembl files
ftp ftp.ensembl.org  # Interactive FTP session
```

### 3.3 Mẹo hiệu năng FTP

- **Độ ổn định mạng**: FTP có thể chậm hơn HTTPS với truy vấn đơn lẻ. Cân nhắc xử lý theo lô.
- **Chỉ mục có sẵn**: xác minh có chỉ mục `.tbi` hoặc `.csi` trên server FTP để truy vấn theo vùng hiệu quả.
- **Xử lý timeout**: đặt biến môi trường timeout cho kết nối không ổn định:

```bash
export CURL_CONNECT_TIMEOUT=30
export CURL_TIMEOUT=60
```

## 4. Truy cập file từ xa trên HTTPS

Endpoint HTTPS thường cần xác thực dựa trên token và ngày càng phổ biến cho dữ liệu host trên cloud.

### 4.1 Các phương thức xác thực HTTPS

#### Xác thực Bearer token

Với endpoint chấp nhận Bearer token (phổ biến trên nền tảng cloud):

```bash
# Option 1: Set environment variable
export HTTPS_AUTH_BEARER="your_bearer_token"
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000

# Option 2: Pass in URL (less secure)
bcftools view https://token:your_bearer_token@api.example.com/data/variants.vcf.gz chr1:1-1000000
```

#### API key trong header

Với dịch vụ cần header tuỳ biến, dùng `curl` với process substitution:

```bash
# Create a wrapper using curl and process substitution
bcftools view \
  <(curl -H "Authorization: Bearer TOKEN" \
     https://api.example.com/data/variants.vcf.gz \
     --output - ) \
  chr1:1-1000000
```

#### Xác thực HTTP cơ bản

```bash
# URL-embedded credentials (not recommended for security)
bcftools view https://username:password@secure.example.com/data/variants.vcf.gz chr1:1-1000000
```

### 4.2 Workflow HTTPS thực tế

#### Truy vấn dữ liệu công khai host trên HTTPS

Nhiều cơ sở dữ liệu cung cấp truy cập HTTPS cho dữ liệu hệ gen:

```bash
# Example: Query genome annotation from HTTPS endpoint
bcftools view https://example.genomics.org/public/variants.vcf.gz chr1:1-1000000

# Extract specific information
bcftools view https://example.genomics.org/public/variants.vcf.gz chr1:1-1000000 \
  | bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\t%AC\n'
```

#### Tải chỉ mục về cục bộ

Với truy vấn lặp lại, hãy cân nhắc cache chỉ mục cục bộ:

```bash
# Download index file (small, fast)
curl -o variants.vcf.gz.tbi https://api.example.com/data/variants.vcf.gz.tbi

# Query still uses remote file but with local index knowledge
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000
```

### 4.3 Vấn đề chứng chỉ SSL/TLS

Nếu gặp lỗi xác minh chứng chỉ:

```bash
# Disable certificate verification (use cautiously)
export SSL_NO_VERIFY=1
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000

# Or use curl environment variable
export CURL_CA_BUNDLE=""
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000
```

**Lưu ý bảo mật**: chỉ tắt xác minh chứng chỉ cho endpoint nội bộ đáng tin cậy hoặc khi kiểm thử.

## 5. Đánh chỉ mục và truy vấn vùng hiệu quả

Truy cập file từ xa hiệu quả phụ thuộc vào việc đánh chỉ mục đúng cách. Các công cụ HTSlib dùng yêu cầu byte-range để chỉ lấy dữ liệu cần thiết.

### 5.1 Tạo chỉ mục

#### Tạo chỉ mục tabix cho file VCF

```bash
# For bgzip-compressed VCF files
tabix -p vcf variants.vcf.gz

# Verify index
ls -lh variants.vcf.gz*
```

#### Tạo chỉ mục CSI cho file BCF

```bash
# CSI indexes support larger files and datasets
bcftools index -c variants.bcf

# Verify index
ls -lh variants.bcf.csi
```

#### Tạo chỉ mục BAI cho file BAM

```bash
# Standard BAM indexing
samtools index aligned.bam

# Creates aligned.bam.bai
ls -lh aligned.bam.bai
```

### 5.2 Kiểm tra tính toàn vẹn của chỉ mục

```bash
# Check if VCF index is valid
tabix -l variants.vcf.gz | head -10

# Query a specific region (tests index)
bcftools view variants.vcf.gz chr1:1-1000 -H | wc -l
```

### 5.3 Hiệu năng: truy cập từ xa có và không có chỉ mục

**Truy cập từ xa có chỉ mục** (với truy vấn theo vùng):
- Seek đến chỉ mục file
- Tải byte-range chứa vùng mục tiêu
- Trả về khoảng 100KB-1MB dữ liệu

**Truy cập từ xa không có chỉ mục**:
- Phải quét tuần tự toàn bộ file
- Tải toàn bộ file
- Trả về toàn bộ dữ liệu (có thể lên tới GB)

Ví dụ so sánh hiệu năng:

```bash
# Indexed query (fast, ~1-5 seconds)
time bcftools view s3://my-bucket/variants.vcf.gz chr1:1-1000000 > /dev/null

# Without index (very slow, minutes or fails)
# HTSlib automatically uses index if available, so explicitly avoid it only if needed
```

### 5.4 Kiểm tra truy cập file từ xa với file cục bộ

Trước khi làm việc với file từ xa, nên kiểm tra bcftools và samtools cục bộ. Workflow dưới đây xác minh cài đặt và thực hành truy vấn theo vùng.

**Tạo file VCF kiểm tra:**

```bash
# Create test directory
mkdir -p ~/genomics-test && cd ~/genomics-test

# Create test VCF
cat > test.vcf << 'EOF'
##fileformat=VCFv4.2
##INFO=<ID=DP,Number=1,Type=Integer,Description="Total read depth">
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	sample1	sample2
chr1	10000	.	A	G	60	.	DP=100	GT	0/1	1/1
chr1	20000	.	C	T	50	.	DP=80	GT	0/0	0/1
chr1	30000	.	G	A	70	.	DP=120	GT	1/1	0/1
chr1	100000	.	T	C	55	.	DP=90	GT	0/1	0/0
EOF

# Compress and index (requires bgzip and tabix from pixi)
pixi run bgzip -f test.vcf
pixi run tabix -p vcf test.vcf.gz
```

**Kiểm tra truy vấn vùng với bcftools:**

```bash
# Query specific region
pixi run bcftools view test.vcf.gz chr1:1-50000

# Extract specific samples
pixi run bcftools view -s sample1 test.vcf.gz chr1:10000-50000

# Count variants in region
pixi run bcftools view -H test.vcf.gz chr1:1-100000 | wc -l
```

**Tạo và kiểm tra file BAM:**

```bash
# Create test SAM file
cat > test.sam << 'EOF'
@HD	VN:1.0	SO:coordinate
@SQ	SN:chr1	LN:1000000
read1	0	chr1	100	60	10M	*	0	0	ACGTACGTAC	IIIIIIIIII
read2	0	chr1	120	60	10M	*	0	0	TGCATGCATG	IIIIIIIIII
read3	0	chr1	50000	60	10M	*	0	0	AAAAAAAAAA	IIIIIIIIII
read4	0	chr1	100000	60	10M	*	0	0	TTTTTTTTTT	IIIIIIIIII
EOF

# Convert to BAM and index
pixi run samtools view -b test.sam -o test.bam
pixi run samtools index test.bam
```

**Kiểm tra truy vấn vùng với samtools:**

```bash
# View reads in region
pixi run samtools view test.bam chr1:1-60000

# Count reads in region
pixi run samtools view -c test.bam chr1:1-60000

# Extract region to new file
pixi run samtools view -b test.bam chr1:50000-100000 -o region.bam
```

Khi đã quen với file cục bộ, cùng những lệnh đó hoạt động với URL từ xa S3, FTP hoặc HTTPS; chỉ cần thay tên file cục bộ bằng URL từ xa.

## 6. Workflow và công thức phổ biến

### 6.1 Trích biến thể cho gen cụ thể

```bash
# Define gene regions (example: gene1, gene2)
cat > genes.bed << 'EOF'
1	11869	14409	DDX11L1
1	17369	17436	MIR6859-1
EOF

# Extract variants from remote file for gene regions
bcftools view \
  s3://my-bucket/variants.vcf.gz \
  -R genes.bed \
  -O v -o local_genes.vcf

# Compress and index
bgzip -f local_genes.vcf
tabix -p vcf local_genes.vcf.gz
```

### 6.2 So sánh mẫu giữa các file từ xa

```bash
# Compare variants for two samples in different S3 files
bcftools isec \
  <(bcftools view -s sample1 s3://bucket1/variants.vcf.gz) \
  <(bcftools view -s sample2 s3://bucket2/variants.vcf.gz) \
  -p comparison_output

# Shows shared and unique variants
ls comparison_output/
```

### 6.3 Annotate VCF từ xa với annotation từ xa

```bash
# Annotate S3-hosted VCF using FTP-hosted annotation file
bcftools annotate \
  s3://my-bucket/variants.vcf.gz \
  -a ftp://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/common_all.vcf.gz \
  -c ID \
  -O v -o annotated.vcf
```

### 6.4 Trích vùng BAM cho nhiều mẫu

```bash
# Create list of regions
cat > regions.txt << 'EOF'
chr1:1-1000000
chr2:2000000-3000000
chr3:5000000-6000000
EOF

# Extract each region from remote BAM, save locally
while read region; do
  samtools view \
    s3://my-bucket/aligned.bam \
    $region \
    -b -o ${region//:/_}.bam
  samtools index ${region//:/_}.bam
done < regions.txt
```

### 6.5 Stream xử lý không cần lưu cục bộ

```bash
# Pipe remote data through multiple tools
bcftools view s3://my-bucket/variants.vcf.gz chr1:1-1000000 \
  | bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\t%AC\t%AF\n' \
  | awk '$6 > 0.05' \
  | tee filtered_variants.tsv \
  | wc -l
```

## 7. Xử lý sự cố và tối ưu

### 7.1 Vấn đề thường gặp

**Vấn đề**: lỗi "File not found" hoặc 404
- **Giải pháp**: xác minh tên bucket S3, đường dẫn và quyền file. Kiểm tra bằng AWS CLI:
  ```bash
  aws s3 ls s3://bucket-name/path/file.vcf.gz
  ```

**Vấn đề**: xác thực S3 thất bại
- **Giải pháp**: kiểm tra thông tin xác thực AWS:
  ```bash
  aws sts get-caller-identity
  ```

**Vấn đề**: không tìm thấy chỉ mục (thiếu `.tbi` hoặc `.bai`)
- **Giải pháp**: tạo chỉ mục hoặc xác minh chúng có trên server từ xa:
  ```bash
  aws s3 ls s3://bucket-name/file.vcf.gz.tbi
  ```

**Vấn đề**: "Connection timeout" trên FTP
- **Giải pháp**: tăng timeout và thử lại:
  ```bash
  export CURL_CONNECT_TIMEOUT=60
  export CURL_TIMEOUT=120
  ```

**Vấn đề**: lỗi chứng chỉ SSL trên HTTPS
- **Giải pháp**: xác minh tính hợp lệ của chứng chỉ hoặc tạm thời tắt xác minh khi kiểm thử:
  ```bash
  curl -k https://endpoint.com/file.vcf.gz.tbi  # -k disables cert verification
  ```

### 7.2 Mẹo tối ưu

**Với truy cập S3**:
- Dùng S3 Transfer Acceleration nếu có để tải nhanh hơn
- Đặt tài nguyên tính toán cùng vùng AWS với dữ liệu
- Dùng VPC endpoint để tránh phí Internet Gateway:
  ```bash
  # VPC endpoint for S3 (no data transfer charges within VPC)
  s3://bucket-name/key
  ```

**Với truy vấn theo lô lớn**:
- Sắp xếp các yêu cầu theo nhiễm sắc thể để cache tốt hơn
- Cân nhắc tải một lần tập con của cả nhiễm sắc thể, rồi truy vấn cục bộ:
  ```bash
  bcftools view s3://bucket/variants.vcf.gz chr1 -o chr1.vcf.gz
  bcftools index chr1.vcf.gz
  # Then query locally multiple times
  ```

**Với hiệu năng FTP**:
- Gộp nhiều truy vấn khi có thể
- Kiểm tra thiết lập nén phía server
- Cân nhắc dịch vụ mirror/rsync cho dữ liệu truy cập thường xuyên

### 7.3 Debug bằng output verbose

```bash
# Enable verbose output for debugging
export HTS_LOG_LEVEL=debug

# Check curl verbose output
export CURL_VERBOSE=1
```

## 8. Tóm tắt và những điểm chính

### 8.1 Những gì đã trình bày

- **Hỗ trợ giao thức**: công cụ HTSlib hỗ trợ truy cập file từ xa S3, FTP và HTTPS một cách gốc
- **Xác thực**: mỗi giao thức có cơ chế xác thực khác nhau (thông tin xác thực AWS, FTP user:pass, Bearer token)
- **Truy vấn hiệu quả**: file có chỉ mục cho phép yêu cầu byte-range, chỉ tải dữ liệu cần thiết
- **Workflow thực tế**: các tác vụ phổ biến như trích vùng, so sánh mẫu và annotation dùng file từ xa
- **Xử lý sự cố**: cách chẩn đoán và giải quyết các vấn đề truy cập file từ xa thường gặp

### 8.2 Những điểm chính

1. **Luôn dùng chỉ mục** cho file từ xa để tránh tải toàn bộ tập dữ liệu
2. **Chọn đúng giao thức**: S3 cho AWS, FTP cho repository công khai, HTTPS cho API
3. **Thiết lập xác thực đúng** để tránh lỗi kết nối lặp lại
4. **Stream xử lý** giúp giảm yêu cầu lưu trữ cục bộ cho tập dữ liệu lớn
5. **Xác minh chỉ mục tồn tại** trên server từ xa trước khi truy vấn
6. **Tối ưu theo vùng**: đặt tính toán gần dữ liệu, gộp các truy vấn tương tự, dùng timeout phù hợp

### 8.3 Workflow tham chiếu nhanh

**Thiết lập (một lần):**

```bash
# Create project directory
mkdir -p ~/genomics-work && cd ~/genomics-work

# Initialize Pixi with conda-forge and bioconda
pixi init --channel conda-forge --channel bioconda .

# Add tools
pixi add bcftools samtools

# Verify installation
pixi run bcftools --version
pixi run samtools --version
```

**Dùng file từ xa:**

```bash
# 1. Set up authentication (optional, for private buckets)
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_DEFAULT_REGION="us-east-1"

# 2. Query real remote file (NCBI dbSNP via HTTPS - no auth needed)
pixi run bcftools view \
  https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz \
  | pixi run bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\n' \
  | head -20

# 3. Or for your own S3 data:
pixi run bcftools view s3://my-bucket/variants.vcf.gz chr1:1-1000000 -O v -o chr1_subset.vcf

# 4. Create local index for repeated use
pixi run bgzip -f chr1_subset.vcf
pixi run tabix -p vcf chr1_subset.vcf.gz
```

### 8.4 Bước tiếp theo

- **Khám phá dữ liệu**: bắt đầu với truy vấn vùng nhỏ để kiểm tra thiết lập
- **Tự động hoá workflow**: tạo script cho các tác vụ trích xuất và annotation phổ biến
- **Mở rộng**: dùng Nextflow hoặc workflow manager tương tự để xử lý nhiều file
- **Theo dõi chi phí**: theo dõi chi phí truyền dữ liệu và yêu cầu S3 nếu dùng cloud storage

## Tài liệu tham khảo

- Tài liệu HTSlib: [htslib.org/doc](https://www.htslib.org/doc/)
- Manual bcftools: [htslib.org/doc/bcftools.html](https://www.htslib.org/doc/bcftools.html)
- Manual samtools: [htslib.org/doc/samtools.html](https://www.htslib.org/doc/samtools.html)
- tabix và bgzip: [htslib.org/doc/tabix.html](https://www.htslib.org/doc/tabix.html)
- NCBI dbSNP: [ncbi.nlm.nih.gov/snp](https://www.ncbi.nlm.nih.gov/snp/)
- 1000 Genomes Project: [internationalgenome.org](https://www.internationalgenome.org/)
- Ensembl: [ensembl.org](https://www.ensembl.org/)
- Pixi: [pixi.sh](https://pixi.sh)
