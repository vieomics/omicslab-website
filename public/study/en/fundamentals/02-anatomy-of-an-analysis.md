---
slug: anatomy-of-an-analysis
title: "What a bioinformatics analysis is made of"
description: "An analysis is a chain of steps: each step has an input, a tool, and an output. Knowing the pattern lets you read any pipeline instead of memorising one."
order: 2
module: "How the result is produced"
duration: "20 min"
related:
  - migrate-bash-nextflow-enterprise-pipeline
---

A bioinformatics analysis, simple or complex, usually follows one pattern: a chain of steps where the output of one step is the input of the next. Learn the pattern and you can read any pipeline rather than memorising each one.

## Every step has three parts

For each step, ask three questions:

- **What is the input?** For example, the FASTQ files.
- **What does the tool do?** For example, trim adapter and low-quality bases.
- **What is the output?** For example, the cleaned FASTQ files.

Joining the steps in order gives a *directed graph* (the output of an earlier step flows into a later one). A pipeline is just that graph, written down so a machine can run it.

## Reference data is an input too

Many steps need more than your data: they need **reference data** — a reference genome, a list of known genes, an annotation database. This is a quiet but important input, because different reference versions can give different results. That is why the exact version used should be recorded.

## Quality checks sit at the hand-offs

Quality should be checked each time data moves from one step to the next: before analysis (are the reads good), after assembly (is the result complete), and before interpretation. Checking early is usually cheaper than fixing later.

![Steps linked in sequence, each with an input and an output](./imgs/analysis-steps.svg "Figure 1. An analysis is a chain of steps, each with an input, a tool and an output.")

:::warning
A pipeline that "ran without errors" has not necessarily produced a correct result. A machine not crashing does not mean the output is sensible — which is why checks belong at every step.
:::

## Wrapping up

You now have a pattern for reading an analysis: ask the input, tool and output at each step. The next lesson opens the pipeline that produced the result, to see how those steps are packaged.
