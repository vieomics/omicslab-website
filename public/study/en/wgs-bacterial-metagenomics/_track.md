---
title: "Assemble and annotate a bacterial genome from WGS data"
description: "The result: an assembled, quality-checked and annotated bacterial genome, with its antimicrobial-resistance genes — run on the Omicslab platform. The course goes from raw FASTQ data to that result, one step at a time."
level: "Beginner"
duration: "About 3 hours"
order: 1
tag: "Result"
outcomes:
  - "Read and assess a FASTQ file at a basic level: read count, length and base quality."
  - "Tell isolate WGS data apart from metagenomic data, and choose the analysis that fits."
  - "Prepare a samplesheet in the format an assembly pipeline expects."
  - "Run nf-core/bacass on Omicslab, follow the logs and the cost, and read the results."
  - "Judge an assembly with metrics such as N50 and coverage."
  - "Annotate a genome and look for antimicrobial-resistance genes."
tools:
  - "nf-core/bacass"
  - "FastQC"
  - "fastp"
  - "QUAST"
  - "Bakta / Prokka"
  - "AMRFinderPlus"
---

This course takes a newcomer through one complete bacterial analysis on the Omicslab platform: from a raw FASTQ file to an assembled, quality-checked and annotated genome. Each lesson introduces a short concept, then carries out the matching step on the platform.
