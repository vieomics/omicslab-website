---
slug: how-an-algorithm-works
title: "How an algorithm works: BLAST as an example"
description: "BLAST finds a sequence similar to yours inside a large database. This lesson walks through its four steps with ideas and a short piece of pseudocode, no programming needed."
order: 5
module: "Data and methods"
duration: "30 min"
related:
  - bioinformatics-computing-resource-optimization-part1
---

The most common question asked of a sequence is: "what is it similar to?" The tool that answers it, **BLAST**, is a good example of how a computer reasons about biological data, because many other tools reuse the same ideas.

## The question

You have a query sequence (call it `Q`) and a database of many sequences (`D`). You want to know whether anything in `D` is similar to `Q`, where it matches, and how strong the match is.

## The "correct but slow" way

The simplest approach compares every possible way of lining `Q` up with each sequence: inserting, deleting or substituting letters at every position. It gives the complete answer, but the number of alignments grows very fast with sequence length. Against a large database it is far too slow to use.

## How BLAST does it: four steps

BLAST is faster because it only looks at places that *might* match, instead of every possibility:

1. **Seed.** Cut `Q` into short words. Find words that appear in both `Q` and a sequence in `D`.
2. **Extend.** From each seed, grow the match outwards in both directions.
3. **Score.** Give the match a score: matching letters add, mismatches and gaps subtract.
4. **Judge significance.** Not every high score matters. BLAST computes an **E-value** — the number of matches with that score one would *expect by chance* in a database that large. A small E-value means it is unlikely to be random, so it is worth attention.

```text
input:  query sequence Q, database D
output: matches, ranked by E-value

for each sequence S in D:
    find short words present in both Q and S     # 1. seed
    for each word found:
        extend the match outwards in both directions   # 2. extend
        score the match                                 # 3. score
filter matches by E-value                            # 4. significance
return the ranked list of matches
```

## What to remember

BLAST does not try every possibility — it is a **heuristic**: fast, but it can miss weak similarities that the slow way would find. That is a deliberate trade-off between speed and completeness, and it is the same trade-off that shaped the history of the field.

![BLAST's seed and extend steps](./imgs/blast-seed-extend.svg "Figure 1. Find a short matching word (a seed), then grow the match outwards.")

:::note
Most bioinformatics tools are an algorithm plus assumptions and one trade-off. Knowing that trade-off is knowing when to trust the result.
:::

## Wrapping up

You have seen how a computer compares strings through seeds, extension, scoring and the E-value. The next lesson steps back and looks at an analysis as a whole, as a chain of such steps.
