---
slug: the-result
title: "The result you have in hand"
description: "The starting point of the course: look back at the result from the assembly course — an annotated genome with its resistance genes — and ask what produced it."
order: 1
module: "Starting from the result"
duration: "15 min"
related:
  - bacterial-genome-assembly-without-coding
---

If you finished the assembly course, you have a result in hand. This course adds no new result; it goes back and answers a simple question: *what actually happened to produce it?* We start from the result, then work backwards.

## The result you already have

An assembly run usually leaves a few concrete things:

- **Contigs** — the assembled genome stretches, as a FASTA file.
- **An assessment report** — contig count, N50, total length, to show how complete the assembly is.
- **Annotation output** — the genes found and their predicted function.
- **A resistance-gene list** — if you also ran a resistance-gene step.

![The artefacts of an assembly and annotation run](./imgs/result-artifacts.svg "Figure 1. The result from the previous course: contigs, a report, annotation and resistance genes.")

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
It is fine if you have not run the assembly course. Each idea here stands on its own; the result is only a starting point. If you prefer, read the assembly course first and come back.
:::

## Wrapping up

You have looked back at the result and the three guiding questions. The next lesson opens the first one: which steps produce the result.
