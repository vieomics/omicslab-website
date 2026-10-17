---
slug: where-software-meets-data
title: "Where software meets biological data"
description: "Every analysis begins at one boundary: a wet-lab sample becomes a file a computer can read. This lesson looks at that hand-off, and at what the data carries with it."
order: 3
module: "Data and methods"
duration: "20 min"
related:
  - unix-pipes-bioinformatics-streaming-data
---

Bioinformatics begins at a specific moment: biological material becomes data a computer can read. Before any algorithm runs or any result appears, a sample has to cross over into files, formats and numbers. Everything downstream depends on how that crossing happens.

## Two sides, one meeting point

On one side sits the biology — a sample, an experiment, a question. On the other sits the software — a file, a format, an algorithm, a computation. They meet at a concrete point: the data file and the metadata that travels with it.

- A sequencer writes reads into a **FASTQ** file: the sequence plus a quality score for every base.
- Software can act only on that file; the format decides what it is able to see.
- The **metadata** — which sample, how it was prepared — is what makes the result interpretable later.

A useful habit is to name this boundary whenever an analysis goes wrong. A mistake made here — a swapped sample, a wrong reference, a mislabelled file — is invisible to every algorithm downstream, because the software has no way to know the input was wrong.

![The hand-off: biology on one side, software on the other, meeting at the data file](./imgs/where-software-meets-data.svg "Figure 1. The meeting point between a wet-lab sample and the software that processes it.")

## What crosses the boundary

Not everything biological survives the crossing intact. What a file usually carries forward is:

- **Sequence** — the letters themselves.
- **Quality** — how confident the machine was at each position.
- **Context** — identifiers, sample descriptions, and how the data was produced.

The first two are what algorithms read. The third is what makes the result mean something, and it is the part most easily lost between the bench and the computer.

## Why the format matters

The format is not an incidental detail. It decides what questions are cheap to ask. A sequence with quality scores can be filtered; a sequence alone cannot. An alignment file can be scanned by region; a raw read file cannot. Choosing a format is therefore part of choosing what the analysis can do.

## Wrapping up

You have seen where the two worlds meet and what crosses the boundary. The next lesson opens up the data itself: the kinds of biological data and the formats that store them.
