---
slug: biological-data
title: "The data behind the result"
description: "A result begins with data. DNA, RNA and protein are strings; but biological data also carries quality, coverage and sample information — and each kind is stored in its own format."
order: 5
module: "What stands behind the result"
duration: "20 min"
related:
  - unix-pipes-bioinformatics-streaming-data
---

Bioinformatics starts from a simple idea: many things in biology can be written as a string of characters. Knowing what the data is written in helps you see what a computer can do with it.

## Biology written as a string

- **DNA** is a long string of four letters: A, T, G, C.
- **RNA** is like DNA but uses U in place of T.
- **Protein** is a string of 20 amino acids, each written as a letter.

The order carries information: a triplet of DNA letters specifies one amino acid in a protein. As a result many biological questions — what is this gene, are these two organisms related, where is the mutation — become questions of *comparing strings*.

## Data is not only a string

A raw string is not enough to analyse. Real biological data also carries:

- **Quality.** A sequencer does not read perfectly; each letter has a confidence score.
- **Coverage.** The same position is read many times; more reads usually means more confidence.
- **Sample information.** Where the sample came from, how it was handled, when. Without this, results are hard to interpret and hard to reproduce.

## Why there are several file formats

Each format stores the data at a different *stage* of the analysis:

- **FASTA** — the sequence alone.
- **FASTQ** — the sequence with a quality score, exactly as the machine read it.
- **BAM/SAM/CRAM** — the sequence already placed against a reference genome.
- **VCF** — the positions that differ from the reference.
- **GFF/GTF** — annotation: where genes and functional regions sit.

![Data changes format through the stages of an analysis](./imgs/data-formats.svg "Figure 1. The same data takes a different shape at each stage.")

:::tip
Before analysing, ask two questions: which stage is the data at, and what sample information comes with it. Those two answers usually decide which tool to use.
:::

## Wrapping up

You now know that biological data is written as strings and carries quality and sample information. The next lesson looks at the people behind the result.
