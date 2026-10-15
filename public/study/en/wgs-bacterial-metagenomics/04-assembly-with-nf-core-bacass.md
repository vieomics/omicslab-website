---
slug: assembly-with-nf-core-bacass
title: "Assembling a bacterial genome with nf-core/bacass"
description: "What assembly is, why short-read and long-read pipelines use different tools, and how to run nf-core/bacass on the platform."
order: 4
module: "Genome assembly"
duration: "35 min"
related:
  - bacterial-genome-assembly-without-coding
---

Assembly is the act of stitching short reads back into longer continuous stretches (**contigs**). For bacteria the aim is usually one complete chromosome, together with any plasmids. In practice the result is often a set of contigs, and its quality depends on the sequencing technology and the coverage.

## Why short-read and long-read tools differ

- **Short reads (Illumina).** High accuracy but short, so repetitive regions are ambiguous. Assemblers such as Unicycler build a graph from overlapping stretches (a de Bruijn graph) to resolve them.
- **Long reads (PacBio, Nanopore).** Long reads bridge repetitive regions, but per-base accuracy is lower, so a polishing step is needed. Tools such as Flye are often used on this branch.

Because the two branches use different tools, the pipeline picks a branch from the data type you declare. Some setups combine both (hybrid).

![The main steps of an assembly pipeline](./imgs/assembly-workflow.svg "Figure 1. Quality control, assembly, polishing and assessment inside a bacterial assembly pipeline.")

## Running nf-core/bacass

`nf-core/bacass` bundles the steps usually needed: read trimming, assembly, polishing and annotation. On the platform these run inside containers, so you mainly declare three things:

- **Input** — the samplesheet from [lesson 3](/study/wgs-bacterial-metagenomics/samplesheet-and-input-qc).
- **Parameters** — read type, assembly tool and annotation options.
- **Resources** — CPU and memory per step.

For a small bacterial sample, a test run on one sample is a sensible way to confirm the configuration before scaling up. The exact tool set depends on the pipeline version you choose; check that version's documentation for detail.

![The job-configuration screen for an assembly run](./imgs/platform-run-parameters.svg "Figure 2. Declaring parameters and resources for an assembly job.")

## What comes back

When the run finishes, the results usually include:

- **Contigs** in FASTA format (a `.fasta` file).
- A quality report for the assembly.
- Gene annotation output (depending on configuration).
- Per-step logs and a summary report.

## Wrapping up

You now have an assembly from raw data. Before using it downstream, its completeness needs checking — the subject of lesson 5.

> Read the full walkthrough: [Building a bacterial genome without coding](/blogs/bacterial-genome-assembly-without-coding).
