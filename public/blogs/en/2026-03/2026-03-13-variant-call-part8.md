---
slug: gatk-variant-calling-production-slurm-optimization-part8
title: "Variant Calling (Part 8): Structural Variant Calling — A Short-Read Benchmark"
description: "Benchmarking Manta, the SV caller integrated in nf-core/sarek, against the GIAB HG002 structural variant truth set with Truvari, and why short-read SV calling remains difficult."
series: Variant Calling from Bash to Production
seriesOrder: 8
authors: [vieomics]
tags: [nextflow, variant-calling, structural-variants, manta, truvari, benchmarking]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part8.png
---

Structural variants (SVs) — deletions, insertions, duplications, inversions, and translocations — are large genomic alterations (typically ≥50 bp) that play a major role in disease but are harder to detect than SNPs or small indels. In this post we benchmark **Manta**, the SV caller integrated in nf-core/sarek, against the GIAB HG002 truth set using **Truvari**, and look at why short-read SV calling remains a difficult problem.

<!--truncate-->

:::tip
+ The environment setups and scripts are uploaded to [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
+ Clone the repository with tag **0.6.0** to reproduce the contents of this post
:::

## Series Overview

- **[Part 1](/en/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: A bash germline pipeline managed with Pixi
- **[Part 2](/en/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Validating the bash workflow
- **[Part 3](/en/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: From bash to Nextflow
- **[Part 4](/en/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Containerized execution and reproducibility
- **[Part 5](/en/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmarking germline variant calling with nf-core/sarek
- **[Part 6](/en/blogs/gatk-variant-calling-production-slurm-optimization-part6)**: Do we need a complex pipeline for high-quality variant calling?
- **[Part 7](/en/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Variant annotation with SnpEff and Ensembl VEP
- **Part 8 (This Post)**: Structural variant calling — a short-read benchmark
- **[Part 9](/en/blogs/storage-cost-optimization-cram-format)**: Storage cost optimization with CRAM
- **[Part 10](/en/blogs/structural-variant-calling-short-reads-challenges)**: The challenges of SV calling with short reads
- **[Part 11](/en/blogs/gvcf-population-scale-genotyping)**: Population-scale genotyping with gVCF

Clone the repository:
```bash
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.6.0
cd nf-germline-short-read-variant-calling
cd benchmark
```

## 1. Reference and Truth Set

Before running the benchmark, download all required reference files using the script at `benchmark/references/download.sh`:

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
**Why two reference genomes?**
+ The **GRCh38** reference is used by nf-core/sarek for alignment and SV calling
+ The **GRCh37/hg19** reference (`human_g1k_v37_decoy.fasta`) is required because the GIAB SV truth set (v0.6) is defined in hg19 coordinates — liftover is needed to compare the two
+ The SNP/INDEL truth set is in GRCh38, so no liftover is needed for small variant benchmarking
:::

## 2. Background: Why SV Calling Is Hard for Short Reads

Short-read sequencing (Illumina, ~150 bp reads) works well for SNP and small indel detection, but it has limitations for SVs:

| Challenge                 | Description                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| Read length vs. SV size   | SVs range from 50 bp to megabases — far larger than a single read                             |
| Repetitive regions        | Many SVs occur in segmental duplications or low-complexity regions, causing mapping ambiguity |
| Breakpoint imprecision    | Short reads cannot span large SVs, so breakpoints are inferred rather than directly observed  |
| Split-read signal is weak | Only a fraction of reads at a breakpoint are split, limiting evidence depth                   |
| Liftover artifacts        | Benchmarking requires coordinate conversion between assemblies, introducing noise             |

Manta addresses these challenges by combining **split-read** and **paired-end discordant read** signals to detect SVs. Even with a 30X WGS dataset such as HG002, short-read SV calling remains limited compared with long-read approaches.

## 3. Running Manta via nf-core/sarek

Manta was run as part of the nf-core/sarek pipeline (v3.7.1) on the HG002 30X WGS dataset aligned to GRCh38.

```bash
nextflow run nf-core/sarek -r 3.7.1 -profile docker,test_full_germline \
    -c customized_labels.config \
    --input ./input.csv \
    --outdir bwamem \
    --tools "deepvariant,freebayes,strelka,manta,haplotypecaller" \
    --aligner "bwa-mem" \
    -resume
```

The Manta output VCF (`HG002.manta.diploid_sv.vcf.gz`) contains diploid SV calls including DEL, INS, INV, DUP, and BND (breakend) types.

## 4. Benchmarking Methodology

### 4.1 Truth Set

The benchmark uses the **GIAB HG002 Structural Variant Tier 1 truth set (v0.6)**:
- Truth VCF: `HG002_SVs_Tier1_v0.6.vcf.gz`
- Confident regions BED: `HG002_SVs_Tier1_v0.6.bed`
- Reference: `human_g1k_v37_decoy.fasta` (hg19/GRCh37)

The truth set is defined in hg19 coordinates, while sarek outputs VCFs in GRCh38. A liftover step is required before benchmarking.

### 4.2 Benchmarking Pipeline

The full benchmarking workflow is implemented in `benchmark/benchmark_sv_sarek.sh` and consists of four steps:

```bash
cd benchmark
pixi run --environment svbench bash benchmark_sv_sarek.sh
```

**Step 1 — Normalize the query VCF** (split multi-allelic, left-align indels):
```bash
bcftools norm -m -any \
    -o HG002_manta_hg38_normalized.vcf \
    pipelines/sarek/variant_calling/manta/HG002/HG002.manta.diploid_sv.vcf.gz
```

**Step 2 — Liftover from hg38 to hg19** using CrossMap:
```bash
CrossMap vcf \
    references/hg38ToHg19.over.chain.gz \
    HG002_manta_hg38_normalized.vcf \
    references/human_g1k_v37_decoy.fasta \
    HG002_manta_hg19_raw.vcf
```

:::info
During liftover, **3,945 records** could not be mapped to hg19 and were written to the `.unmap` file. These are excluded from downstream benchmarking.
:::

**Step 3 — Remove chr prefix, sort and index** (to match truth set naming):
```bash
sed -e 's/chr//g' HG002_manta_hg19_raw.vcf > HG002_manta_hg19_nochr.vcf
bcftools sort -o HG002_manta_hg19.vcf HG002_manta_hg19_nochr.vcf
bgzip -f HG002_manta_hg19.vcf
tabix -p vcf HG002_manta_hg19.vcf.gz
```

**Step 4 — Run Truvari** with default SV benchmarking parameters:
```bash
truvari bench \
    -b references/HG002_SVs_Tier1_v0.6.vcf.gz \
    -c results/sarek/sv/manta/HG002_manta_hg19.vcf.gz \
    -o results/sarek/sv/manta/HG002_manta.truvari \
    -f references/human_g1k_v37_decoy.fasta \
    --includebed references/HG002_SVs_Tier1_v0.6.bed
```

Key Truvari parameters used (from `params.json`):

| Parameter  | Value  | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `refdist`  | 500    | Max reference location distance for matching  |
| `pctseq`   | 0.7    | Min sequence similarity for match (70%)       |
| `pctsize`  | 0.7    | Min size similarity for match (70%)           |
| `sizemin`  | 50     | Min SV size to benchmark                      |
| `sizemax`  | 50000  | Max SV size to benchmark                      |
| `passonly` | false  | Include all variants (not just PASS-filtered) |
| `pick`     | single | Pick single best match per variant            |

## 5. Benchmark Results

### 5.1 Overall Performance

The Truvari benchmark results from `HG002_manta.truvari/summary.json`:

| Metric                      | Value               |
| --------------------------- | ------------------- |
| TP (True Positives)         | 1,082               |
| FP (False Positives)        | 1,858               |
| FN (False Negatives)        | 12,650              |
| Total truth SVs (base cnt)  | 13,732              |
| Total called SVs (comp cnt) | 2,940               |
| **Precision**               | **0.3680 (36.8%)**  |
| **Recall**                  | **0.0788 (7.88%)**  |
| **F1 Score**                | **0.1298 (12.98%)** |
| Genotype Concordance        | 0.9039 (90.39%)     |

### 5.2 Genotype Breakdown

Among the 1,082 matched true positives, genotype concordance was 90.4%. The genotype confusion matrix:

| Truth GT  | Called GT | Count |
| --------- | --------- | ----- |
| 0/1 (het) | 0/1 (het) | 344   |
| 0/1 (het) | 1/1 (hom) | 63    |
| 1/1 (hom) | 1/1 (hom) | 634   |
| 1/1 (hom) | 0/1 (het) | 29    |
| None/None | 1/1 (hom) | 6     |
| None/None | 0/1 (het) | 4     |
| 0/0       | 0/1 (het) | 1     |
| 0/0       | 1/1 (hom) | 1     |

The main source of genotype error is **het/hom confusion** (92 cases), which is expected for short-read SV calling, where homozygous and heterozygous SVs in repetitive regions are easily confused.

### 5.3 Coverage Gap: Called vs. Truth

The most notable result is the **coverage gap**:

```
Truth SVs:   13,732
Called SVs:   2,940  (only 21.4% of truth SVs are even called)
True Positives: 1,082 (only 7.88% of truth SVs are recovered)
```

Manta called only ~2,940 SVs in total, while the GIAB truth set contains 13,732 high-confidence SVs in Tier 1 regions. This is not primarily a precision problem (36.8% of calls are correct) — it is a **sensitivity problem**: the majority of real SVs are not detected from short reads in this setup.

## 6. Why Is Recall So Low?

The low recall (7.88%) reflects the limitations of short-read SV detection:

1. **Insertion detection failure**: Short reads cannot span insertions larger than the read length. Most of the GIAB truth insertions (especially mobile element insertions) are hard to see with Illumina reads.

2. **Liftover losses**: 3,945 records (~57% of raw Manta calls) failed liftover from hg38 to hg19, further reducing the callable variant set.

3. **Repetitive region blackout**: Many GIAB Tier 1 SVs are in segmental duplications where short reads cannot be uniquely mapped.

4. **SV size distribution mismatch**: Manta is most sensitive for deletions and larger rearrangements, but the truth set contains many small insertions (50–200 bp) where short-read signal is weakest.

## Recap

:::info
- **Short-read SV calling with Manta reached ~7.9% recall** against the GIAB HG002 truth set in this benchmark — a different performance profile from SNP/INDEL calling (>99% F1).
- **Precision (36.8%) is moderate** given the difficulty, but most calls cannot be validated against the truth set.
- **Genotype concordance (90.4%)** is high for the variants that are correctly called, which suggests the signal quality is good when SVs are detected at all.
- **The main bottleneck is sensitivity**, not precision — most real SVs were not detectable from short reads alone in this experiment.
- For clinical-grade SV detection, **long-read sequencing (PacBio HiFi, Oxford Nanopore)** is often required, or combining short-read callers with optical mapping technologies.
:::

## References

1. **Manta SV caller**
   Chen X et al. (2016). Manta: rapid detection of structural variants and indels for germline and cancer sequencing applications. *Bioinformatics*. https://github.com/Illumina/manta

2. **Truvari: SV benchmarking tool**
   https://github.com/ACEnglish/truvari

3. **GIAB HG002 Structural Variant Truth Set (v0.6)**
   https://www.nist.gov/programs-projects/genome-bottle

4. **CrossMap: Genome coordinate conversion**
   http://crossmap.sourceforge.net/

5. **nf-core/sarek pipeline**
   https://nf-co.re/sarek

6. **bcftools: VCF normalization and manipulation**
   http://samtools.github.io/bcftools/
