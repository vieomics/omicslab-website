---
slug: finding-the-next-step
title: "When a ready pipeline is not enough: finding a step"
description: "How to turn a question nobody has packaged into a step of your own: name the step, find existing tools, try it on small data, package it, then verify."
order: 8
module: "What stands behind the result"
duration: "25 min"
related:
  - customize-nf-core-modules-gianglabs
  - test-type-in-bioinformatics
  - bioinformatics-containers-build-efficient-docker
---

There will be a point where your question needs a step no packaged pipeline offers. That is when the important skill is *knowing where to look*, rather than having the answer memorised.

## Five steps to add a step

1. **Name the step by its input and output.** For example: "takes a FASTA file of contigs, returns a list of genes". Once you can describe it that way, you can go looking.
2. **Find existing tools.** Before writing anything, look in the nf-core module library, in bioconda, and in the tool's documentation or paper. Prefer a tool that is still maintained.
3. **Try it on small, known data.** Run the tool on a small sample whose expected result you know. If the output matches, you understand the tool correctly; if not, that is a signal to read more closely.
4. **Package it.** If the step will be reused, wrap it in a container and pin the version, so the next run is identical.
5. **Integrate and verify.** Connect the new step into the analysis, and check that the overall result is still correct — with a comparison or a small test.

![From a question to a verified step](./imgs/next-step.svg "Figure 1. A new step is added in five stages, always ending in verification.")

## Learning efficiently on your own

Three habits make learning faster without memorising:

- **Read the tool's documentation, for the exact version.** Parameters and behaviour change between versions.
- **Read the Methods section of the tool's paper.** It states the assumptions and trade-offs that short documentation often skips.
- **Change one thing at a time.** When a result looks odd, change a single parameter and re-run, to learn what caused the difference.

:::tip
The goal is not to remember every tool, but to know how to find, try and verify one. That skill keeps its value as tools change.
:::

## Wrapping up the course

You now have the background picture: what biological data is, how an algorithm such as BLAST reasons, what steps an analysis is made of, who does what, why results need to be reproducible, and how to find the next step yourself. The next course — bacterial genome assembly — applies these ideas in a concrete procedure.
