---
slug: a-short-history
title: "A short history: how biology became data"
description: "Bioinformatics is younger than it looks. This lesson traces how biology moved from reading a single protein to producing millions of genomes — and where computing entered."
order: 1
module: "From the beginning to today"
duration: "20 min"
related:
  - giab-pilot-study-benchmark-development
---

Bioinformatics is often described as a young field, and in its present form it is. In about seventy years, biology moved from reading one protein at a time to producing millions of genomes, and computing moved with it. This lesson follows that arc, because the shape of the field today — pipelines, containers, enormous datasets — comes from it.

## The first sequences

The starting point is chemical, not digital. In 1955 Frederick Sanger reported the first complete protein sequence, insulin. DNA sequencing followed in 1977, with the Sanger method and, independently, the Maxam–Gilbert method. For the first time, biology had strings that could be stored, copied and compared by machine.

The word *bioinformatics* itself is usually traced to Paulien Hogeweg and Ben Hesper, who used it around 1970 for the study of information processes in biological systems. The idea that biology is, in part, an information science has been present almost from the beginning.

## Comparing sequences becomes a discipline

Once sequences existed, the natural question was: is this one like that one? Early answers came as algorithms and databases:

- Margaret Dayhoff's *Atlas of Protein Sequence and Structure* (1965) collected sequences and introduced substitution matrices — a way to score how likely one amino acid is to replace another.
- Needleman and Wunsch (1970) described an algorithm for aligning two sequences end to end; Smith and Waterman (1981) added a local version that finds the best matching region rather than aligning everything.
- Public databases appeared alongside: the Protein Data Bank (1971), EMBL's nucleotide database (1980) and GenBank (1982).

Alignment scoring and public databases are the two ideas the rest of the field still rests on.

## Searching at scale

Searching every database entry slowly was the next problem. FASTA (1985) and then **BLAST** (1990, Altschul and colleagues) made it practical to search a sequence against a large database quickly, by trading completeness for speed. When the web arrived, these tools became available to anyone with a browser.

In parallel came the largest biology project of the era, the Human Genome Project, running from 1990 to a working draft in 2000 and a finished reference in 2003.

## The data explosion

Around 2005, so-called next-generation sequencing changed the economics of reading DNA. Reads became shorter per run but vastly more numerous, and the cost per base fell far faster than computing improved. Bioinformatics had to adapt:

- new aligners such as Bowtie and BWA (both 2009) mapped reads to a reference at scale;
- SAM/BAM became the standard way to store those alignments;
- variant calling moved from a research topic to a routine step.

The bottleneck shifted from *producing* data to *storing, moving and processing* it.

## From scripts to infrastructure

The most recent shift is organisational. Work that once ran as a personal script now runs as a pipeline:

- **Containers** (Docker, released 2013; Apptainer on shared clusters) package a tool with its environment.
- **Workflow managers** — Snakemake (2012), Nextflow (2013), and later WDL and CWL — describe a chain of steps and run them across many machines.
- **Community pipelines** such as nf-core (from 2018) package tested analyses that others can run without rebuilding them.
- Long-read sequencing, biobanks and national genome programmes pushed dataset sizes into the petabytes.

![A timeline: from the first protein sequence to cloud pipelines](./imgs/bioinformatics-timeline.svg "Figure 1. A short timeline — sequences, alignment algorithms, public databases, next-generation sequencing, and today's pipelines.")

## What the history leaves us with

Two things stay constant across the whole arc. Biology keeps producing data, and computing keeps having to catch up. The interesting work happens where the two meet: at the file, the format, the algorithm and the machine. That meeting point is where this course begins, and the next lesson looks at how the field is practised today.

> For a worked case of how a reference standard was built in this era, see [the GIAB pilot study](/blogs/giab-pilot-study-benchmark-development).
