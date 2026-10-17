---
slug: practised-today
title: "How bioinformatics is practised today"
description: "Few analyses are written from scratch any more. This lesson looks at the modern stack: workflow managers, containers, package managers, and the cloud or HPC the analysis runs on."
order: 2
module: "From the beginning to today"
duration: "25 min"
related:
  - migrate-bash-nextflow-enterprise-pipeline
  - bioinformatics-containers-build-efficient-docker
---

A newcomer might imagine bioinformatics as writing programs to read DNA. A fair amount of it is now assembling existing, tested pieces and knowing how to read them. The change is recent, and it comes from advances in software and infrastructure rather than from biology alone.

## From scripts to pipelines

An analysis almost always has several steps, where one step's output feeds the next. Running them as a single long script works once; it becomes fragile as soon as data, tools or people change.

A **workflow manager** — Nextflow, Snakemake, WDL or CWL are common — describes the steps and their connections, then handles the details: running steps in the right order, in parallel where possible, restarting after a failure, and reusing results that are still valid. In practice this moves the analyst's effort from babysitting commands to describing the analysis.

## Each step in a container

A tool often behaves differently across machines because of library or system versions. A **container** packages a tool with everything it needs into one image, so it runs the same way everywhere. Docker is the common format; on shared clusters, Singularity or Apptainer usually take its place. Pipelines such as those in nf-core run each step in its own container for this reason.

## Managing the tools themselves

Underneath the pipeline, tools still have to be installed. Package managers such as conda — with the bioconda channel for biology — and newer tools such as Pixi record exact versions in a lockfile, so "install it again" reproduces the same environment rather than whatever is newest today.

## Where the work runs

The compute is increasingly rented or shared rather than sitting under the desk:

- A laptop is fine for small tests and for learning.
- A shared **HPC** cluster (often scheduled by Slurm) is common in labs and institutes.
- **Cloud** providers offer on-demand machines and object storage (such as S3), billed by use, which suits analyses that are bursty or very large.

Platforms such as Omicslab sit on top of this layer: they connect storage and compute once, then let an analyst pick a packaged pipeline, fill in the inputs and resources, and follow the run.

## Why this matters for a newcomer

Because the pieces are packaged and shared, the skill that pays off is not memorising tools. It is:

- reading a pipeline and knowing what each step does;
- knowing where to look for a step that already exists;
- understanding what makes a result reproducible (the subject of a later lesson).

![The modern stack: pipeline, containers, package managers, and compute](./imgs/modern-stack.svg "Figure 1. Layers of a modern analysis — workflow manager, containers, package management, and the compute underneath.")

## Wrapping up

Today's practice rests on shared pipelines and infrastructure, built over the last decade. The next lesson looks at the boundary all of it acts on: the point where biological material becomes data a computer can read.
