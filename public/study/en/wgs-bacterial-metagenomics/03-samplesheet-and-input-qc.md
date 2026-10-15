---
slug: samplesheet-and-input-qc
title: "Preparing the samplesheet and checking input quality"
description: "The samplesheet format an assembly pipeline expects, and how to read the read-quality metrics before a run so resources are not wasted."
order: 3
module: "Preparing the data"
duration: "30 min"
related:
  - how-to-run-nf-core-pipelines-on-omicslab
---

An assembly pipeline needs to know which files belong to each sample. That information lives in the **samplesheet** — a small table that decides whether a run starts correctly. Checking read quality beforehand surfaces problematic samples early.

## A samplesheet for nf-core/bacass

For short-read data, each row of the samplesheet usually holds a sample name and the two files `R1` and `R2`. Column names depend on the pipeline version, so the safe move is to take the template from the exact version you run and keep its column names.

A few points worth checking:

- Every sample name is unique and contains no spaces.
- The `R1`/`R2` pair points to the right files in the right storage location.
- Paths use a consistent separator.

![A samplesheet with a sample column and the two files R1, R2](./imgs/platform-samplesheet.svg "Figure 1. An example samplesheet for short-read data.")

## Reading the quality metrics

A quality-control tool (FastQC) produces a report per FASTQ file. Four metrics are looked at most often:

- **Per-base quality by position.** With Illumina data, quality usually drops towards the end of a read; that is known behaviour, not necessarily a fault.
- **Adapter content.** Leftover adapter should be trimmed before assembly.
- **GC composition.** A GC content far from the expected species can hint at contamination.
- **Overrepresented sequences.** These can point to contamination or low complexity.

When many samples are run, MultiQC merges the reports into one page for comparison across samples.

![A MultiQC summary report across several samples](./imgs/platform-multiqc.svg "Figure 2. A summary report makes quality comparable across samples.")

## Trimming reads

Trimming with `fastp` removes adapter and low-quality bases from both ends of a read. In many pipelines this step is automated; when running it yourself, keep the before-and-after reports, because they show how much data was discarded.

:::note
Over-aggressive trimming can lower coverage and affect assembly. The pipeline's default parameters are a reasonable starting point; change them only when the quality report suggests it.
:::

## Wrapping up

The data now has a valid samplesheet and has been quality-checked. The next lesson runs the assembly with `nf-core/bacass`.
