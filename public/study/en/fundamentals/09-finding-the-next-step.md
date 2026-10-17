---
slug: finding-the-next-step
title: "When no ready tool fits: finding a step"
description: "How to turn a question nobody has packaged into a step of your own: name the step, find existing tools, try it on small data, package it, then verify."
order: 9
module: "Doing it reliably"
duration: "25 min"
related:
  - customize-nf-core-modules-gianglabs
  - test-type-in-bioinformatics
---

There will be a point where your question needs a step that no packaged pipeline offers. That is when the important skill is *knowing where to look*, rather than having the answer memorised.

## Five steps to add a step

1. **Name the step by its input and output.** For example: "takes a FASTA file of sequences, returns a table of matches". Once you can describe it that way, you can go looking.
2. **Find existing tools.** Before writing anything, look in the module libraries of the workflow managers, in bioconda, and in the tool's documentation or paper. Prefer a tool that is still maintained.
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
The goal is not to remember every tool, but to know how to find, try and verify one. That skill keeps its value as tools change — which, as the history of the field shows, they keep doing.
:::

## Wrapping up the course

You have the practical picture: how bioinformatics grew from reading one sequence to running global pipelines; where software meets biological data; what the data and the algorithms are; how an analysis is put together and who does it; and why reproducibility and a habit of verifying are what make the results worth trusting.
