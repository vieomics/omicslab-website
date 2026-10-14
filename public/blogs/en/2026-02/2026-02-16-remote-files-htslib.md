---
slug: remote-files-htslib-bcftools-samtools
title: "Working with remote files using bcftools and samtools (HTSlib)"
description: "How HTSlib-based tools query genomic data on S3, FTP, and HTTPS through indexed byte-range requests, with authentication, indexing, and practical workflows."
authors: [vieomics]
tags: [bioinformatics, htslib, bcftools, samtools, s3, remote-files, cloud, genomics]
image: ./imgs/remote-files-htslib-bcftools-samtools.png
---

HTSlib-based tools such as `bcftools` and `samtools` can work with genomic data stored on remote servers. Whether the data is in AWS S3, available over FTP, or hosted on HTTPS endpoints, these tools can query and subset remote files without downloading entire datasets. This guide covers authentication, remote file access patterns, and practical workflows.

<!--truncate-->

## 1. How HTSlib handles remote files with random access

HTSlib is a C library that powers many genomic tools. Tools built on HTSlib — including `bcftools`, `samtools`, `tabix`, and others — inherit native support for **remote file access via random-access queries**. This section explains how HTSlib works with remote files and which protocols are supported.

### 1.1 Random access mechanism

HTSlib enables efficient remote file access through a **byte-range request mechanism**. Instead of downloading entire files, it uses file indexes to determine exact byte positions and requests only those bytes from the remote server.

**How it works:**

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

**Critical requirement: indexed files** (`.tbi`, `.bai`, `.csi`)
- Without an index: the entire file must be downloaded from the start (which fails or is impractical on large files)
- With an index: only the necessary bytes are downloaded

### 1.2 All supported URL schemes

HTSlib supports a list of protocols via `libcurl`. Check your installation:

```bash
# View all supported protocols
pixi run samtools --version 2>&1 | grep -A 20 "HTSlib URL"
```

**Complete output example:**

```
HTSlib URL scheme handlers present:
    built-in:        file, preload, data
    Google Cloud:    gs+http, gs+https, gs
    libcurl:         gophers, smtp, wss, smb, rtsp, tftp, pop3, smbs, imaps, pop3s, ws, ftps, ftp, gopher, imap, http, https, sftp, smtps, scp, dict, mqtt, telnet
    Amazon S3:       s3+https, s3, s3+http
    crypt4gh:        crypt4gh
    mem:             mem
```

**Protocol categories:**

| Category          | Protocols                       | Typical Use               |
| ----------------- | ------------------------------- | ------------------------- |
| **Built-in**      | file, preload, data             | Local files, pipes        |
| **Cloud Storage** | s3://, gs://                    | AWS, Google Cloud         |
| **HTTP-based**    | http://, https://, ftps://      | Web servers, FTP over SSL |
| **Other**         | ftp://, sftp://, scp://, smb:// | Traditional file servers  |
| **Specialized**   | mqtt, dict, imap, etc           | Not typical for genomics  |

**Note on protocol coverage:** this post focuses on the most common protocols for bioinformatics: **S3, HTTPS, FTP, and GCS**. Many other protocols are available but are used less often for genomic data.

### 1.3 Protocols covered in this post

The following protocols are widely used for storing and accessing genomic data.

#### S3 (Amazon S3 and compatible)
- **URL scheme**: `s3://bucket-name/path/file.vcf.gz`
- **Use case**: cloud-based genomic repositories, AWS-hosted data
- **Random access**: via byte-range requests, AWS SDK for auth
- **Speed**: typically the fastest for indexed queries
- **See section**: 2 - S3 remote file access

#### HTTPS (web servers)
- **URL scheme**: `https://server.com/path/file.vcf.gz`
- **Use case**: public databases (NCBI, Ensembl), institutional servers
- **Random access**: via HTTP Range header (206 Partial Content)
- **Speed**: fast for indexed queries
- **See section**: 4 - HTTPS remote file access

#### FTP (File Transfer Protocol)
- **URL scheme**: `ftp://server.com/path/file.vcf.gz`
- **Use case**: legacy databases, some public repositories
- **Random access**: via FTP REST command for seeking
- **Speed**: slower than S3/HTTPS for indexed queries
- **See section**: 3 - FTP remote file access

#### GCS (Google Cloud Storage)
- **URL scheme**: `gs://bucket-name/path/file.vcf.gz`
- **Use case**: Google Cloud-hosted genomic data
- **Random access**: similar to S3 (byte-range requests)
- **Speed**: fast for indexed queries
- **Note**: requires Google Cloud SDK credentials

### 1.4 Key advantages of remote access

- **Avoid large downloads**: query specific regions without transferring entire files
- **Cost efficiency**: transfer only the data you access
- **Scalability**: work with datasets larger than local disk space
- **Collaboration**: reference shared datasets directly without copying
- **Real-time access**: always work with the latest version of the data

### 1.5 Performance considerations: why indexes matter

Remote file access requires indexed files for efficient region-based queries:
- **VCF files**: must have a `.vcf.gz.tbi` index
- **BAM files**: must have a `.bam.bai` index
- **BCF files**: must have a `.bcf.csi` index

**Bandwidth comparison for querying chr1:1-100000 from a 1GB VCF file:**

| Scenario               | Bytes Transferred | Time          | Method              |
| ---------------------- | ----------------- | ------------- | ------------------- |
| **Indexed S3**         | ~700KB            | <1 second     | Byte-range request  |
| **Indexed HTTPS**      | ~700KB            | 1-2 seconds   | HTTP Range header   |
| **Indexed FTP**        | ~700KB            | 3-5 seconds   | FTP REST seek       |
| **Unindexed remote**   | 1000MB+           | 5-30 minutes  | Sequential download |
| **Local indexed file** | ~700KB            | <0.5 seconds  | Direct file seek    |

**Key insight**: indexed remote access transfers a small fraction of the file size.

### 1.6 Setting up bcftools and samtools with Pixi

One way to install bcftools and samtools with remote file support is using Pixi with the `conda-forge` and `bioconda` channels. These channels include pre-compiled binaries with S3, FTP, and HTTPS support enabled in HTSlib.

#### Installation steps

Create a new directory for the project and initialize a Pixi environment:

```bash
# Create project directory
mkdir -p ~/htslib-project && cd ~/htslib-project

# Initialize Pixi with conda-forge and bioconda channels
pixi init --channel conda-forge --channel bioconda .

# Add bcftools and samtools
pixi add bcftools samtools
```

This creates a `pixi.toml` file:

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

#### Verify installation

```bash
# Run bcftools version
pixi run bcftools --version

# Run samtools version
pixi run samtools --version
```

Both tools report HTSlib features including S3, GCS, and libcurl support:

```
bcftools 1.23
Using htslib 1.23
...

Samtools 1.23
...
HTSlib compilation details:
    Features:       build=configure libcurl=yes S3=yes GCS=yes ...
```

The key line is `S3=yes`, which indicates S3 support is enabled.

#### Why Pixi for remote file access?

- **Pre-compiled with remote support**: Bioconda packages include HTSlib compiled with libcurl, S3, and GCS support
- **Easy dependency management**: required libraries are included automatically
- **Reproducible environments**: `pixi.lock` pins the same versions across machines
- **No system-wide installation**: tools stay isolated in the project environment

### 1.7 Protocol verification: HTTP Range requests

For HTTPS/HTTP remote access to work efficiently, the server must support HTTP Range Requests. Verify this before relying on remote queries:

```bash
# Test if server supports Range Requests
curl -I -H "Range: bytes=0-500" https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz

# Expected response: HTTP/1.1 206 Partial Content
# This means byte-range requests work! ✓
```

Response headers will show:

```
HTTP/1.1 206 Partial Content      ← supports Range requests
Accept-Ranges: bytes              ← confirms support
Content-Length: 501               ← returns partial content
```

## 2. S3 remote file access

AWS S3 is a common repository for genomic datasets. HTSlib supports S3 through the `s3://` protocol.

### 2.1 S3 authentication

#### Using AWS credentials

Set AWS credentials as environment variables:

```bash
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_DEFAULT_REGION="us-east-1"
```

#### Using AWS IAM roles (EC2 instances)

If running on EC2 with an IAM role attached, HTSlib uses the role's credentials automatically; no environment variables are needed.

#### Using AWS CLI configuration

HTSlib respects `~/.aws/credentials` and `~/.aws/config`:

```bash
aws configure  # Interactive setup
```

### 2.2 Querying S3-hosted VCF files

Query a specific genomic region from a remote VCF file:

```bash
# Query chromosome 1, positions 1-1000000
bcftools view s3://my-bucket/data/variants.vcf.gz chr1:1-1000000

# Count variants in a region
bcftools view -H s3://my-bucket/data/variants.vcf.gz chr1:1-1000000 | wc -l

# Extract samples and subset to region
bcftools view -s sample1,sample2 s3://my-bucket/data/variants.vcf.gz chr1:1-1000000 -O v
```

### 2.3 Querying S3-hosted BAM files

Extract reads from specific genomic regions:

```bash
# Query region from remote BAM
samtools view s3://my-bucket/data/aligned.bam chr1:1-1000000

# Count reads in region
samtools view -c s3://my-bucket/data/aligned.bam chr1:1-1000000

# Extract to local BAM file
samtools view -b s3://my-bucket/data/aligned.bam chr1:1-1000000 -o region.bam
```

### 2.4 Region-based subsetting workflow

An efficient workflow for extracting subsets from S3:

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

### 2.5 Working with public genomic data

Public genomic repositories are useful for testing remote file access. While S3 is available, HTTPS endpoints are often more reliable for quick testing.

**Query NCBI dbSNP data via HTTPS:**

NCBI provides public access to common variants. Test with real data:

```bash
# Query NCBI dbSNP common variants (via HTTPS)
pixi run bcftools view \
  https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz \
  | pixi run bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\n' \
  | head -20
```

Expected output showing real variants:

```
1	10177	A	AC
1	10352	T	TA
1	10352	T	TA
1	10616	CCGCCGTTGCAAAGGCGCGCCG	C
1	10642	G	A
1	11008	C	G
1	11012	C	G
```

**Discover available files:**

```bash
# List NCBI FTP VCF files
curl -s https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/ \
  | grep -i ".vcf.gz\"" | grep -o "href=\"[^\"]*\"" | cut -d'"' -f2

# Or for 1000 Genomes in S3:
aws s3 ls s3://1000genomes/phase3/data/ --no-sign-request | head -20
```

**Region-based queries (with indexed files):**

```bash
# Query specific chromosome region
# Note: Requires .tbi index at the remote location
pixi run bcftools view \
  https://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/00-common_all.vcf.gz \
  chr1:1000000-2000000
```

**Note on S3 vs HTTPS:**
- **HTTPS** (like NCBI): reliable, requires no credentials for public data
- **S3**: fastest for large datasets, requires AWS credentials or a public bucket setup
- **FTP**: an alternative for some repositories, generally slower than HTTPS

## 3. FTP remote file access

FTP servers host many public genomic datasets. HTSlib supports the `ftp://` protocol.

### 3.1 FTP authentication

#### Anonymous access

Many public repositories allow anonymous FTP:

```bash
# No credentials needed
bcftools view ftp://ftp.ncbi.nlm.nih.gov/genomes/H_sapiens/VCF/common_all.vcf.gz chr1:1-1000000
```

#### Authenticated FTP

For private FTP servers, include credentials in the URL:

```bash
bcftools view ftp://username:password@ftp.example.com/data/variants.vcf.gz chr1:1-1000000
```

**Security note**: credentials embedded in a URL are visible in process listings. Prefer environment variables:

```bash
export FTP_USER="your_username"
export FTP_PASSWORD="your_password"

# HTSlib will use these automatically
bcftools view ftp://ftp.example.com/data/variants.vcf.gz chr1:1-1000000
```

### 3.2 Querying FTP-hosted files

Common public genomic repositories accessible via FTP:

#### NCBI FTP repository

```bash
# Query NCBI's common variants file
bcftools view \
  ftp://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/common_all.vcf.gz \
  chr1:1-1000000 \
  | bcftools query -f '%CHROM\t%POS\t%AC\t%AF\n' \
  | head -10
```

#### Ensembl FTP repository

```bash
# Query Ensembl VCF (example path)
bcftools view \
  ftp://ftp.ensembl.org/pub/data_files/homo_sapiens/VEP/Homo_sapiens_phenotypes_associated_variants-GRCh38.vcf.gz \
  1:1-1000000

# List available Ensembl files
ftp ftp.ensembl.org  # Interactive FTP session
```

### 3.3 FTP performance tips

- **Network stability**: FTP can be slower than HTTPS for single queries. Consider batch processing.
- **Index availability**: verify that `.tbi` or `.csi` indexes are present on the FTP server for efficient region queries.
- **Timeout handling**: set timeout environment variables for unreliable connections:

```bash
export CURL_CONNECT_TIMEOUT=30
export CURL_TIMEOUT=60
```

## 4. HTTPS remote file access

HTTPS endpoints often require token-based authentication and are increasingly common for cloud-hosted data.

### 4.1 HTTPS authentication methods

#### Bearer token authentication

For endpoints that accept Bearer tokens (common on cloud platforms):

```bash
# Option 1: Set environment variable
export HTTPS_AUTH_BEARER="your_bearer_token"
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000

# Option 2: Pass in URL (less secure)
bcftools view https://token:your_bearer_token@api.example.com/data/variants.vcf.gz chr1:1-1000000
```

#### API keys in headers

For services requiring custom headers, use `curl` with process substitution:

```bash
# Create a wrapper using curl and process substitution
bcftools view \
  <(curl -H "Authorization: Bearer TOKEN" \
     https://api.example.com/data/variants.vcf.gz \
     --output - ) \
  chr1:1-1000000
```

#### Basic HTTP authentication

```bash
# URL-embedded credentials (not recommended for security)
bcftools view https://username:password@secure.example.com/data/variants.vcf.gz chr1:1-1000000
```

### 4.2 Practical HTTPS workflows

#### Query public HTTPS-hosted data

Many databases provide HTTPS access to genomic data:

```bash
# Example: Query genome annotation from HTTPS endpoint
bcftools view https://example.genomics.org/public/variants.vcf.gz chr1:1-1000000

# Extract specific information
bcftools view https://example.genomics.org/public/variants.vcf.gz chr1:1-1000000 \
  | bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\t%AC\n'
```

#### Download indexed files locally

For repeated queries, consider caching indexes locally:

```bash
# Download index file (small, fast)
curl -o variants.vcf.gz.tbi https://api.example.com/data/variants.vcf.gz.tbi

# Query still uses remote file but with local index knowledge
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000
```

### 4.3 SSL/TLS certificate issues

If you encounter certificate validation errors:

```bash
# Disable certificate verification (use cautiously)
export SSL_NO_VERIFY=1
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000

# Or use curl environment variable
export CURL_CA_BUNDLE=""
bcftools view https://api.example.com/data/variants.vcf.gz chr1:1-1000000
```

**Security note**: only disable certificate verification for trusted internal endpoints or testing.

## 5. Indexing and efficient region queries

Efficient remote file access depends on proper indexing. HTSlib tools use byte-range requests to fetch only the necessary data.

### 5.1 Creating indexes

#### Create a tabix index for VCF files

```bash
# For bgzip-compressed VCF files
tabix -p vcf variants.vcf.gz

# Verify index
ls -lh variants.vcf.gz*
```

#### Create a CSI index for BCF files

```bash
# CSI indexes support larger files and datasets
bcftools index -c variants.bcf

# Verify index
ls -lh variants.bcf.csi
```

#### Create a BAI index for BAM files

```bash
# Standard BAM indexing
samtools index aligned.bam

# Creates aligned.bam.bai
ls -lh aligned.bam.bai
```

### 5.2 Verifying index integrity

```bash
# Check if VCF index is valid
tabix -l variants.vcf.gz | head -10

# Query a specific region (tests index)
bcftools view variants.vcf.gz chr1:1-1000 -H | wc -l
```

### 5.3 Performance: indexed vs unindexed remote access

**Indexed remote access** (with a region query):
- Seeks to the file index
- Downloads the byte range containing the target region
- Returns ~100KB-1MB of data

**Unindexed remote access**:
- Must scan the entire file sequentially
- Downloads the entire file
- Returns all data (which can be GB-sized)

Example performance comparison:

```bash
# Indexed query (fast, ~1-5 seconds)
time bcftools view s3://my-bucket/variants.vcf.gz chr1:1-1000000 > /dev/null

# Without index (very slow, minutes or fails)
# HTSlib automatically uses index if available, so explicitly avoid it only if needed
```

### 5.4 Testing remote file access with local files

Before working with remote files, it helps to test bcftools and samtools locally. The workflow below verifies the installation and practices region queries.

**Create a test VCF file:**

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

**Test bcftools region queries:**

```bash
# Query specific region
pixi run bcftools view test.vcf.gz chr1:1-50000

# Extract specific samples
pixi run bcftools view -s sample1 test.vcf.gz chr1:10000-50000

# Count variants in region
pixi run bcftools view -H test.vcf.gz chr1:1-100000 | wc -l
```

**Create and test a BAM file:**

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

**Test samtools region queries:**

```bash
# View reads in region
pixi run samtools view test.bam chr1:1-60000

# Count reads in region
pixi run samtools view -c test.bam chr1:1-60000

# Extract region to new file
pixi run samtools view -b test.bam chr1:50000-100000 -o region.bam
```

Once comfortable with local files, the same commands work with remote S3, FTP, or HTTPS URLs; replace the local filenames with remote URLs.

## 6. Common workflows and recipes

### 6.1 Extract variants for specific genes

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

### 6.2 Compare samples across remote files

```bash
# Compare variants for two samples in different S3 files
bcftools isec \
  <(bcftools view -s sample1 s3://bucket1/variants.vcf.gz) \
  <(bcftools view -s sample2 s3://bucket2/variants.vcf.gz) \
  -p comparison_output

# Shows shared and unique variants
ls comparison_output/
```

### 6.3 Annotate a remote VCF with remote annotations

```bash
# Annotate S3-hosted VCF using FTP-hosted annotation file
bcftools annotate \
  s3://my-bucket/variants.vcf.gz \
  -a ftp://ftp.ncbi.nlm.nih.gov/snp/organisms/human_9606_b150_GRCh37p13/VCF/common_all.vcf.gz \
  -c ID \
  -O v -o annotated.vcf
```

### 6.4 Extract BAM regions for multiple samples

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

### 6.5 Stream processing without local storage

```bash
# Pipe remote data through multiple tools
bcftools view s3://my-bucket/variants.vcf.gz chr1:1-1000000 \
  | bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\t%AC\t%AF\n' \
  | awk '$6 > 0.05' \
  | tee filtered_variants.tsv \
  | wc -l
```

## 7. Troubleshooting and optimization

### 7.1 Common issues

**Issue**: "File not found" or 404 errors
- **Solution**: verify the S3 bucket name, path, and file permissions. Test with the AWS CLI:
  ```bash
  aws s3 ls s3://bucket-name/path/file.vcf.gz
  ```

**Issue**: authentication failures with S3
- **Solution**: verify AWS credentials:
  ```bash
  aws sts get-caller-identity
  ```

**Issue**: index not found (`.tbi` or `.bai` missing)
- **Solution**: create indexes or verify they exist on the remote server:
  ```bash
  aws s3 ls s3://bucket-name/file.vcf.gz.tbi
  ```

**Issue**: "Connection timeout" on FTP
- **Solution**: increase the timeout and try again:
  ```bash
  export CURL_CONNECT_TIMEOUT=60
  export CURL_TIMEOUT=120
  ```

**Issue**: HTTPS SSL certificate errors
- **Solution**: verify certificate validity or temporarily disable verification for testing:
  ```bash
  curl -k https://endpoint.com/file.vcf.gz.tbi  # -k disables cert verification
  ```

### 7.2 Optimization tips

**For S3 access**:
- Use S3 Transfer Acceleration if available for faster downloads
- Place compute resources in the same AWS region as the data
- Use VPC endpoints to avoid Internet Gateway charges:
  ```bash
  # VPC endpoint for S3 (no data transfer charges within VPC)
  s3://bucket-name/key
  ```

**For large batch queries**:
- Sort region requests by chromosome for better caching
- Consider downloading an entire chromosome subset once, then querying locally:
  ```bash
  bcftools view s3://bucket/variants.vcf.gz chr1 -o chr1.vcf.gz
  bcftools index chr1.vcf.gz
  # Then query locally multiple times
  ```

**For FTP performance**:
- Batch multiple queries when possible
- Check server-side compression settings
- Consider mirror/rsync services for frequently accessed data

### 7.3 Debugging with verbose output

```bash
# Enable verbose output for debugging
export HTS_LOG_LEVEL=debug

# Check curl verbose output
export CURL_VERBOSE=1
```

## 8. Recap and key takeaways

### 8.1 What this post covered

- **Protocol support**: HTSlib tools support S3, FTP, and HTTPS remote file access natively
- **Authentication**: each protocol has different auth mechanisms (AWS credentials, FTP user:pass, Bearer tokens)
- **Efficient queries**: indexed files enable byte-range requests, downloading only the necessary data
- **Practical workflows**: common tasks such as region extraction, sample comparison, and annotation using remote files
- **Troubleshooting**: how to diagnose and resolve common remote file access issues

### 8.2 Key takeaways

1. **Always use indexes** for remote files to avoid downloading entire datasets
2. **Choose the right protocol**: S3 for AWS, FTP for public repositories, HTTPS for APIs
3. **Set up authentication correctly** to avoid repeated connection failures
4. **Stream processing** reduces local storage requirements for large datasets
5. **Verify indexes exist** on remote servers before querying
6. **Optimize by region**: place compute near the data, batch similar queries, use appropriate timeouts

### 8.3 Quick reference workflow

**Setup (one time):**

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

**Using remote files:**

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

### 8.4 Next steps

- **Explore your data**: start with small region queries to test the setup
- **Automate workflows**: create scripts for common extraction and annotation tasks
- **Scale up**: use Nextflow or a similar workflow manager for processing multiple files
- **Monitor costs**: track S3 data transfer and request costs if using cloud storage

## References

- HTSlib documentation: [htslib.org/doc](https://www.htslib.org/doc/)
- bcftools manual: [htslib.org/doc/bcftools.html](https://www.htslib.org/doc/bcftools.html)
- samtools manual: [htslib.org/doc/samtools.html](https://www.htslib.org/doc/samtools.html)
- tabix and bgzip: [htslib.org/doc/tabix.html](https://www.htslib.org/doc/tabix.html)
- NCBI dbSNP: [ncbi.nlm.nih.gov/snp](https://www.ncbi.nlm.nih.gov/snp/)
- 1000 Genomes Project: [internationalgenome.org](https://www.internationalgenome.org/)
- Ensembl: [ensembl.org](https://www.ensembl.org/)
- Pixi: [pixi.sh](https://pixi.sh)
