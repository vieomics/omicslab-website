---
slug: reading-hbv-ngs-results
title: "Reading HBV NGS results: coverage, variants and phylogeny"
description: "High coverage is not enough; N is not a gap; 1,942 SNPs are not 1,942 mutations; a recombination signal is not a breakpoint. This guide walks through each number in a public HBV dataset and separates observations from hypotheses."
authors: [vieomics]
tags: [hbv, viral-genomics, variant-calling]
image: ./imgs/cover-hbv-reading-results.png
citations:
  - "https://doi.org/10.1128/MMBR.64.1.51-68.2000"
  - "https://doi.org/10.1136/gutjnl-2015-309809"
  - "https://doi.org/10.1038/s41575-020-0296-6"
  - "https://doi.org/10.3390/v13020180"
  - "https://www.ncbi.nlm.nih.gov/bioproject/PRJNA659786"
---

:::info
**This is the second of two posts on HBV analysis from NGS data.** [The first post](/en/blogs/hbv-ngs-analysis-guide) covers the biology of the genome and the path from raw reads to a consensus and a tree. This post walks through each number in a public dataset: coverage, `N`, variants, phylogeny and a recombination signal. The aim is to separate observations from hypotheses and to state what the data cannot support.

The code, summary tables and reference results are in [vieomics/solutions](https://github.com/vieomics/solutions/tree/main/hbv-genome-short-read-analysis).
:::

## Five samples, ten references: what the dataset can and cannot say

The example uses five samples from NCBI BioProject [PRJNA659786](https://www.ncbi.nlm.nih.gov/bioproject/PRJNA659786) — three genotype A and two genotype D, all from Brazil — and ten complete GenBank genomes. The five samples are the genotype A and D runs with the largest read counts, not a random sample. The reference panel is also deliberate: one Brazilian A2, three D genomes (including the RefSeq), two B and two C from Vietnam/Cambodia, and one E and one F as outgroups.

| Sample | Genotype | Mapped (Bowtie2) | Mean depth | Breadth ≥10× | `N` |
|---|---|---:|---:|---:|---:|
| B215/2014 | A | 84.3% | 40,310× | 99.5% | 0.5% |
| B3392/2014 | A | 76.8% | 24,431× | 99.5% | 0.5% |
| B575/2014 | A | 71.2% | 24,944× | 65.1% | 34.9% |
| B2719/2015 | D | 99.6% | 48,467× | 100.0% | 0.0% |
| B364/2014 | D | 99.2% | 44,223× | 83.1% | 16.9% |

Five samples and ten references are enough to check the workflow, compare genotype placement and describe some genome features. They are not enough to infer global distribution, geographic origin, transmission chains or treatment response. The public panel is not a representative sample of global HBV diversity.

## Coverage: mean depth and breadth

Mean depth in this dataset is very high — 24,431× to 48,467× — because the genome is only about 3.2 kb and each sample has hundreds of thousands to millions of reads. High mean depth does not mean every position is evenly covered. The more useful metric is **breadth**: the fraction of positions reaching a minimum depth, here 10×.

![Per-sample HBV coverage, with positions below 10× in red](./imgs/hbv-coverage.png)

*Figure 1 — Coverage along the HBV genome. The y-axis is depth (log scale); red marks positions below 10×. B215/2014 and B3392/2014 are nearly complete; B575/2014 and B364/2014 have clear low-coverage blocks. The figure was produced by the workflow in the technical repository.*

Two samples are incomplete:

- **B575/2014** reaches only 65.1% breadth at ≥10× and is 34.9% `N`. The low-coverage block runs from about 1,285 to 2,376, plus a short run around 2,856–2,872.
- **B364/2014** reaches 83.1% breadth at ≥10× and is 16.9% `N`, with a low-coverage block from about 1,285 to 1,821.

Even B215/2014 and B3392/2014, at about 99.5% breadth ≥10×, carry a short 16–17 bp `N` run around 2,856–2,872. That detail is easy to miss if you only look at mean depth.

A note on the source: the table uses the Bowtie2 mapping from the viralrecon run. The technical repository also contains an independent BWA mapping for validation; its depth and breadth differ. When reporting, choose one source and state it instead of mixing numbers from two pipelines.

## `N` is not a gap

The consensus in this example is reference-guided and keeps the 3,182 bp NC_003977.2 frame. Positions below 10× or with no covering read are written as `N`; indels are not applied. Therefore, `N` does not mean the virus lost the base, and consensus length is not assembly length.

Deletions relative to the closest reference are reported separately. This dataset has six candidates, all in-frame:

| Sample | Position | Length | Type |
|---|---:|---:|---|
| B215/2014 | 2,356 | 6 bp | in-frame deletion |
| B215/2014 | 2,854 | 33 bp | in-frame deletion |
| B3392/2014 | 2,356 | 6 bp | in-frame deletion |
| B3392/2014 | 2,854 | 33 bp | in-frame deletion |
| B575/2014 | 1,285 | 6 bp | in-frame deletion |
| B575/2014 | 2,854 | 33 bp | in-frame deletion |

These deletions are not drawn as gaps in the consensus. The 33 bp deletion at 2,854 overlaps the low-coverage run around 2,856–2,872, but the two concepts are not the same: `N` is a position without enough evidence in the reference frame; a deletion is a structural difference from the closest reference. Confirming a deletion needs read-level evidence, targeted PCR or long reads; a short-read consensus alone is not enough.

## Variants: 1,942 SNPs, 633 rows, 473 positions

The VCF against the mapping reference NC_003977.2 contains 1,942 SNP positions: 660 in B215/2014, 571 in B3392/2014, 481 in B575/2014, 123 in B2719/2015 and 107 in B364/2014. The VCF contains no indels. For the genotype A samples, most of those 660–571 differences are genotype-defining differences from the D reference, not mutations that arose within the sample.

The second table therefore compares each consensus with the **closest public genome** — KJ854710.1 for the A samples (94.9–95.5% identity) and NC_003977.2 for the D samples (98.3–98.5%). This gives 633 region-annotated nucleotide rows, corresponding to 473 unique positions, and 593 amino-acid rows. The row count is larger than the position count because the ORFs overlap: one nucleotide in the S region can also sit in the P frame and is annotated twice.

![Variant distribution by ORF, SNP/indel class and density along the genome](./imgs/hbv-mutation-summary.png)

*Figure 2 — Variants by ORF (left), SNP/indel class (centre) and density along the genome (right). The per-region bars sum to more than 1,942 because one position can fall in several ORFs. These are counts, not a mutation rate.*

The three numbers — 1,942, 633 and 473 — answer three different questions. 1,942 is the number of positions that differ from the mapping reference; 633 is the number of rows after region annotation; 473 is the number of unique positions after merging overlapping ORFs. Do not use any of them as “the number of mutations” without stating the reference and the counting rule.

No variant in this analysis is labelled drug resistant or immune escape. A clinical HBV variant database was not queried; the synonymous/nonsynonymous/stop labels describe the effect on a reading frame, not a functional conclusion.

## Phylogeny: 15 taxa

The tree was built from the 15-sequence alignment (5 consensus + 10 references) with IQ-TREE 2, model TVM+F+I+G4, 1,000 UFBoot and 1,000 SH-aLRT. The alignment has 3,221 columns, 845 variable sites, 535 parsimony-informative sites and 39 gap-rich columns.

![HBV phylogeny from 5 consensus genomes and 10 public genomes](./imgs/hbv-phylogeny.png)

*Figure 3 — Maximum-likelihood tree of 15 HBV sequences. Internal labels are SH-aLRT/UFBoot. The three genotype A samples fall in the A clade with KJ854710.1 (100/100); the two D samples fall in the D clade, but the D pair has only 28.5/61 support. The figure was produced by the workflow in the technical repository.*

The main observations:

- The three genotype A samples form a clade with the A2 reference KJ854710.1, with 100/100 support. Within that clade, B215 and B575 are the closest pair; B3392 branches earlier.
- The two genotype D samples fall in the D clade with NC_003977.2 and the Brazilian D references. The D pair itself has only 28.5/61 support, consistent with the missing data in B364/2014 and the limited number of variable sites.
- The B/C clade has 97.4/92 support; B and C are each monophyletic with 100/100. E and F provide outgroup context.

Such a tree is a hypothesis about relationships. It does not say who infected whom, when infection occurred, or where the virus came from. With two incomplete genomes and gap-rich regions, the uncertainty on some branches is substantial; low support should be reported, not dropped.

## Recombination: a signal, not a breakpoint

PhiPack was run on the 15-sequence alignment to screen for recombination. The output in the repository comes from the earlier alignment version (533 informative sites; the current alignment has 535). The permutation tests for PHI and NSS are below the 1,000-permutation resolution (p < 0.001); Max χ² gives p = 0.028. The best breakpoint reported by Max χ² is between NC_003977.2 and B364/2014, both genotype D.

This is a statistical signal, not evidence of a specific recombination event. There are at least three reasons for caution:

- **The panel spans genotypes A–F.** PhiPack's tests assume a relatively homogeneous recombining population. Here pairwise diversity is about 8.9%, most of it between genotypes; the signal may reflect population structure.
- **Two genomes are incomplete.** B575/2014 is 34.9% `N` and B364/2014 is 16.9% `N`; missing data can inflate recombination statistics.
- **Two gap-rich blocks.** Positions 2,356–2,361 and 2,863–2,895 have more than 50% gaps; they were retained, so the alignment around them is uncertain.

A reasonable conclusion is: the dataset contains a signal worth following up, not a resolved breakpoint. A stronger check would run the test within one genotype, mask the gap-rich blocks, use a recombination-aware model and confirm with long reads or cloned sequences.

## What cannot be concluded

- **This is not an epidemiological analysis.** Five samples cannot support transmission chains, geographic origin or infection timing.
- **This is not a clinical report.** There are no clinical data, no drug-resistance variant database query and no treatment recommendation.
- **This is not a mutation rate.** 1,942 SNPs are differences from one specific reference, not a rate.
- **The genomes are not all complete.** B575/2014 and B364/2014 are incomplete; the other samples can still carry local `N` runs.
- **This is not a recombination breakpoint.** The PhiPack signal is a hypothesis to test, not a conclusion.

## A checklist for reading HBV results

1. **Check the genome form and the consensus method.** A reference-guided consensus differs from a de novo assembly; `N` is not a gap; indels may not be applied.
2. **Read breadth and `N`, not only mean depth.** High depth can hide low-coverage regions.
3. **Separate counts by reference.** 1,942 SNPs against NC_003977.2 is not 473 positions against the closest genome.
4. **Check overlapping ORFs.** One position can be counted twice in two reading frames.
5. **Read the tree support.** Low support and missing data must be stated; a tree is not a transmission chain.
6. **Treat recombination as a hypothesis.** Check population structure, missing data and gap-rich regions before interpreting.
7. **State the limits of the dataset.** Five samples and a curated reference panel do not represent global HBV.

## Reproduce and access

The full analysis can be reproduced on the Omicslab platform. The upstream `nf-core/viralrecon` step runs as an analysis job; the alignment, phylogeny and variant annotation steps run in a version-pinned `pixi` environment. Public inputs, reference results and manifests are in the [vieomics/solutions repository](https://github.com/vieomics/solutions/tree/main/hbv-genome-short-read-analysis); the workspace can be reopened to inspect the data and results.

If you want to apply it to your own data, start with [the analysis guide](/en/blogs/hbv-ngs-analysis-guide), then keep the quality-control, circular-mapping and coverage-reporting checks.

## References

- Seeger C, Mason WS. Hepatitis B virus biology. *Microbiol Mol Biol Rev.* 2000;64(1):51–68. [doi:10.1128/MMBR.64.1.51-68.2000](https://doi.org/10.1128/MMBR.64.1.51-68.2000)
- Nassal M. HBV cccDNA: viral persistence reservoir and key obstacle for a cure of chronic hepatitis B. *Gut.* 2015;64(12):1972–1984. [doi:10.1136/gutjnl-2015-309809](https://doi.org/10.1136/gutjnl-2015-309809)
- Revill PA, Tu T, Netter HJ, Yuen LKW, Locarnini SA, Littlejohn M. The evolution and clinical impact of hepatitis B virus genome diversity. *Nat Rev Gastroenterol Hepatol.* 2020;17(10):618–634. [doi:10.1038/s41575-020-0296-6](https://doi.org/10.1038/s41575-020-0296-6)
- Tu T, Zhang H, Urban S. Hepatitis B virus DNA integration: in vitro models for investigating viral pathogenesis and persistence. *Viruses.* 2021;13(2):180. [doi:10.3390/v13020180](https://doi.org/10.3390/v13020180)
- Study data: NCBI BioProject [PRJNA659786](https://www.ncbi.nlm.nih.gov/bioproject/PRJNA659786).
- `nf-core/viralrecon`: [doi:10.5281/zenodo.3901628](https://doi.org/10.5281/zenodo.3901628). MAFFT: [doi:10.1093/molbev/mst010](https://doi.org/10.1093/molbev/mst010). IQ-TREE 2: [doi:10.1093/molbev/msaa015](https://doi.org/10.1093/molbev/msaa015). PhiPack: [doi:10.1093/molbev/msj092](https://doi.org/10.1093/molbev/msj092).
