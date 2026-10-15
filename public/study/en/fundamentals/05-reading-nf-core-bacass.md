---
slug: reading-nf-core-bacass
title: "Reading a pipeline: nf-core/bacass"
description: "nf-core/bacass packages the steps of bacterial genome assembly. This lesson looks at what it does and why understanding each step matters more than just pressing run."
order: 5
module: "Tools, reproducibility and learning on your own"
duration: "25 min"
related:
  - bacterial-genome-assembly-without-coding
  - how-to-run-nf-core-pipelines-on-omicslab
---

If you read the lesson on BLAST, you saw a tool that does *one* job. `nf-core/bacass` is the opposite: it joins several tools into one complete pipeline to assemble a bacterial genome.

## nf-core and Nextflow, briefly

**nf-core** is a community collection of ready-made pipelines for common analyses. They run with **Nextflow** — a program that wires the steps together, splits the work, and runs each step inside a container. You do not write the pipeline; you *use* it.

## What bacass does, in ideas

`nf-core/bacass` goes through four groups of work, following the pattern from the previous lesson:

1. **Clean the reads** — trim adapter and low-quality bases.
2. **Assemble** — join the short reads into longer stretches (contigs).
3. **Assess** — check how complete the assembly is.
4. **Annotate** — find genes and assign them a function.

Each group is a small tool; the pipeline only joins them and runs each tool in its own container.

![The four groups of steps inside nf-core/bacass](./imgs/bacass-steps.svg "Figure 1. bacass links the cleaning, assembly, assessment and annotation steps.")

## Why understanding the steps matters

When you only press run, you get a result without knowing where it came from. When you understand the steps, you can:

- guess which step a failure came from;
- know what each output file means;
- know which parameter affects the final result.

## On the platform

On the Omicslab platform, pipelines such as bacass are already packaged. You mainly declare three things: the samplesheet (which files belong to which sample), the parameters, and the job resources. The difficult part — installing tools and wiring the steps — is handled by the pipeline.

:::note
You do not need to memorise parameters. Open the documentation page for the exact version you run; it lists the parameters and describes the outputs. That is how to look things up instead of memorising them.
:::

## Wrapping up

You now know what steps bacass contains and how to read its documentation. The next two lessons cover what makes a result trustworthy, and how to find a step when a ready pipeline is not enough.
