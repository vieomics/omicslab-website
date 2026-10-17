---
slug: environments-and-reproducibility
title: "Why results need to be reproducible: git, environments and containers"
description: "Three tools solve three different problems: git stores the history of changes, an environment manager pins versions, and a container packages the whole system. Together they make a result reproducible."
order: 8
module: "Doing it reliably"
duration: "25 min"
related:
  - how-to-version-control-git-bioinformatics-part-1
  - pixi-is-new-conda-based-era
  - bioinformatics-containers-build-efficient-docker
---

A result is only trustworthy if someone else can run it again and get something similar. That does not happen by itself: tools change version, environments differ, a parameter gets edited. The three tools below solve three parts of the problem, and each maps to a layer of the modern stack.

## Git: remember who changed what

**Git** stores the history of changes to code and configuration. Every change is recorded with who made it and why, so it can be reviewed, compared and restored. For an analysis, git keeps *how* the analysis was described, not only the final result.

## Environment managers: pin versions

The same tool at a different version can give a different result. Environment managers such as **Pixi** or conda record the exact version of every tool in a lockfile, so the next run installs that version — instead of "the latest", which may have changed.

## Containers: package the whole system

Installing a tool also depends on the libraries and operating system of the machine. A **container** packs a tool together with everything it needs into one image that runs the same way everywhere. This is the layer that makes an analysis portable between a laptop, a cluster and the cloud.

![Three layers that make a result reproducible: history, versions and a packaged environment](./imgs/reproducibility-layers.svg "Figure 1. git, environments and containers solve three different parts of reproducibility.")

:::tip
Reproducibility is a habit, not a tool: pin versions, record parameters, and re-run on a small dataset before trusting a result.
:::

## Wrapping up

You now know why git, environments and containers go together. The final lesson covers the harder case: when no ready pipeline has the step you need.
