---
slug: biological-data
title: "What biological data is"
description: "DNA, RNA and protein are strings, but biological data also carries quality, coverage and sample context — and each stage of an analysis stores the data differently."
order: 4
module: "Data and methods"
duration: "20 min"
related:
  - remote-files-htslib-bcftools-samtools
---

Software works on the file that crosses the boundary, so it is worth being precise about what that file contains. Many things in biology can be written as strings, and the field leans on that heavily.

## Biology written as a string

- **DNA** is a long string of four letters: A, T, G, C.
- **RNA** is like DNA but uses U in place of T.
- **Protein** is a string of 20 amino acids, each written as a letter.

The order carries information: a triplet of DNA letters specifies one amino acid in a protein. Many biological questions — what is this gene, are these two organisms related, where is the mutation — become questions of *comparing strings*.

## Data is not only a string

A raw string is not enough to analyse. Biological data also carries:

- **Quality.** A sequencer does not read perfectly; each letter has a confidence score.
- **Coverage.** The same position is read many times; more reads usually means more confidence.
- **Sample context.** Where the sample came from, how it was handled, when. Without this, results are hard to interpret and hard to reproduce.

## Why there are several file formats

Each format stores the data at a different *stage* of the analysis:

- **FASTA** — the sequence alone.
- **FASTQ** — the sequence with a quality score, as the machine read it.
- **BAM/SAM/CRAM** — the sequence already placed against a reference genome.
- **VCF** — the positions that differ from the reference.
- **GFF/GTF** — annotation: where genes and functional regions sit.

![Data changes format through the stages of an analysis](./imgs/data-formats.svg "Figure 1. The same data takes a different shape at each stage.")

:::tip
Before analysing, ask two questions: which stage is the data at, and what sample information comes with it. Those two answers usually decide which tool to use.
:::

## Wrapping up

You now know that biological data is written as strings and carries quality and sample context, and that each stage has its own format. The next lesson opens one algorithm to see how a computer works with these strings.
