---
slug: sequencing-and-wgs-data
title: "Bacterial sequencing and WGS input data"
description: "What a read is, how isolate WGS differs from metagenomics, and what a FASTQ file needs to satisfy before assembly."
order: 1
module: "Foundations"
duration: "25 min"
related:
  - bacterial-genome-assembly-without-coding
---

A sequencer does not read a genome as one continuous strand. It reads many short fragments in parallel, and software assembles those fragments afterwards. Understanding what the input data is therefore decides much of the assembly result later.

## A read, the basic unit of data

Each **read** is a short nucleotide string (A, T, G, C) with a quality score for every base. With short-read technology (Illumina) a read is typically tens to a few hundred bases long; a single run produces millions of reads, stored in a **FASTQ** file. Every read has two matching files — `R1` and `R2` — because both ends of the same DNA fragment are read.

**Coverage** is the average number of times each position in the genome is crossed by a read. For bacteria, coverage from roughly 30× upwards is often enough to assemble, though the right figure depends on genome size and the tool used.

![Data flow from a biological sample to a FASTQ file](./imgs/sequencing-to-fastq.svg "Figure 1. From a biological sample to reads written into a FASTQ file.")

## Isolate WGS and metagenomics

The two kinds of bacterial data met most often differ in where the sample came from:

- **WGS from an isolated colony.** The sample is cultured so that only one strain remains, so the data comes mostly from a single genome. This is the case that an assembly pipeline such as `nf-core/bacass` fits.
- **Shotgun metagenomics.** The sample holds several species at once — an environmental or un-isolated clinical sample, for instance. Assembly here aims at **MAGs** (metagenome-assembled genomes) and usually needs an extra binning step, with a different pipeline such as `nf-core/mag`.

If you are unsure which kind your data is, coverage is a useful signal: isolates tend to have fairly even coverage, while metagenomes often show several coverage levels across species.

:::note
This course follows the isolate-WGS branch, because that is the case with a pipeline ready to run on the platform. The metagenomics branch shares many of the concepts in the later lessons.
:::

## What input data needs to satisfy

Before assembly, a FASTQ file that is technically clean typically has:

- A matching `R1`/`R2` pair per sample, with the same number of reads.
- Base quality above an acceptable threshold (often Q20–Q30) for most reads.
- Few reads contaminated by adapter or by another sample.
- Sample names that match the names used in the samplesheet.

These points are checked again with tools in [lesson 3](/study/wgs-bacterial-metagenomics/samplesheet-and-input-qc), so at this stage you only need to know what they are.

## Wrapping up

You now have the ideas of a read, coverage, and the difference between isolate WGS and metagenomics. The next lesson brings this data onto the Omicslab platform.
