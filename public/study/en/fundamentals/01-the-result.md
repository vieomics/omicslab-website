---
slug: the-result
title: "Where software meets biological data"
description: "A brief introduction to the point where biology becomes data a computer can read, and the finished result the course starts from."
order: 1
module: "Starting from the result"
duration: "15 min"
related:
  - bacterial-genome-assembly-without-coding
---

Bioinformatics begins at a specific moment: when biological material becomes data a computer can read. Before any algorithm runs or any result appears, a wet-lab sample has to cross over into files, formats and numbers.

## Where software meets biological data

On one side sits the biology — a sample, an experiment, a question. On the other sits the software — a file, a format, an algorithm, a computation. The two meet at a concrete point: the data file and the metadata that travels with it.

- A sequencer writes reads into a **FASTQ** file: the sequence plus a quality score for every base.
- Software can act only on that file; the format decides what it is able to see.
- The **metadata** — which sample, how it was prepared — is what makes the result interpretable later.

Everything the course covers depends on this meeting point: what the format allows, how far the quality can be trusted, and what the sample information means. It is also where many problems begin, because a mistake made here is invisible to every algorithm downstream.

![Where a wet-lab sample becomes data a computer reads](./imgs/where-software-meets-data.svg "Figure 1. The hand-off: biology on one side, software on the other, meeting at the data file and its metadata.")

## A result to start from

One way to see the whole chain is to start from a finished result and work backwards. A completed assembly and annotation run leaves a few concrete things:

- **Contigs** — the assembled genome stretches, as a FASTA file.
- **An assessment report** — contig count, N50, total length, to show how complete the assembly is.
- **Annotation output** — the genes found and their predicted function.
- **A resistance-gene list** — if a resistance-gene step was also run.

![The artefacts of an assembly and annotation run](./imgs/result-artifacts.svg "Figure 2. A finished result: contigs, a report, annotation and resistance genes.")

## Three questions, working backwards

From that result, the course asks three questions in turn:

1. **How was it produced?** The result did not appear at once — it passed through a chain of steps.
2. **What does each step do?** Each step is a tool, and a tool is an algorithm with its own assumptions.
3. **Why is it trustworthy and repeatable?** That depends on the input data, on people, and on how versions are recorded.

## How the course answers them

The three questions map to the three parts of the course:

- **How the result is produced** — an analysis is a chain of steps; reading the pipeline that produced the result; and opening one step to see how an algorithm such as BLAST reasons.
- **What stands behind the result** — the data, the people, and why the result can be reproduced.
- **And when a new step is needed** — how to find and verify a step no ready pipeline offers.

:::note
The result here is an example. The next course has you produce one like it yourself on the platform.
:::

## Wrapping up

You have seen where software and biological data meet, and the finished result the course starts from. The next lesson opens the first question: which steps produce that result.
