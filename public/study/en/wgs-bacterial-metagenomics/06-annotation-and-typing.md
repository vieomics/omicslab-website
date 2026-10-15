---
slug: annotation-and-typing
title: "Annotating and typing a bacterial genome"
description: "Assign genes and functions to an assembly, then use stable features such as MLST and plasmids to recognise a strain."
order: 6
module: "Annotation and interpretation"
duration: "30 min"
related:
  - bacterial-genome-assembly-without-coding
---

An assembly is only a string of characters until genes and functions are assigned to it. **Annotation** turns that string into a readable description, while **typing** helps compare one strain with another.

## Gene and functional annotation

Annotation tools such as Prokka or Bakta scan for open reading frames (ORFs), predict genes, then match them against databases to assign function. The output usually includes:

- **CDS** (coding sequences) — protein-coding regions and their predicted products.
- **RNA** — tRNA and rRNA genes.
- **Functional annotation** — a gene or protein-family name inferred from a database.
- **Output files** in formats such as GFF3 and GenBank for the next step.

![A gene map across a bacterial genome after annotation](./imgs/annotation-map.svg "Figure 1. A map of the genes and functional regions assigned across the genome.")

Annotation quality depends on the reference database. When a gene does not match, the result is often written as a "hypothetical protein" — a reflection of current knowledge, not necessarily proof that the gene does not exist.

## Typing

Typing relies on loci that are more stable across strains:

- **MLST (multilocus sequence typing).** Sequence a set of housekeeping genes and combine them into a **sequence type**. This allows a strain to be compared against a global MLST database.
- **Ribosomal MLST or whole-genome typing.** Use more loci for finer resolution than traditional MLST.
- **Plasmid features.** Identifying plasmid groups (through MOB-suite, for example) matters because plasmids often carry resistance genes and can pass between strains.

:::tip
Typing only means something against a reference set. Record the database and version used, because the sequence type assigned can change when the database is updated.
:::

## Wrapping up

You now have a genome with genes and functions, plus typing information. The final lesson moves to one concrete use: finding resistance genes and interpreting the result.
