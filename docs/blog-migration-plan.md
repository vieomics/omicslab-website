# Blog migration plan — `river-docs` → `omicslab-website`

Track the migration of posts from the legacy Docusaurus site
(`/home/giangnguyen/Documents/dev/docs/river-docs`) into this repository.

The legacy site is English-only and uses `authors: [river]`. This site serves
**Vietnamese (default) + English** and follows the editorial, humble,
scientific voice defined in `AGENTS.md`. Each migration is therefore a
*rewrite*, not a copy: structure, headings, links, images and frontmatter are
adapted to the site's conventions, and a Vietnamese translation is produced
alongside the English body.

## Scope

**In scope** — 33 published posts from `river-docs/blog/`:

- Version control / Git, CI-C D, containers, shells, remote files
- Cost optimization with Nextflow (parts 1–2)
- Variant calling series (parts 1–11)
- HPC operations (Ansible/Molecule, Spark/SLURM)
- Nextflow modules, testing, GIAB review, gVCF, WDL

**Out of scope** (excluded by request):

- All AI/ML posts:
  `intro-ai-ml-bioinformatics-applications`,
  `machine-learning-bioinformatics-part1-knn`,
  `machine-learning-bioinformatics-part2-knn`,
  `machine-learning-linear-regression-from-scratch-python`
- All `draft: true` posts (8), including the two empty `ai-agent` stubs

**Already migrated** (not in this plan):
`how-to-build-slurm-hpc-part-1..3` and the
`how-can-a-country-build-its-own-1000-genome-project-part-1..5` expansion.

## Migration contract

Each post produces **two files** (one per locale) plus copied images:

```
public/blogs/vi/YYYY-MM/YYYY-MM-DD.md   # Vietnamese (default)
public/blogs/en/YYYY-MM/YYYY-MM-DD.md   # English
public/blogs/en/YYYY-MM/imgs/<images>   # vi falls back to en via resolveImagePath
```

The repository keeps images in the `en` folder and lets `vi` resolve them via
the locale fallback (`src/utils/markdown.ts` → `resolveImagePath`).

### Frontmatter

```yaml
slug: <kebab-case-slug>          # source slug is preserved
title: <title>                   # quote when it contains a colon
description: <1–2 sentences>     # shown on cards; localized
series: <series name>            # only for multi-part posts
seriesOrder: <n>                 # only for multi-part posts
authors: [vieomics]
tags: [<english>, <kebab>, <tags>]
image: ./imgs/<cover>
```

### Body conventions

- **Truncate marker**: `<!--truncate-->` (no spaces — the legacy `<!-- truncate -->` is *not* stripped by the parser).
- **Internal links**: `/blogs/<slug>` in `vi`, `/en/blogs/<slug>` in `en`. Never `/blog/`.
- **Images**: `./imgs/<file>` (copy the referenced files; flatten `imgs_16_01/`, `imgs_17_01/`, `imgs_19_01/` and `../2026-02/imgs/` references into the post's own `imgs/`).
- **Admonitions**: `:::info / :::tip / :::warning` are supported by the directive plugin.
- **Code fences**: language-tagged; unknown languages fall back to plain text.
- **Style**: neutral, evidence-based, humble voice per `AGENTS.md`. Keep measurements and third-party work attributed; no hype adjectives or absolute claims.

## Inventory

Order = intended PR order. Target date = source folder date.

| # | Source (`river-docs/blog/`) | Target slug | Date | Series |
|---|---|---|---|---|
| 1 | `2026-01/2026-01-17.md` | `pixi-is-new-conda-based-era` | 2026-01-17 | — |
| 2 | `2026-01/2026-01-15.md` | `how-to-version-control-git-bioinformatics-part-1` | 2026-01-15 | Version Control and Git for Bioinformatics |
| 3 | `2026-01/2026-01-16.md` | `how-to-version-control-git-bioinformatics-part-2` | 2026-01-16 | Version Control and Git for Bioinformatics |
| 4 | `2026-01/2026-01-18.md` | `bioinformatics-computing-resource-optimization-part1` | 2026-01-18 | Cost Optimization with Nextflow |
| 5 | `2026-01/2026-01-19.md` | `bioinformatics-computing-resource-optimization-part2` | 2026-01-19 | Cost Optimization with Nextflow |
| 6 | `2026-02/2026-02-03.md` | `cicd-bioinformatics-act-local-github-action` | 2026-02-03 | — |
| 7 | `2026-02/2026-02-04.md` | `bioinformatics-workflow-template-ci-cd-best-practices` | 2026-02-04 | — |
| 8 | `2026-02/2026-02-08.md` | `bioinformatics-containers-build-efficient-docker` | 2026-02-08 | — |
| 9 | `2026-02/2026-02-10.md` | `unix-pipes-bioinformatics-streaming-data` | 2026-02-10 | — |
| 10 | `2026-02/2026-02-11-containers-hpc.md` | `containers-hpc-docker-singularity-apptainer` | 2026-02-11 | — |
| 11 | `2026-02/2026-02-11.md` | `migrate-bash-nextflow-enterprise-pipeline` | 2026-02-11 | — |
| 12 | `2026-02/2026-02-14-docker-in-docker-docker-out-docker.md` | `docker-out-docker-bioinformatics-web-apps` | 2026-02-14 | — |
| 13 | `2026-02/2026-02-15-setup-local-nextflow-training.md` | `setup-local-nextflow-training` | 2026-02-15 | — |
| 14 | `2026-02/2026-02-16-remote-files-htslib.md` | `remote-files-htslib-bcftools-samtools` | 2026-02-16 | — |
| 15 | `2026-02/2026-02-17.md` | `upgrade-shell-bash-to-zsh-better-experience` | 2026-02-17 | — |
| 16 | `2026-02/2026-02-18-variant-call-part1.md` | `gatk-variant-calling-bash-workflow-pixi-part1` | 2026-02-18 | Variant Calling from Bash to Production |
| 17 | `2026-02/2026-02-19-variant-call-part2.md` | `gatk-variant-calling-bash-to-nextflow-validation-part2` | 2026-02-19 | Variant Calling from Bash to Production |
| 18 | `2026-02/2026-02-23-variant-call-part3.md` | `gatk-variant-calling-production-slurm-optimization-part3` | 2026-02-23 | Variant Calling from Bash to Production |
| 19 | `2026-03/2026-03-04-variant-call-part4.md` | `gatk-variant-calling-production-slurm-optimization-part4` | 2026-03-04 | Variant Calling from Bash to Production |
| 20 | `2026-03/2026-03-08-variant-call-part5.md` | `gatk-variant-calling-production-slurm-optimization-part5` | 2026-03-08 | Variant Calling from Bash to Production |
| 21 | `2026-03/2026-03-09-variant-call-part6.md` | `gatk-variant-calling-production-slurm-optimization-part6` | 2026-03-09 | Variant Calling from Bash to Production |
| 22 | `2026-03/2026-03-10-variant-call-part7.md` | `gatk-variant-calling-production-slurm-optimization-part7` | 2026-03-10 | Variant Calling from Bash to Production |
| 23 | `2026-03/2026-03-13-variant-call-part8.md` | `gatk-variant-calling-production-slurm-optimization-part8` | 2026-03-13 | Variant Calling from Bash to Production |
| 24 | `2026-03/2026-03-23-variant-call-part9.md` | `storage-cost-optimization-cram-format` | 2026-03-23 | Variant Calling from Bash to Production |
| 25 | `2026-03/2026-03-25-variant-call-part10.md` | `structural-variant-calling-short-reads-challenges` | 2026-03-25 | Variant Calling from Bash to Production |
| 26 | `2026-04/2026-04-08-gvcf-population-genotyping.md` | `gvcf-population-scale-genotyping` | 2026-04-08 | Variant Calling from Bash to Production |
| 27 | `2026-03/2026-03-26-giab-pilot-study-review.md` | `giab-pilot-study-benchmark-development` | 2026-03-26 | — |
| 28 | `2026-03/2026-03-29-ansible-molecule-testing.md` | `hpc-ansible-molecule-playbook-testing` | 2026-03-29 | — |
| 29 | `2026-03/2026-03-31-hpc-spark-slurm.md` | `hpc-spark-slurm-reproducible-cluster` | 2026-03-31 | — |
| 30 | `2026-04/2026-04-01-nf-modules-template.md` | `nf-modules-template-copier-ci-cd` | 2026-04-01 | — |
| 31 | `2026-04/2026-04-07-customize-nf-modules.md` | `customize-nf-core-modules-gianglabs` | 2026-04-07 | — |
| 32 | `2026-04/2026-04-07-test-pyramid.md` | `test-type-in-bioinformatics` | 2026-04-07 | — |
| 33 | `2026-04/2026-04-15-wdl.md` | `wdl-setup-miniwdl-sprocket` | 2026-04-15 | — |

> Note: the variant-calling series is numbered 1–11 in the source; PRs 16–26
> cover parts 1–11 (parts 9–11 use outcome-oriented slugs, as in the source).

## Per-PR workflow

1. Branch from `main` as `content/migrate-<slug>`.
2. Add the `en` post and copy its referenced images into `public/blogs/en/YYYY-MM/imgs/`.
3. Add the `vi` translation (same `slug`, same folder date).
4. Run `npm run build` to confirm the static export succeeds and links resolve.
5. Open a PR titled `content(blog): migrate <name>` with a link to the source
   file and a short note on what was changed/omitted.

## Validation checklist (per PR)

- [ ] `npm run build` succeeds; no missing-image paths
- [ ] `<!--truncate-->` present; description set
- [ ] Internal links use `/blogs/...` (vi) and `/en/blogs/...` (en)
- [ ] `vi` and `en` share the same `slug`
- [ ] Voice/claims comply with `AGENTS.md` (humble, evidence-based, attributed)
- [ ] No leftover `/blog/`, `docs/...` or `draft:` references
