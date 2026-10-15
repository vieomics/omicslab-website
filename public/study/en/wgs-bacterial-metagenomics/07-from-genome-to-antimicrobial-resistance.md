---
slug: from-genome-to-antimicrobial-resistance
title: "From genome to antimicrobial-resistance genes"
description: "Find resistance genes in an assembly, and why the presence of a gene is not enough to conclude — illustrated with a blaNDM example."
order: 7
module: "Annotation and interpretation"
duration: "35 min"
related:
  - bla-ndm-on-omicslab
  - bacterial-genome-assembly-without-coding
---

One common use of a bacterial genome is to look for antimicrobial-resistance (AMR) genes. This step's output can influence clinical decisions, so it deserves careful interpretation.

## Finding resistance genes

Tools such as AMRFinderPlus or ResFinder match the assembly against databases of known resistance genes. The output usually includes:

- The name or family of the resistance gene detected.
- The antibiotic class involved.
- The position on a contig or plasmid.
- The degree of match to the reference sequence.

![Resistance-gene detection results on a genome](./imgs/amr-detection.svg "Figure 1. A table of detected resistance genes with position and match.")

## Why "gene present" is not enough

A few questions come up regularly when interpreting the result:

- **Is the gene actually expressed?** Detecting it on DNA says nothing about whether it is transcribed or translated; expression data or a phenotypic test is needed.
- **Is the gene on a plasmid or the chromosome?** Location affects how easily it can spread between strains.
- **Did the tool miss a variant?** A known gene can exist as a variant not yet in the database.
- **How good is the match?** A partial match can be a similar gene rather than the same function.

In one study we rebuilt on the platform, a `blaNDM` detection looked contradictory across genomes. Checking again at the **read** level — instead of relying on the assembly alone — showed the gene sat in a structural stretch that short reads assemble poorly. The case is a reminder that an assembly is a model, not the sample itself.

:::warning
An AMR finding from short-read data is best treated as evidence at the data level, not a clinical conclusion. Confirming a phenotype requires an independent test.
:::

## Wrapping up the course

By now you have been through one full analysis: from FASTQ, through assembly and assessment, to annotation and interpretation. Three habits are worth keeping for later work:

- Record the tool and database versions at every step.
- Test on a small sample before scaling up.
- Re-check important conclusions at the read level or against independent data.

> Read the full case: [From sequencing data to a resistance mechanism in Klebsiella pneumoniae and Pseudomonas aeruginosa](/blogs/bla-ndm-on-omicslab).
