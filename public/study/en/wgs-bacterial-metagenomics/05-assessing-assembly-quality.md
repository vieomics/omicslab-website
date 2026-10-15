---
slug: assessing-assembly-quality
title: "Assessing assembly quality"
description: "Read N50, contig count, coverage and gene completeness to decide whether an assembly is good enough for the next analysis."
order: 5
module: "Genome assembly"
duration: "30 min"
related:
  - bacterial-genome-assembly-without-coding
---

An assembly can look "finished" while still missing or carrying genetic material. Quality assessment is therefore required before annotation or comparison across samples. Tools such as QUAST collect the metrics below into one report.

## The main metrics

- **Total assembly length.** Compare against the expected genome size of the species. Much shorter often means part of the genome is missing.
- **Contig count.** Fewer and longer is generally better; an ideal bacterial genome can fit in a handful of contigs, but this depends heavily on the data.
- **N50.** The contig length such that half of the assembly's bases sit in contigs at least that long. A high N50 means longer joined stretches.
- **Coverage.** How well reads cover the assembly; uneven coverage can hint at plasmid or sample contamination.
- **Completeness and contamination.** A gene-based tool (BUSCO, or CheckM for MAGs) reports how many expected genes the assembly contains and whether unexpected material is mixed in.

![A QUAST report with the assembly metrics](./imgs/quast-report.svg "Figure 1. A summary assessment report with contig count, N50 and total length.")

## There is no universal threshold

What counts as "good enough" depends on the research question. For bacterial typing, a few contigs are sometimes enough. To study plasmid structure, a heavily fragmented assembly may be unusable. It is worth recording the metrics with the dataset and tool version, so the result can be reproduced and compared.

:::warning
Do not judge on a single metric. A high N50 with a low total length usually means part of the genome was lost, not that the assembly is better.
:::

## Wrapping up

You now know how to read an assessment report. If the metrics fit the goal, the next step is annotation, to learn what the genome says.

> See how the metrics are read in a worked example: [Building a bacterial genome without coding](/blogs/bacterial-genome-assembly-without-coding).
