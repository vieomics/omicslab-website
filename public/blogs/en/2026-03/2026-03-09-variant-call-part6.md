---
slug: gatk-variant-calling-production-slurm-optimization-part6
title: "Variant Calling (Part 6): Do we need a complex pipeline for high-quality variant calling?"
description: "A benchmark of two minimal germline workflows — fastp → bwa-mem2 → sambamba → freebayes and fastp → bwa-mem2 → deepvariant — against the GIAB HG002 truth set, compared with nf-core/sarek."
series: Variant Calling from Bash to Production
seriesOrder: 6
authors: [vieomics]
tags: [variant-calling, nextflow]
image: ./imgs/gatk-variant-calling-production-slurm-optimization-part6.png
---

In many bioinformatics projects, pipelines tend to grow: more preprocessing steps, more tools, more layers of abstraction. It is reasonable to ask whether all of that is required for a single-sample germline analysis. As part of the GIAB HG002 benchmarking introduced in [Part 5](/en/blogs/gatk-variant-calling-production-slurm-optimization-part5), we compared two minimal workflows against the full nf-core/sarek pipeline. In our tests, the minimal workflows reached SNP and INDEL accuracy close to sarek's — above 99% F1 on HG002.

<!--truncate-->

:::tip
+ The environment setups and scripts are uploaded to [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
+ Cloning the repository with tag 0.4.0 reproduces the contents of this post
:::

## Series Overview

- **[Part 1](/en/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: A bash germline pipeline managed with Pixi
- **[Part 2](/en/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Validating the bash workflow
- **[Part 3](/en/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: From bash to Nextflow
- **[Part 4](/en/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Containerized execution and reproducibility
- **[Part 5](/en/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmarking germline variant calling with nf-core/sarek
- **Part 6 (This Post)**: Do we need a complex pipeline for high-quality variant calling?
- **[Part 7](/en/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Variant annotation with SnpEff and Ensembl VEP
- **[Part 8](/en/blogs/gatk-variant-calling-production-slurm-optimization-part8)**: Structural variant calling — a short-read benchmark
- **[Part 9](/en/blogs/storage-cost-optimization-cram-format)**: Storage cost optimization with CRAM
- **[Part 10](/en/blogs/structural-variant-calling-short-reads-challenges)**: The challenges of SV calling with short reads
- **[Part 11](/en/blogs/gvcf-population-scale-genotyping)**: Population-scale genotyping with gVCF

Clone the repository:
```bash
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.4.0
cd nf-germline-short-read-variant-calling
cd benchmark/pipelines/nf-germline-short-read-variant-calling
```

## 1. About The Workflow

:::tip
This is the workflow that was built from scratch (as a bash workflow) and later moved to Nextflow. What is new:
+ It was refactored into subworkflows and workflows
+ The `processing` step was split into `alignment` and `preprocess_alignment`
:::

```bash
├── LICENSE
├── Makefile
├── Readme.md
├── assets
│   ├── samplesheet.csv
├── conf
│   ├── base.config
│   ├── igenomes.config
│   └── modules.config
├── main.nf
├── modules
│   └── local
│       ├── bcftools
│       │   ├── query
│       │   │   └── main.nf
│       │   └── stats
│       │       └── main.nf
│       ├── bedtools
│       │   └── genomecov
│       │       └── main.nf
│       ├── bwa
│       │   ├── index
│       │   │   └── main.nf
│       │   └── mem2
│       │       └── main.nf
│       ├── deepvariant
│       │   └── main.nf
│       ├── fastp
│       │   └── trim
│       │       └── main.nf
│       ├── freebayes
│       │   └── main.nf
│       ├── gatk
│       │   ├── collectmetrics
│       │   │   └── main.nf
│       │   ├── genotypegvcfs
│       │   │   └── main.nf
│       │   ├── haplotypecaller
│       │   │   └── main.nf
│       │   ├── mergevcfs
│       │   │   └── main.nf
│       │   ├── selectvariants_indel
│       │   │   └── main.nf
│       │   ├── selectvariants_snp
│       │   │   └── main.nf
│       │   ├── variantfiltration_indel
│       │   │   └── main.nf
│       │   └── variantfiltration_snp
│       │       └── main.nf
│       ├── gatkspark
│       │   ├── applybqsr
│       │   │   └── main.nf
│       │   ├── baserecalibrator
│       │   │   └── main.nf
│       │   └── markduplicates
│       │       └── main.nf
│       ├── sambamba
│       │   └── markdup
│       │       └── main.nf
│       ├── samtools
│       │   ├── merge
│       │   │   └── main.nf
│       │   └── sort
│       │       └── main.nf
│       └── snpeff
│           └── annotate
│               └── main.nf
├── nextflow.config
├── nf-test.config
├── pixi.lock
├── pixi.toml
├── subworkflows
│   └── local
│       ├── alignment
│       │   └── main.nf
│       ├── annotation
│       │   └── main.nf
│       ├── preprocessing_alignment
│       │   └── main.nf
│       └── variant_calling
│           └── main.nf
├── tests
│   ├── default.nf.test
│   ├── default.nf.test.snap
│   └── nextflow.config
└── workflows
    └── main.nf
```

### 1.1 Config
To make it easier to obtain the correct reference files for a given genome, this configuration was adapted from nf-core/sarek using public reference data:
```json
params {
    genomes = [
        'sarek_test': [
            fasta: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta',
            fasta_fai: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.fasta.fai',
            dict: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/genome.dict',
            index_bwa2_reference: true,
            bwa2_index: 'null',
            dbsnp: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz',
            dbsnp_tbi: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/dbsnp_146.hg38.vcf.gz.tbi',
            known_indels: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz',
            known_indels_tbi: 'https://raw.githubusercontent.com/nf-core/test-datasets/modules/data/genomics/homo_sapiens/genome/vcf/mills_and_1000G.indels.vcf.gz.tbi'
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
            known_indels_beta_tbi: "s3://ngi-igenomes/igenomes/Homo_sapiens/GATK/GRCh38/Annotation/GATKBundle/beta/Homo_sapiens_assembly38.known_indels.vcf.gz.tbi"
        ]
    ]
}
```

To run with a genome defined in this configuration, specify it with the `--genome` parameter. The workflow then fetches the correct reference inputs for that genome from `igenomes.config` in the `conf` folder:
```bash
nextflow run main.nf \
    -profile docker\
    --genome GRCh38 \
    --input input.csv \
    --output variant_calling
```

### 1.2 Subworkflow
As with modules, a subworkflow can be imported and used in the main workflow. A subworkflow groups modules that serve a similar function. Grouping them this way helps with reuse across pipelines and gives a clearer view of progress in the terminal.

#### 1.2.1 Example
The subworkflow below is the `alignment` subworkflow:
```groovy
/*
========================================================================================
    ALIGNMENT SUBWORKFLOW
========================================================================================
    QC, Trimming, Alignment
========================================================================================
*/


include { FASTP } from '../../../modules/local/fastp/trim/main'
include { BWAMEM2_INDEX } from '../../../modules/local/bwa/index/main'
include { BWA_MEM2 } from '../../../modules/local/bwa/mem2/main'
include { SAMTOOLS_SORT } from '../../../modules/local/samtools/sort/main'
include { SAMTOOLS_MERGE } from '../../../modules/local/samtools/merge/main'


workflow ALIGNMENT {
    take:
    reads_ch // channel: [ val(meta), [ path(read1), path(read2) ] ]
    ref_fasta // path: reference FASTA
    ref_fai // path: reference FAI
    ref_dict // path: reference dict
    bwa2_index // channel: Optional BWA index files
    index_bwa2_reference // channel: Optional BWA index files

    main:
    ch_versions = channel.empty()

    // Check if BWA index needs to be generated
    // If empty, generate it; otherwise use provided index
    if (index_bwa2_reference) {
        BWAMEM2_INDEX(ref_fasta)
        ch_versions = ch_versions.mix(BWAMEM2_INDEX.out.versions)
        bwa2_index_ch = BWAMEM2_INDEX.out.index
    }
    else {
        bwa2_index_ch = channel.fromPath(bwa2_index)
    }
    //
    // STEP 1: Adapter Trimming, Quality Filtering, and QC with fastp
    //
    FASTP(
        reads_ch
    )
    ch_versions = ch_versions.mix(FASTP.out.versions)

    //
    // STEP 2: Read Alignment with BWA-MEM2
    //
    BWA_MEM2(
        FASTP.out.reads,
        ref_fasta,
        ref_fai,
        ref_dict,
        bwa2_index_ch,
    )
    ch_versions = ch_versions.mix(BWA_MEM2.out.versions)

    //
    // STEP 3: Sort BAM file
    //
    SAMTOOLS_SORT(
        BWA_MEM2.out.bam
    )
    ch_versions = ch_versions.mix(SAMTOOLS_SORT.out.versions)

    //
    // STEP 4: Merge lanes per sample (if multiple lanes exist)
    //
    SAMTOOLS_SORT.out.bam
        .map { meta, bam ->
            def new_meta = [:]
            new_meta.id = meta.sample
            new_meta.sample = meta.sample
            return [new_meta.id, new_meta, bam]
        }
        .groupTuple()
        .map { _sample_id, metas, bams ->
            return [metas[0], bams]
        }
        .set { ch_bams_to_merge }

    SAMTOOLS_MERGE(
        ch_bams_to_merge
    )
    ch_versions = ch_versions.mix(SAMTOOLS_MERGE.out.versions)


    emit:
    bam = SAMTOOLS_MERGE.out.bam // channel: [ val(meta), path(bam) ]
    bai = SAMTOOLS_MERGE.out.bai // channel: [ val(meta), path(bai) ]
    versions = ch_versions // channel: path(versions.yml)
}
```

:::info
Subworkflow versus module — what is new?
+ Inputs are declared after `take`
+ Outputs are declared after `emit`
:::

#### 1.2.2 How To Import Workflow

A subworkflow is imported with `include`, in the same way as a module:
```groovy
include { ALIGNMENT } from '../subworkflows/local/alignment/main'
include { PREPROCESSING } from '../subworkflows/local/preprocessing_alignment/main'
include { VARIANT_CALLING } from '../subworkflows/local/variant_calling/main'
include { ANNOTATION } from '../subworkflows/local/annotation/main'
/*
========================================================================================
    NAMED WORKFLOW FOR PIPELINE
========================================================================================
*/

workflow GERMLINE_VARIANT_CALLING {
  ...
}
```

A subworkflow can also be included inside another subworkflow. Here the four subworkflows above are included in `GERMLINE_VARIANT_CALLING`, and that workflow is in turn included from `main.nf`:
```groovy
#!/usr/bin/env nextflow
nextflow.enable.dsl = 2

include { GERMLINE_VARIANT_CALLING } from './workflows/main.nf'

/*
========================================================================================
    RUN MAIN WORKFLOW
========================================================================================
*/

workflow {

    //
    // Create input channel from samplesheet or input parameters
    //
    // Read from samplesheet CSV
    channel.fromPath(params.input)
        .splitCsv(header: true)
        .map { row ->
            def meta = [:]
            meta.id = row.sample
            meta.sample = row.sample
            // Support both new format (with lane) and old format (without lane)
            meta.lane = row.lane ?: "L001"
            meta.read_group = "${row.sample}_${meta.lane}"
            def reads = []
            reads.add(file(row.fastq_1))
            if (row.fastq_2) {
                reads.add(file(row.fastq_2))
            }
            return [meta, reads]
        }
        .set { ch_input }


    GERMLINE_VARIANT_CALLING(
        ch_input
    )
}
```

### 1.3 Versus nf-core/sarek
The variant calling series describes how the pipeline was moved from older approaches to the current framework. According to the documentation of the variant calling tools, it may not be necessary to preprocess aligned reads with the GATK best practice, which requires extensive computing resources:
+ Freebayes: https://github.com/freebayes/freebayes
+ Deepvariant: https://github.com/google/deepvariant

On that basis, the pipeline was refactored to follow the two workflows recommended by those tools:
+ Freebayes: fastp > bwa-mem2 > sambamba > freebayes
+ Deepvariant: fastp > bwa-mem2 > deepvariant

:::tip
The `preprocess_alignment` subworkflow was updated with a `preprocessor` value that accepts the string `gatk` or `sambamba` to select the preprocessing method
:::

```groovy
#!/usr/bin/env nextflow

/*
========================================================================================
    PREPROCESSING SUBWORKFLOW
========================================================================================
    Deduplication, BQSR, Quality Metrics
========================================================================================
*/

include { GATKSPARK_MARKDUPLICATES } from '../../../modules/local/gatkspark/markduplicates/main'
include { GATKSPARK_BASERECALIBRATOR } from '../../../modules/local/gatkspark/baserecalibrator/main'
include { GATKSPARK_APPLYBQSR } from '../../../modules/local/gatkspark/applybqsr/main'
include { GATK_COLLECTMETRICS } from '../../../modules/local/gatk/collectmetrics/main'
include { SAMBAMBA_MARKDUP } from '../../../modules/local/sambamba/markdup/main'

workflow PREPROCESSING {
    take:
    preprocessor // value: gatk or sambamba
    aligned_bams // channel: [ val(meta), path(bam) ]
    ref_fasta // path: reference FASTA
    ref_fai // path: reference FAI
    ref_dict // path: reference dict
    dbsnp_vcf // path: dbSNP VCF
    dbsnp_tbi // path: dbSNP TBI
    known_indels_vcf // path: known indels VCF
    known_indels_tbi // path: known indels TBI

    main:
    ch_versions = channel.empty()

    if (preprocessor=="gatk"){
        <<GATK preprocessing steps>>

    } else if (preprocessor=="sambamba"){
        <<sambamba>>
    }
    else {
        error "Unsupported preprocessor: ${preprocessor}"
    }
   

    emit:
    bam = ch_processed_bam // channel: [ val(meta), path(bam) ]
    bai = ch_processed_bai // channel: [ val(meta), path(bai) ]
    alignment_summary = ch_alignment_summary // channel: [ val(meta), path(metrics) ]
    insert_metrics = ch_alignment_insert_metrics // channel: [ val(meta), path(metrics) ]
    versions = ch_versions // channel: path(versions.yml)
}
```

More computing resources were allocated so the runs complete faster, using the configuration below (`customized_labels.config`):

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

:::tip
The `GERMLINE_VARIANT_CALLING` workflow was updated with a `skip_preprocessing` option that sends raw aligned reads directly to the variant caller
:::

```groovy
    if(!params.skip_preprocessing){
        PREPROCESSING(
            params.preprocessor,
            ALIGNMENT.out.bam,
            ref_fasta,
            ref_fai,
            ref_dict,
            dbsnp_vcf,
            dbsnp_tbi,
            known_indels_vcf,
            known_indels_tbi,
        )
        
        ch_versions = ch_versions.mix(PREPROCESSING.out.versions)
        ch_final_bam = PREPROCESSING.out.bam
        ch_final_bai = PREPROCESSING.out.bai
    }

   
    else {
        ch_final_bam = ALIGNMENT.out.bam
        ch_final_bai = ALIGNMENT.out.bai
    }
   
```

## 2. Running The Two Simplified Workflows
Cloning the repository with the input files that are available at tag 0.4.0:
```bash
# cloning repo
git clone https://github.com/nttg8100/nf-germline-short-read-variant-calling.git -b 0.4.0
cd benchmark/pipelines/nf-germline-short-read-variant-calling
```
### 2.1 Freebayes
The workflow procedure for Freebayes: fastp > bwa-mem2 > sambamba > freebayes
```bash
# clone repo again
git clone https://github.com/nttg8100/nf-germline-short-read-variant-calling.git -b 0.4.0
cd benchmark/pipelines/nf-germline-short-read-variant-calling
# Freebayes recommendation: 
# 1. fastp: quality control
# 2. bwa-mem2: read alignment  
# 3. sambamba: PCR remove duplicate
# 4. freebayes: Variant calling
nextflow run nf-germline-short-read-variant-calling \
    -profile docker -c customized_labels.config \
    --genome GRCh38 \
    --input input.csv \
    --variant_caller "freebayes" \
    --preprocessor "sambamba" \
    --output variant_calling
```

### 2.2 Deepvariant
The workflow procedure for Deepvariant: fastp > bwa-mem2 > deepvariant
```bash
# Deepvariant recommendation: 
# 1. fastp: quality control
# 2. bwa-mem2: read alignment  
# 3. deepvariant: variant calling 
nextflow run nf-germline-short-read-variant-calling \
    -profile docker -c customized_labels.config \
    --genome GRCh38 \
    --input input.csv \
    --variant_caller "freebayes" \
    --preprocessor "sambamba" \
    --output variant_calling -resume # Running on the same workding directory to reuse the cache for aligned reads processes
```

## 3. Evaluation
For evaluation, the same setup with HG002 from GIAB was reused from the previous post on [**benchmarking germline variant calling with nf-core/sarek**](/en/blogs/gatk-variant-calling-production-slurm-optimization-part5).

Benchmarking against GIAB HG002 shows that a minimal workflow (FASTP → BWA-MEM2 → DeepVariant) reaches essentially identical SNP and INDEL accuracy compared with the full nf-core/sarek pipeline. For single-sample germline variant calling in our tests, pipeline complexity did not translate into better performance.


| Run               | Type  | Filter | TRUTH.TOTAL | TRUTH.TP | TRUTH.FN | QUERY.TOTAL | QUERY.FP | QUERY.UNK | FP.gt | FP.al | Recall   | Precision | Frac_NA  | F1_Score | TRUTH.TiTv | QUERY.TiTv | TRUTH.het/hom | QUERY.het/hom |
| ----------------- | ----- | ------ | ----------- | -------- | -------- | ----------- | -------- | --------- | ----- | ----- | -------- | --------- | -------- | -------- | ---------- | ---------- | ------------- | ------------- |
| deepvariant_HG002 | INDEL | ALL    | 525469      | 519079   | 6390     | 892719      | 3369     | 348852    | 2473  | 421   | 0.987839 | 0.993805  | 0.390775 | 0.990813 |            |            | 1.528276      | 1.892501      |
| deepvariant_HG002 | INDEL | PASS   | 525469      | 519079   | 6390     | 892719      | 3369     | 348852    | 2473  | 421   | 0.987839 | 0.993805  | 0.390775 | 0.990813 |            |            | 1.528276      | 1.892501      |
| deepvariant_HG002 | SNP   | ALL    | 3365127     | 3344672  | 20455    | 3840687     | 6131     | 488147    | 1391  | 617   | 0.993921 | 0.998171  | 0.127099 | 0.996042 | 2.100128   | 1.986419   | 1.581196      | 1.498072      |
| deepvariant_HG002 | SNP   | PASS   | 3365127     | 3344672  | 20455    | 3840687     | 6131     | 488147    | 1391  | 617   | 0.993921 | 0.998171  | 0.127099 | 0.996042 | 2.100128   | 1.986419   | 1.581196      | 1.498072      |
| freebayes_HG002   | INDEL | ALL    | 525469      | 503744   | 21725    | 883066      | 25587    | 336867    | 14646 | 1947  | 0.958656 | 0.953154  | 0.381474 | 0.955897 |            |            | 1.528276      | 1.856978      |
| freebayes_HG002   | INDEL | PASS   | 525469      | 503744   | 21725    | 883066      | 25587    | 336867    | 14646 | 1947  | 0.958656 | 0.953154  | 0.381474 | 0.955897 |            |            | 1.528276      | 1.856978      |
| freebayes_HG002   | SNP   | ALL    | 3365127     | 3344366  | 20761    | 4404601     | 129353   | 927169    | 3829  | 16162 | 0.993831 | 0.962802  | 0.210500 | 0.978070 | 2.100128   | 1.823321   | 1.581196      | 1.875394      |
| freebayes_HG002   | SNP   | PASS   | 3365127     | 3344366  | 20761    | 4404601     | 129353   | 927169    | 3829  | 16162 | 0.993831 | 0.962802  | 0.210500 | 0.978070 | 2.100128   | 1.823321   | 1.581196      | 1.875394      |


### 3.1 DeepVariant
A minor change in performance for the simple workflow with DeepVariant:

| Metric          | Simple Workflow | nf-core/sarek | Difference |
| --------------- | --------------- | ------------- | ---------- |
| SNP Recall      | 0.993921        | 0.993885      | ~0.00004   |
| SNP Precision   | 0.998171        | 0.998421      | ~0.00025   |
| SNP F1 Score    | 0.996042        | 0.996148      | ~0.00011   |
| INDEL Recall    | 0.987839        | 0.989684      | ~0.00185   |
| INDEL Precision | 0.993805        | 0.994586      | ~0.00078   |
| INDEL F1 Score  | 0.990813        | 0.992129      | ~0.00132   |

---


### 3.2 FreeBayes
A minor change in performance for the simple workflow with FreeBayes:

| Metric          | Simple Workflow | nf-core/sarek | Difference |
| --------------- | --------------- | ------------- | ---------- |
| SNP Recall      | 0.993831        | 0.993862      | ~0.00003   |
| SNP Precision   | 0.962802        | 0.962893      | ~0.00009   |
| SNP F1 Score    | 0.978070        | 0.978133      | ~0.00006   |
| INDEL Recall    | 0.958656        | 0.959965      | ~0.00131   |
| INDEL Precision | 0.953154        | 0.964047      | ~0.01089   |
| INDEL F1 Score  | 0.955897        | 0.962002      | ~0.00610   |

## Recap
:::info
- In practice, using fewer steps can reduce the computational cost of the analysis.
- A simple workflow that follows the recommendations in the tool documentation can still produce results close to a larger pipeline in this benchmark.
:::


## References

1. **hap.py — tool for benchmarking germline short-read variants**  
   https://github.com/Illumina/hap.py

2. **Genome in a Bottle (GIAB) — gold-standard reference datasets**  
   https://www.nist.gov/programs-projects/genome-bottle

3. **nf-core/sarek — germline and somatic variant calling pipeline**  
   https://nf-co.re/sarek

4. **FreeBayes**  
   https://github.com/freebayes/freebayes

5. **DeepVariant**  
   https://github.com/google/deepvariant

6. **GATK Best Practices**  
   https://gatk.broadinstitute.org/hc/en-us/sections/360007226651

7. **nf-germline-short-read-variant-calling — pipeline used in this post**  
   https://github.com/nttg8100/nf-germline-short-read-variant-calling
- Cover image: [Short Spinner Used in Molecular Laboratory](https://commons.wikimedia.org/wiki/File:Short_Spinner_Used_in_Molecular_Laboratory.jpg) — Ajay Kumar Chaurasiya, Wikimedia Commons, CC BY-SA 4.0
