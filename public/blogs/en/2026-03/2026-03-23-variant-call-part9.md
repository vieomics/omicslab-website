---
slug: storage-cost-optimization-cram-format
title: "Variant Calling (Part 9): Storage Cost Optimization with the CRAM Format"
description: "How CRAM reference-based compression reduced alignment storage by about 45% versus BAM in our chr22 subset, and how the germline pipeline produces both BAM and CRAM outputs."
series: Variant Calling from Bash to Production
seriesOrder: 9
authors: [vieomics]
tags: [nextflow, variant-calling, storage, cram, cost-optimization, bioinformatics]
image: ./imgs/storage-cost-optimization-cram-format.png
---

Whole Genome Sequencing (WGS) projects generate large amounts of data. While analysis costs are significant, storage costs often become the dominant expense over time. The challenge is to preserve raw data and alignments for potential re-analysis with new tools without paying for unlimited storage. This post looks at how the CRAM format helps: in our chr22 subset it reduced alignment storage by about 45% compared with BAM, while keeping lossless compression and the ability to re-align. On the newer version, [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling) supports CRAM output for lower storage cost and easier re-analysis.

<!--truncate-->

:::tip

- The environment setups and scripts are uploaded to [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
- Clone the repository with tag **0.7.0** to reproduce the contents of this post
  :::

## Series Overview

- **[Part 1](/en/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: A bash germline pipeline managed with Pixi
- **[Part 2](/en/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Validating the bash workflow
- **[Part 3](/en/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: From bash to Nextflow
- **[Part 4](/en/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Containerized execution and reproducibility
- **[Part 5](/en/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmarking germline variant calling with nf-core/sarek
- **[Part 6](/en/blogs/gatk-variant-calling-production-slurm-optimization-part6)**: Do we need a complex pipeline for high-quality variant calling?
- **[Part 7](/en/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Variant annotation with SnpEff and Ensembl VEP
- **[Part 8](/en/blogs/gatk-variant-calling-production-slurm-optimization-part8)**: Structural variant calling — a short-read benchmark
- **Part 9 (This Post)**: Storage cost optimization with CRAM
- **[Part 10](/en/blogs/structural-variant-calling-short-reads-challenges)**: The challenges of SV calling with short reads
- **[Part 11](/en/blogs/gvcf-population-scale-genotyping)**: Population-scale genotyping with gVCF

Clone the repository:

```bash
# clone and run the new workflow version with cram file output support, removing intermediate files
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.7.0
cd nf-germline-short-read-variant-calling
make test-e2e
```

The new output folder is organized with the CRAM files placed in the alignment folder:

```bash
# the output folder
├── alignment
│   └── sample1
│       ├── sample1_merged.cram
│       └── sample1_merged.cram.crai
```

## 1. Understanding Genomic Data Formats

### 1.1. FASTQ Files (Raw Sequencing Reads)

FASTQ files contain raw sequencing reads with quality scores. They are the initial output from sequencers such as Illumina instruments.

**Characteristics:**

- **Unaligned** reads (no genomic coordinates)
- Paired-end format (R1 and R2 files)
- Gzip compressed
- Contains quality information for each base
- Typically 30-100 GB per sample (for 30X WGS)

**Test Data Example (chr22 subset):**

```
sample1_R1.fastq.gz: 37 MB
sample1_R2.fastq.gz: 37 MB
Total per sample: 74 MB
```

**Advantages:**

- Raw data preservation - can realign with any tool/reference
- No information loss
- Independent of reference genome

**Disadvantages:**

- Largest file size (unmapped reads are inefficient)
- Must be re-aligned for any analysis
- Requires substantial storage and transfer bandwidth

### 1.2. BAM Files (Binary Alignment Format)

BAM files contain aligned reads with genomic coordinates. They are the standard output from aligners such as BWA-MEM2.

**File Content:**

- Each read record contains: sequence name, quality scores, alignment information (chromosome, position, CIGAR string for alignment details)
- Full read sequences are stored explicitly in the file
- All reads are stored in binary format with standard compression (deflate)
- For matching reads (reads that align to reference), the entire sequence is still stored

**Real-World BAM Example (SAM text format for readability):**

```
HISEQ1:18:H8VC6ADXX:1:2203:4067:21293   163     chr22   11016745        8       148M    =       11017040        443
TTAATGTATTGCTTAAAGGTTTGCTAGCATTTTGTTGAGGATTTTTGCATCAATATTAATTGGAGATATTGTAGTTTTCTTTTTTTAAAGTGTCTTTGATTTTGGTATAAAGGTAATTCTGGTGTTATAGAATGAGTTTGGAAGTATT
CC@FFFFFHHHHHJJJJJJCHIJJJJJJJIJJJJIJIFIJGHJJJJJJIJIJIIIJIJJIIIJBGFHIIJJGHIJJJJIJJJHHFDACDDCCEEDDDDCDDACCDACDDEEDDCDCDEDDDDDDDDDEEDCDDDCDDEDDDDDDCDDE
NM:i:0  MD:Z:148        MC:Z:148M      AS:i:148 XS:i:143        XA:Z:chr22,-17016043,148M,1;    RG:Z:sample1_1
```

**Breakdown of this read:**

- **Read ID:** `HISEQ1:18:H8VC6ADXX:1:2203:4067:21293` - unique identifier
- **FLAG:** `163` - paired-end, proper pair alignment
- **Chromosome:** `chr22`
- **Position:** `11016745` - genomic coordinate on chr22
- **MAPQ:** `8` - mapping quality
- **CIGAR:** `148M` - all 148 bases matched reference
- **Sequence:** Full 148-base sequence stored (165 characters)
- **Quality:** Quality score for each base (165 characters)
- **Optional tags:** `NM:i:0` (0 mismatches), `MD:Z:148` (148 exact matches), etc.

**Key Point:** The complete 148-base sequence is stored in full, even though it matches the reference perfectly (NM:i:0 = zero mismatches).

**Characteristics:**

- **Aligned** reads with genomic coordinates
- Coordinate-sorted format for efficient access
- Binary format (more compact than SAM)
- Indexed (`.bai` file) for random access
- Compatible with all bioinformatics tools

**Test Data Example (chr22 subset):**

After BWA-MEM2 alignment:

```
sample1_aligned.bam: 74 MB (unsorted, same size as FASTQ)
```

After coordinate sorting:

```
sample1_sorted.bam: 51 MB (31% reduction from unsorted)
```

**Advantages:**

- Coordinate-sorted for efficient access
- Indexed for fast random access
- Universal compatibility with tools
- Fast I/O performance
- Ready for downstream analysis without re-alignment

**Disadvantages:**

- Stores full read sequences (no reference-based compression)
- 45% larger than CRAM format
- Inefficient for long-term storage

### 1.3. CRAM Files (Reference-Compressed Alignment Format)

CRAM is a GA4GH standard format that uses reference-based compression to reduce file size while maintaining lossless information.

**File Content and Compression Strategy:**

Unlike BAM files that store full read sequences, CRAM files use reference-based compression:

- **For matching bases:** Instead of storing the full sequence, CRAM stores only the differences between the read and reference genome (SNPs, indels)
- **Reference coordinates:** Reads that match the reference are encoded as genomic coordinates + difference information
- **Quality scores:** Quality information is preserved
- **Unmatched reads:** Reads that don't align or have significant differences are stored using standard DEFLATE compression

**How CRAM Compresses the Same Read:**

Using the same read from the BAM example (NM:i:0, all 148 bases match reference):

**BAM storage:**

```
Full sequence (148 bp):
TTAATGTATTGCTTAAAGGTTTGCTAGCATTTTGTTGAGGATTTTTGCATCAATATTAATTGGAGATATTGTAGTTTTCTTTTTTTAAAGTGTCTTTGATTTTGGTATAAAGGTAATTCTGGTGTTATAGAATGAGTTTGGAAGTATT
(165 characters = ~165 bytes)

Quality scores (148 bp):
CC@FFFFFHHHHHJJJJJJCHIJJJJJJJIJJJJIJIFIJGHJJJJJJIJIJIIIJIJJIIIJBGFHIIJJGHIJJJJIJJJHHFDACDDCCEEDDDDCDDACCDACDDEEDDCDCDEDDDDDDDDDEEDCDDDCDDEDDDDDDCDDE
(165 characters = ~165 bytes)

Total per read: ~330+ bytes
```

**CRAM storage (for the same read with no mismatches):**

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

**Compression efficiency:** ~82% reduction for this single read.

**Why this works:** If a 148-base read matches the reference perfectly, CRAM simply records:

- "Start at position 11016745 on chr22"
- "Next 148 bases match the reference"
- "Quality scores are [preserved]"

Instead of storing all 148 bases again.

**Characteristics:**

- **Reference-compressed** alignment format
- Requires reference genome for encoding/decoding
- Matched reads are stored as reference coordinates + differences only
- Unmatched reads compressed with DEFLATE
- Indexed (`.crai` file) like BAM

**Test Data Example (chr22 subset):**

```
sample1_merged.cram: 28 MB (45% reduction from BAM)
sample1_merged.cram.crai: index file
```

**Storage Reduction Comparison:**

```
FASTQ:  74 MB → CRAM: 28 MB = 62% savings overall
BAM:    51 MB → CRAM: 28 MB = 45% savings vs BAM
```

**Advantages:**

- **45% smaller than BAM** - most important for cost reduction
- **62% smaller than FASTQ** - substantial savings vs raw data
- Lossless compression - no data loss
- GA4GH standard format - increasing tool support
- Supported by modern tools: GATK, DeepVariant, samtools, bcftools
- Enables re-alignment with reference genome

**Considerations:**

- Requires reference genome for decompression
- Reference must match original alignment

## 2. Storage Cost Analysis and Strategy

### 2.1 Quick Comparison Table

| Data Type              | Format   | Size  | Relative Size | Use Case          |
| ---------------------- | -------- | ----- | ------------- | ----------------- |
| **Raw reads**          | FASTQ.GZ | 74 MB | 100%          | Initial input     |
| **Aligned (unsorted)** | BAM      | 74 MB | 100%          | Temporary         |
| **Aligned (sorted)**   | BAM      | 51 MB | 69%           | Processing        |
| **Archived alignment** | CRAM     | 28 MB | **38%**       | Long-term storage |

**Key Insight:** In this subset, CRAM gives the best balance between storage cost and functionality.

### 2.2 Pipeline Storage Strategy

The nf-germline-short-read-variant-calling pipeline implements a dual-output strategy:

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

This approach keeps both options available:

- **BAM for analysis:** Fast I/O, universal compatibility, ready for variant calling
- **CRAM for storage:** 45% space savings, lossless, supports re-analysis

### 2.3 Scaling to Production

For WGS projects at 30X coverage:

**Per-Sample Costs (30X coverage):**
| Format | Size | Annual Storage Cost\* |
|--------|------|---------------------|
| FASTQ | 100 GB | $400 |
| BAM | 50 GB | $200 |
| CRAM | 28 GB | **$112** |

\*Assuming AWS S3 Standard at ~$0.023/GB/month

**100-Sample Cohort Annual Costs:**
| Format | Total Size | Annual Cost | Cost per Sample |
|--------|-----------|-------------|-----------------|
| FASTQ | 10 TB | $40,000 | $400 |
| BAM | 5 TB | $20,000 | $200 |
| CRAM | 2.8 TB | **$11,200** | **$112** |

**5-Year Project Costs:**

- FASTQ: $200,000
- BAM: $100,000
- **CRAM: $56,000 (72% savings vs FASTQ)**

These figures assume AWS S3 Standard pricing at the time of writing and should be treated as illustrative rather than a quotation.

## 3. Implementation in the Pipeline

### 3.1 SAMTOOLS_MERGE Process

The pipeline implements CRAM output in the `SAMTOOLS_MERGE` process:

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

### 3.2 CRAM Encoding Process

The samtools command for CRAM conversion:

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

**Key Parameters:**

- `-T` : Reference genome FASTA file (required for CRAM encoding)
- `-C` : Output CRAM format
- `-@` : Number of threads for parallel processing

### 3.3 Accessing CRAM Files

To view or process CRAM files, modern tools handle decompression automatically:

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

## 4. Re-analysis Workflow

One advantage of CRAM: you can re-analyze with new tools without keeping BAM files around. Be aware that some tools may not support CRAM files natively.

### 4.1 Re-alignment from CRAM

To re-align reads (e.g., with a newer reference genome or aligner):

```bash
# Extract reads from CRAM (automatically decompresses)
samtools view -h -b sample1_merged.cram | samtools bam2fq \
    | bwa mem -t 8 reference/GRCh38_updated.fasta - \
    | samtools sort -O BAM > sample1_new_alignment.bam
```

The CRAM file contains all original reads with quality scores, enabling complete re-alignment.

### 4.2 Variant Calling with CRAM-Native Tools

Many modern variant callers support CRAM input directly:

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

### 4.3 Converting CRAM to BAM

:::info

- Tools such as older versions of Strelka2 or some specialized structural variant callers may not support CRAM. Check the tool documentation and convert to BAM if necessary.
  :::

If a tool does not support CRAM files, you can convert CRAM back to BAM:

```bash
# Convert CRAM to BAM
samtools view -h -b sample1_merged.cram > sample1_converted.bam

# Index the BAM file
samtools index sample1_converted.bam
```

This approach allows you to archive alignments as CRAM (saving 45% storage) and convert to BAM only when a specific tool requires it.

## 5. Best Practices and Recommendations

### 5.1 Storage Tier Strategy

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

### 5.2 Checklist for Production Pipelines

- Always generate CRAM files for long-term archival
- Keep BAM files during the active analysis phase
- Archive the reference genome with CRAM files (to ensure consistency)
- Test re-analysis workflows to verify CRAM integrity
- Document the reference genome version in metadata
- Implement automated transitions: delete BAM after 6 months
- Monitor CRAM file accessibility (test quarterly decompression)

### 5.3 Tool Compatibility

**Fully supported (CRAM input natively):**

- samtools - native CRAM support
- GATK 4.x - full CRAM support
- DeepVariant - supports CRAM input
- bcftools - CRAM compatible
- Picard - CRAM support

**Requires conversion to BAM:**

- Some legacy variant callers (check documentation)
- Older versions of Strelka2
- Some specialized structural variant callers

**Conversion approach for unsupported tools:**

```bash
# Quick conversion when needed
samtools view -h -b sample1_merged.cram > sample1_temp.bam
samtools index sample1_temp.bam

# Use converted BAM with legacy tools
legacy_tool --input sample1_temp.bam

# Delete temporary BAM after use
rm sample1_temp.bam sample1_temp.bam.bai
```

This way, long-term storage keeps only CRAM files, and conversion happens only when a specific tool requires it.

## 6. Benchmarking Results

### 6.1 Real-World Performance

Using the pipeline on the HG002 (Genome in a Bottle) chr22 subset:

**Compression Statistics:**

```
Original BAM:        51 MB
CRAM output:         28 MB
Compression ratio:   45% reduction
```

**Variant Calling Quality (No Impact):**

- DeepVariant SNP accuracy: **99.39% recall, 99.82% precision**
- CRAM compression did not affect variant quality in this test
- Identical results vs BAM input

### 6.2 Cost Savings Over 5 Years

Project: 100-sample WGS cohort (30X coverage)

```
Storage Timeline:
Year 1: FASTQ + BAM + CRAM (full raw + processed)    = 16.8 TB
Year 2-5: CRAM only (after analysis complete)        = 2.8 TB

Total 5-year cost:
├── FASTQ retention strategy: $200,000
├── BAM retention strategy:   $100,000
└── CRAM-only strategy:       $56,000 (72% savings)
```

## Summary

CRAM is a pragmatic option for genomic data storage challenges:

1. **Cost Efficiency:** 45% smaller than BAM in this subset, enabling more sustainable long-term storage
2. **Lossless:** Complete information preservation - no data loss
3. **Accessibility:** Modern tools support CRAM for analysis
4. **Future-Proof:** Reference-based design supports re-analysis with updated tools
5. **Standards:** GA4GH standard format supports long-term viability

By implementing dual BAM/CRAM output, the pipeline keeps fast variant calling during active analysis and economical long-term archival. The savings figures depend on the tools, the data, and the storage service used, so they should be measured for each project.

## References

- [CRAM Format Specification](https://samtools.github.io/hts-specs/CRAMv3.pdf) - GA4GH standard
- [samtools CRAM Documentation](http://www.htslib.org/doc/samtools.html)
- [GATK CRAM Support](https://gatk.broadinstitute.org/hc/en-us/articles/360035890791-SAM-or-BAM-or-CRAM-Mapped-sequence-data-formats)
- [Storage Optimization Documentation](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
- [Pipeline Repository](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
