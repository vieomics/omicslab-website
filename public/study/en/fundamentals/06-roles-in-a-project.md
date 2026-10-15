---
slug: roles-in-a-project
title: "The people behind the result"
description: "A bioinformatics result passes through many people: the wet lab, the bioinformatician, the software engineer, the infrastructure engineer, the clinician. Knowing each role tells you who to ask, and for what."
order: 6
module: "What stands behind the result"
duration: "20 min"
related:
  - how-to-version-control-git-bioinformatics-part-1
---

Nobody carries out a whole bioinformatics analysis alone. A result passes through several people, and each hands the next person a different thing. Knowing the roles tells you who to find when you need something, and what to give them.

## The roles met most often

- **Wet lab.** Prepares samples, builds libraries and runs the sequencing. They decide whether the data can answer the question you asked at all.
- **Bioinformatician.** Chooses the methods, runs the analysis and interprets the results — the person who "reads" the data into a conclusion.
- **Software engineer.** Builds and maintains tools and pipelines, and writes tests so they work correctly.
- **Infrastructure engineer / DevOps.** Looks after compute, storage, job scheduling, automation and security. They keep the analysis running at scale.
- **Data engineer / data steward.** Organises sample information, identifiers and storage, so data can be found again and understood.
- **Clinician / domain expert.** Poses the question and interprets the result in its real context.
- **Lead / project manager.** Sets the scope, resources and milestones.

## Hand-offs matter more than tools

Each move between two roles is a *hand-off*, and it comes with a specific product:

- Wet lab → bioinformatics: the sample, the samplesheet, the sample description.
- Bioinformatics → the result's recipient: the result, the methods description, the tool and reference versions.
- Software and infrastructure → bioinformatics: the runtime environment, the pipeline and the ready infrastructure.
- Result → clinician: the interpretation and the limits of the result.

![The roles and the products handed between them](./imgs/roles-handoff.svg "Figure 1. A bioinformatics project is a chain of hand-offs, each joint a specific product.")

:::tip
Most project failures sit at the hand-offs, not in the algorithms: a samplesheet with the wrong columns, a missing reference-genome version, an incomplete sample description. When a result looks wrong, check the joints first.
:::

## Wrapping up

You now know the roles and what they hand over. The next lesson looks at why a result like this can be reproduced.
