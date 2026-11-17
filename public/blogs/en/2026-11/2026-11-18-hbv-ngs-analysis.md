---
slug: hbv-ngs-analysis-guide
title: "A practical guide to HBV genome analysis with NGS"
description: "HBV has four genome forms, four overlapping ORFs and an arbitrary coordinate origin. This guide covers the biology to know before mapping short reads, how to handle the circular genome, call a consensus and build a phylogeny, using a public dataset as a worked example."
authors: [vieomics]
tags: [hbv, viral-genomics, bioinformatics]
image: ./imgs/cover-hbv-genome-biology.png
citations:
  - "https://doi.org/10.1128/MMBR.64.1.51-68.2000"
  - "https://doi.org/10.1136/gutjnl-2015-309809"
  - "https://doi.org/10.1038/s41575-020-0296-6"
  - "https://doi.org/10.3390/v13020180"
  - "https://www.ncbi.nlm.nih.gov/bioproject/PRJNA659786"
---

:::info
**This is the first of two posts on HBV analysis from NGS data.** It covers the biology of the genome and the path from raw reads to a consensus and a phylogeny. [The second post](/en/blogs/reading-hbv-ngs-results) looks at how to read the results — coverage, `N`, variants, recombination — and at the limits of a small dataset.

The worked example uses five public HBV samples from Brazil (PRJNA659786) and ten complete GenBank genomes. The code, parameters and reference results are in [vieomics/solutions](https://github.com/vieomics/solutions/tree/main/hbv-genome-short-read-analysis).
:::

## Why HBV analysis is not bacterial analysis

HBV is a small DNA virus with a genome of about 3.2 kb, often described as “circular”. That description is incomplete. A bacterial chromosome is typically a covalently closed, double-stranded DNA circle that replicates semiconservatively from a defined origin. HBV has at least four genome forms, and which one is present depends on the stage of infection and the tissue being sampled.

![The four HBV genome forms: rcDNA, cccDNA, dslDNA and integrated DNA, with a linear ORF map](./imgs/hbv-genome-forms.png)

*Figure 1 — HBV genome forms. rcDNA and cccDNA are both circular in shape but differ in covalent closure; dslDNA and integrated HBV DNA are linear. The ORF map uses NC_003977.2 coordinates: P 2,309–3,182 + 1–1,625; S 157–837, with preS1 2,850–3,173 and preS2 3,174–3,182 + 1–156; C 1,816–2,454, with preC 1,816–1,902; X 1,376–1,840. The top panels are schematic; the ORF map is to scale. Sources: Seeger & Mason (2000), Nassal (2015), Revill et al. (2020), Tu et al. (2021), and the NC_003977.2 GenBank annotation.*

- **Virion rcDNA.** Most infectious virions carry relaxed circular, partially double-stranded DNA (rcDNA). The minus strand is complete and has the viral polymerase (P) covalently attached at its 5′ end. The plus strand is shorter and has a gap. The strands are not covalently closed, so the molecule is circular in shape but not a closed circle.
- **Nuclear cccDNA.** In the nucleus, rcDNA is repaired to covalently closed circular DNA (cccDNA). This is the episomal transcriptional template that persists in infected hepatocytes.
- **Linear forms.** A minority of virions package double-stranded linear DNA (dslDNA). HBV DNA can also integrate into the host genome; the integrated form is linear and often fragmented. Neither form is circular.
- **The database sequence.** A GenBank/RefSeq “complete genome” record is typically a linear representation of the circular genome. The coordinate origin is a database convention, not a single biological replication origin. In NC_003977.2 the polymerase ORF crosses it (2,309–3,182 + 1–1,625), so a naive linear mapping or alignment cuts P into two pieces.

Replication is also not bacterial. cccDNA is transcribed into pregenomic RNA (pgRNA), and pgRNA is reverse-transcribed into new rcDNA. The virion carries DNA, but the step that copies the genome is RNA-dependent. Assumptions and tools built for bacterial DNA do not transfer unchanged.

## Four overlapping ORFs and an arbitrary origin

The 3.2 kb genome contains four main ORFs, and they overlap substantially:

| ORF | Coordinates on NC_003977.2 | Product |
|---|---|---|
| P | 2,309–3,182 + 1–1,625 | Polymerase / reverse transcriptase |
| S | 157–837; preS1 2,850–3,173; preS2 3,174–3,182 + 1–156 | Three surface proteins (L, M, S) from alternative start codons |
| C | 1,816–2,454; preC 1,816–1,902 | Precore / core |
| X | 1,376–1,840 | HBx |

P overlaps S, C and X; C also overlaps X. A single nucleotide change can therefore be synonymous in one reading frame and nonsynonymous in another. Variant annotation needs to translate each frame separately and record which ORF a position belongs to. Translating only one frame makes the synonymous/nonsynonymous counts hard to interpret.

The coordinate origin is a second trap. Position 1 in NC_003977.2 is not a biological replication start site; it is a record convention. P starts at 2,309, runs to 3,182 and continues from 1 to 1,625. preS2 also crosses the origin. If reads are mapped to a linear reference without handling the circle, reads that start near the end of the genome do not map in one piece, and the ends of P or preS2 can look missing.

## Putting a circular genome on a linear reference

There are several ways to handle a circular genome. In this example we use a simple, checkable approach: append the first 500 bp of the reference to its 3′ end, producing a 3,682 bp reference. Reads that cross the origin then align in one piece across the junction. After mapping, every position is projected modulo 3,182 back to the original coordinate system.

![Circular mapping: a read crossing the origin and projection modulo 3,182](./imgs/hbv-circular-mapping.png)

*Figure 2 — Circular mapping. The first 500 bp of the reference are duplicated at the 3′ end; a read crossing the origin aligns as one fragment, and positions are projected modulo 3,182. This keeps reads that a linear reference would discard.*

In the circular-mapping step of this example, 7,312–47,710 reads per sample crossed the origin. That is not a decorative detail: without the circular step, part of the read evidence — especially evidence for the ends of P — is left out. Some modern tools support circular references directly; the principle is the same: reads crossing the origin must map intact, and coordinates must be projected consistently.

## The analysis path from raw reads

The example follows the steps below. This is a minimal framework for HBV genome analysis; depending on the question, you may add cccDNA-specific assays, integration analysis or drug-resistance genotyping.

| Step | Tool / approach | What to check |
|---|---|---|
| Quality control and adapter trimming | `fastp` | Reads retained, Q30, duplication |
| Read mapping | Bowtie2 to a circular-aware HBV reference | Mapping rate, depth, origin-spanning reads |
| Variant calling | BCFtools mpileup/call, depth and allele-fraction filters | SNPs, indels, position in each ORF |
| Consensus | BCFtools consensus with a depth threshold | `N` at low depth; whether indels are applied |
| Multiple alignment | MAFFT | Columns, gaps, `N`, gap-rich regions |
| Phylogeny | IQ-TREE 2 with ModelFinder, UFBoot and SH-aLRT | Model, support, missing-data uncertainty |
| Recombination screen (optional) | PhiPack | Population assumptions, missing data, no overclaim |

In the public example, the upstream step used `nf-core/viralrecon` (Illumina/metagenomic with a custom HBV reference) and the downstream steps used MAFFT 7.526, IQ-TREE 2.4.0, BCFtools and Python/Biopython. The commands and versions are pinned in `pixi.lock` and in the technical repo's manifest.

## Consensus: what is recorded and what is not

The consensus in this example is a **reference-guided consensus**, not a de novo assembly. It keeps the 3,182 bp NC_003977.2 coordinate frame. At each position, the base is called from mapped reads; positions below 10× or with no covering read are written as `N`. Indels are not applied to the consensus. As a result:

- `N` is not a gap. It means there was not enough evidence to call a base at that position, not that the virus has lost the base.
- Consensus length is not assembly length. It is fixed by the reference.
- Deletions relative to the closest reference are reported separately. In this example there are six deletion candidates; they are not drawn as gaps in the consensus.

This matters for samples with low coverage. In the example, B575/2014 is 34.9% `N` and B364/2014 is 16.9% `N`; both are incomplete genomes. Even B215/2014 and B3392/2014, with about 0.5% `N`, carry a short 16–17 bp `N` run around positions 2,856–2,872. Reading the consensus without those blocks can suggest a completeness the data do not support.

## Phylogeny: a hypothesis about relationships

We aligned the five consensus genomes with ten public genomes using MAFFT and built a tree with IQ-TREE 2. The alignment has 3,221 columns, 845 variable sites and 535 parsimony-informative sites. Thirty-nine columns have more than 50% gaps, concentrated in two blocks; we kept them rather than trimming, so those regions should be treated as uncertain.

IQ-TREE selected TVM+F+I+G4 and ran 1,000 UFBoot and 1,000 SH-aLRT replicates. In the displayed tree, the three genotype A samples form a clade with the A2 reference KJ854710.1 (100/100); the two genotype D samples fall in the D clade with NC_003977.2 and the Brazilian D references, but the D pair itself has only 28.5/61 support, consistent with the missing data in B364/2014. The B/C clade has 97.4/92 support; E and F provide outgroup context.

Such a tree is a hypothesis about relationships, not evidence of a transmission chain. With 15 sequences, two incomplete genomes and a deliberately curated reference panel, the tree is enough to check genotype placement and spot anomalies, but not enough to infer geographic origin or infection timing.

## A public worked example

The example dataset contains five samples from PRJNA659786 (Brazil; three genotype A, two genotype D) and ten complete GenBank genomes (A, B, C, D, E, F). The mapping reference is NC_003977.2, genotype D, 3,182 bp.

| Item | Result in the example |
|---|---|
| Taxa in the tree | 15 |
| Alignment | 3,221 columns; 845 variable; 535 parsimony-informative |
| Variants vs NC_003977.2 | 1,942 SNP positions; no indels in the VCF |
| Versus the closest reference | 633 region-annotated nucleotide rows; 473 unique positions; 593 amino-acid rows |
| Deletion candidates | 6 |
| Incomplete genomes | B575/2014, B364/2014 |

The numbers are explained in [the second post](/en/blogs/reading-hbv-ngs-results): why 1,942 SNPs are not 1,942 mutations, why `N` is not a gap, and why a recombination signal is not a breakpoint.

## Reproduce and access

The full analysis can be reproduced on the Omicslab platform. The upstream `nf-core/viralrecon` step runs as an analysis job with a custom HBV reference; the alignment, phylogeny and variant annotation steps run in a version-pinned `pixi` environment. Public inputs, reference results and manifests are in the [vieomics/solutions repository](https://github.com/vieomics/solutions/tree/main/hbv-genome-short-read-analysis), so the workspace can be reopened, the data downloaded, or the run repeated from the beginning.

If you only want to check the result, the repository contains the consensus sequences, VCFs, alignment, tree and summary tables. If you want to run it on your own data, start from the samplesheet and the reference configuration, then keep the quality-control and circular-mapping checks.

## Points to remember

- **HBV is not a bacterium.** rcDNA, cccDNA, dslDNA and integrated DNA are different forms; do not assume the sample contains a single circular molecule.
- **The coordinate origin is a convention.** P and preS2 cross it; mapping without circular handling loses evidence at the genome ends.
- **Four ORFs overlap.** One nucleotide can sit in two reading frames; annotate each frame.
- **The consensus is reference-guided.** `N` is not a gap; indels are not automatically applied; consensus length is not assembly length.
- **Read coverage together with breadth.** High mean depth does not guarantee even coverage; report breadth and `N`.
- **A tree is a hypothesis.** Low support and missing data must be stated; a 15-taxon tree is not an epidemiological analysis.

## References

- Seeger C, Mason WS. Hepatitis B virus biology. *Microbiol Mol Biol Rev.* 2000;64(1):51–68. [doi:10.1128/MMBR.64.1.51-68.2000](https://doi.org/10.1128/MMBR.64.1.51-68.2000)
- Nassal M. HBV cccDNA: viral persistence reservoir and key obstacle for a cure of chronic hepatitis B. *Gut.* 2015;64(12):1972–1984. [doi:10.1136/gutjnl-2015-309809](https://doi.org/10.1136/gutjnl-2015-309809)
- Revill PA, Tu T, Netter HJ, Yuen LKW, Locarnini SA, Littlejohn M. The evolution and clinical impact of hepatitis B virus genome diversity. *Nat Rev Gastroenterol Hepatol.* 2020;17(10):618–634. [doi:10.1038/s41575-020-0296-6](https://doi.org/10.1038/s41575-020-0296-6)
- Tu T, Zhang H, Urban S. Hepatitis B virus DNA integration: in vitro models for investigating viral pathogenesis and persistence. *Viruses.* 2021;13(2):180. [doi:10.3390/v13020180](https://doi.org/10.3390/v13020180)
- Study data: NCBI BioProject [PRJNA659786](https://www.ncbi.nlm.nih.gov/bioproject/PRJNA659786).
- `nf-core/viralrecon`: [doi:10.5281/zenodo.3901628](https://doi.org/10.5281/zenodo.3901628). MAFFT: [doi:10.1093/molbev/mst010](https://doi.org/10.1093/molbev/mst010). IQ-TREE 2: [doi:10.1093/molbev/msaa015](https://doi.org/10.1093/molbev/msaa015). PhiPack: [doi:10.1093/molbev/msj092](https://doi.org/10.1093/molbev/msj092).
