---
slug: a-short-history
title: "A short history: how biology became data"
description: "Bioinformatics is younger than it looks. This lesson traces how biology moved from reading a single protein to producing millions of genomes — and where computing entered."
order: 1
module: "From the beginning to today"
duration: "20 min"
related:
  - giab-pilot-study-benchmark-development
---

Bioinformatics is often described as a young field, and in its present form it is. In about seventy years, biology moved from reading one protein at a time to producing millions of genomes, and computing moved with it. This lesson follows that arc, because the shape of the field today — pipelines, containers, enormous datasets — comes from it.

![The DNA double helix](./imgs/dna-double-helix.png "Figure 1. The DNA double helix — the structure that made biology something a machine could read. Image: Jerome Walker and Dennis Myts, public domain, via Wikimedia Commons.")

## The first sequences

The starting point is chemical, not digital. In 1955 Frederick Sanger reported the first complete protein sequence, insulin. DNA sequencing followed in 1977, with the Sanger method and, independently, the Maxam–Gilbert method. For the first time, biology had strings that could be stored, copied and compared by machine.

![Frederick Sanger](./imgs/frederick-sanger.jpg "Figure 2. Frederick Sanger, whose 1955 insulin sequence was the first complete protein sequence. Image: public domain, via Wikimedia Commons.")

The word *bioinformatics* itself is usually traced to Paulien Hogeweg and Ben Hesper, who used it around 1970 for the study of information processes in biological systems. The idea that biology is, in part, an information science has been present almost from the beginning.

![Reading a sequencing gel by hand](./imgs/sequencing-dna.jpg "Figure 3. Reading a sequence by hand from a gel — the method behind the first sequences. Image: CSIRO, CC BY 3.0, via Wikimedia Commons.")

## Comparing sequences becomes a discipline

Once sequences existed, the natural question was: is this one like that one? Early answers came as algorithms and databases:

- Margaret Dayhoff's *Atlas of Protein Sequence and Structure* (1965) collected sequences and introduced substitution matrices — a way to score how likely one amino acid is to replace another.
- Needleman and Wunsch (1970) described an algorithm for aligning two sequences end to end; Smith and Waterman (1981) added a local version that finds the best matching region rather than aligning everything.
- Public databases appeared alongside: the Protein Data Bank (1971), EMBL's nucleotide database (1980) and GenBank (1982).

Alignment scoring and public databases are the two ideas the rest of the field still rests on.

## Searching at scale

Searching every database entry slowly was the next problem. FASTA (1985) and then **BLAST** (1990, Altschul and colleagues) made it practical to search a sequence against a large database quickly, by trading completeness for speed. When the web arrived, these tools became available to anyone with a browser.

In parallel came the largest biology project of the era, the Human Genome Project, running from 1990 to a working draft in 2000 and a finished reference in 2003.

![A timeline of the Human Genome Project](./imgs/human-genome-project-timeline.jpg "Figure 4. A timeline of the Human Genome Project, 1990–2003. Image: National Human Genome Research Institute (NHGRI), CC BY 2.0, via Wikimedia Commons.")

## The data explosion

Around 2005, so-called next-generation sequencing changed the economics of reading DNA. Reads became shorter per run but vastly more numerous, and the cost per base fell far faster than computing improved. Bioinformatics had to adapt:

- new aligners such as Bowtie and BWA (both 2009) mapped reads to a reference at scale;
- SAM/BAM became the standard way to store those alignments;
- variant calling moved from a research topic to a routine step.

The bottleneck shifted from *producing* data to *storing, moving and processing* it.

![A benchtop next-generation sequencer](./imgs/illumina-miseq-sequencer.jpg "Figure 5. A benchtop next-generation sequencer, the class of machine behind the data explosion. Image: Konrad Förstner, CC0, via Wikimedia Commons.")

## From scripts to infrastructure

The most recent shift is organisational. Work that once ran as a personal script now runs as a pipeline:

- **Containers** (Docker, released 2013; Apptainer on shared clusters) package a tool with its environment.
- **Workflow managers** — Snakemake (2012), Nextflow (2013), and later WDL and CWL — describe a chain of steps and run them across many machines.
- **Community pipelines** such as nf-core (from 2018) package tested analyses that others can run without rebuilding them.
- Long-read sequencing, biobanks and national genome programmes pushed dataset sizes into the petabytes.

## What the history leaves us with

Two things stay constant across the whole arc. Biology keeps producing data, and computing keeps having to catch up. The interesting work happens where the two meet: at the file, the format, the algorithm and the machine. That meeting point is where this course continues, and the next lesson looks at how the field is practised today.

## Sources and credits

Dates and details above follow the commonly cited sources below. Where a date is approximate, it is phrased as such.

- Sanger, F. (1955). *The amino-acid sequence in the phenylalanyl chain of insulin.* [Biochemical Journal](https://doi.org/10.1042/bj0490463).
- Sanger, F., Nicklen, S. & Coulson, A. R. (1977). *DNA sequencing with chain-terminating inhibitors.* [PNAS](https://doi.org/10.1073/pnas.74.12.5463).
- Maxam, A. M. & Gilbert, W. (1977). *A new method for sequencing DNA.* [PNAS](https://doi.org/10.1073/pnas.74.2.560).
- Hogeweg, P. (2011). *The roots of bioinformatics in theoretical biology.* [PLoS Computational Biology](https://doi.org/10.1371/journal.pcbi.1002021) — on the term and its origins.
- Dayhoff, M. O. (1965). *Atlas of Protein Sequence and Structure.* National Biomedical Research Foundation.
- Needleman, S. B. & Wunsch, C. D. (1970). *A general method applicable to the search for similarities in the amino acid sequence of two proteins.* [Journal of Molecular Biology](https://doi.org/10.1016/0022-2836(70)90057-4).
- Smith, T. F. & Waterman, M. S. (1981). *Identification of common molecular subsequences.* [Journal of Molecular Biology](https://doi.org/10.1016/0022-2836(81)90087-5).
- Altschul, S. F., Gish, W., Miller, W., Myers, E. W. & Lipman, D. J. (1990). *Basic local alignment search tool.* [Journal of Molecular Biology](https://doi.org/10.1016/S0022-2836(05)80360-2).
- International Human Genome Sequencing Consortium (2001). *Initial sequencing and analysis of the human genome.* [Nature](https://doi.org/10.1038/35057062).
- Langmead, B., Trapnell, C., Pop, M. & Salzberg, S. L. (2009). *Ultrafast and memory-efficient alignment of short DNA sequences to the human genome.* [Genome Biology](https://doi.org/10.1186/gb-2009-10-3-r25) (Bowtie).
- Li, H. & Durbin, R. (2009). *Fast and accurate short read alignment with the Burrows–Wheeler transform.* [Bioinformatics](https://doi.org/10.1093/bioinformatics/btp324) (BWA).
- Di Tommaso, P. et al. (2017). *Nextflow enables reproducible computational workflows.* [Nature Biotechnology](https://doi.org/10.1038/nbt.3820).
- Ewels, P. A. et al. (2020). *The nf-core framework for community-curated bioinformatics pipelines.* [Nature Biotechnology](https://doi.org/10.1038/s41587-020-0439-x).

**Image credits.** Figure 1: DNA double helix, Jerome Walker and Dennis Myts, public domain. Figure 2: Frederick Sanger, public domain. Figure 3: sequencing DNA, CSIRO, CC BY 3.0. Figure 4: Human Genome Project timeline, National Human Genome Research Institute (NHGRI), CC BY 2.0. Figure 5: Illumina MiSeq sequencer, Konrad Förstner, CC0. All via [Wikimedia Commons](https://commons.wikimedia.org).
