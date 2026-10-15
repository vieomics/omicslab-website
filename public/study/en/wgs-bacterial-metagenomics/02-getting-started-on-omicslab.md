---
slug: getting-started-on-omicslab
title: "Getting started on the Omicslab platform"
description: "Create an account, upload data, pick a pipeline and run a first analysis — the operations to know before the course begins."
order: 2
module: "Foundations"
duration: "30 min"
related:
  - how-to-run-nf-core-pipelines-on-omicslab
---

On the Omicslab platform an analysis usually repeats four steps: upload data, choose a pipeline, fill in the parameters and run, then read the results. This lesson walks through each step so you get familiar with the interface; the full, step-by-step walkthrough lives in the companion blog post.

## Account, organization and workspace

After signing in you belong to an **organization** and work inside one or more **workspaces**. Access follows a role: an administrator configures infrastructure and users, while an analyst runs the jobs they have been granted. If this is your first time on the platform, confirm with an administrator that the organization has storage and compute ready.

## Upload data

FASTQ data can be uploaded directly, or the platform can read it from a connected S3-compatible storage area. For large data the second route is usually faster and needs fewer manual steps. Once uploaded, the files appear in the workspace data section and can be used as pipeline input.

![The platform data-upload screen](./imgs/platform-upload.svg "Figure 1. Uploading FASTQ files into a workspace.")

## Choose a pipeline and run

Community pipelines such as `nf-core/bacass` are already packaged, so you mainly declare the input and the resources:

- **Samplesheet** — a table describing each sample: the `R1` and `R2` files and the sample name.
- **Parameters** — the pipeline's options (assembly tool, annotation, for example).
- **Resources** — CPU, memory and machine type for the job; the higher the usage, the higher the cost.

After you press run, the platform streams the log and estimates the cost. A small bacterial assembly job often finishes within tens of minutes, depending on coverage and resources.

:::tip
Try a small sample first. A small run surfaces samplesheet formatting errors early and costs less than a full run.
:::

## Read the results

When the job finishes, the results are stored in the workspace as files and a summary report (often through MultiQC). The results stay there to download or to feed into the next step.

## Wrapping up

You now know the four-step loop of an analysis on the platform. The next lesson prepares the data and the samplesheet for assembly.

> Read the full walkthrough: [How to run nf-core pipelines on the Omicslab platform](/blogs/how-to-run-nf-core-pipelines-on-omicslab).
