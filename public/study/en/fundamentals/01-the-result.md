---
slug: the-result
title: "The result you will get"
description: "The starting point of the course: look at a finished result — an annotated bacterial genome with its resistance genes — and ask what produced it."
order: 1
module: "Starting from the result"
duration: "15 min"
related:
  - bacterial-genome-assembly-without-coding
---

A bioinformatics analysis ends in a result: an assembled and annotated genome, for instance. This course starts from such a result and asks: *what actually happened to produce it?* We work backwards from the result to the steps.

## A finished result

A completed assembly and annotation run leaves a few concrete things:

- **Contigs** — the assembled genome stretches, as a FASTA file.
- **An assessment report** — contig count, N50, total length, to show how complete the assembly is.
- **Annotation output** — the genes found and their predicted function.
- **A resistance-gene list** — if a resistance-gene step was also run.

![The artefacts of an assembly and annotation run](./imgs/result-artifacts.svg "Figure 1. A finished result: contigs, a report, annotation and resistance genes.")

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

You have looked back at the result and the three guiding questions. The next lesson opens the first one: which steps produce the result.
