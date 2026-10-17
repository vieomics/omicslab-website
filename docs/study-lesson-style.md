# Study lesson style guide

How a lesson in the Study section is written. The reference example is
`public/study/en/fundamentals/01-a-short-history.md`; follow its shape and
voice unless a lesson has a reason to differ.

## Purpose and audience

- Audience: someone who knows basic biology but **no** bioinformatics and
  **no** programming.
- Goal: the reader should understand *how something works* and *where to find
  the next step*, not memorise a procedure.
- Voice: a senior colleague explaining a subject. Explain the reason behind a
  fact; never instruct without context.

## File and frontmatter

- One markdown file per lesson, named `NN-slug.md` (order is authoritative,
  but keep the number in step).
- Frontmatter fields:

```yaml
---
slug: where-software-meets-data      # URL segment, stable
title: "Where software meets biological data"
description: "One or two sentences, plain, no hype."
order: 3                              # position within the course
module: "Data and methods"            # groups consecutive lessons
duration: "20 min"                    # realistic reading time
related:                              # blog post slugs only, optional
  - unix-pipes-bioinformatics-streaming-data
---
```

- Do not link to other *courses*. A lesson must stand on its own.
- `related` points at blog posts, never at other lessons.
- Author credit is **Omicslab team**, shown from the dictionary (`study.author` /
  `study.by`), not from frontmatter.

## Structure

1. **Opening paragraph** — why this subject matters and where it sits in the
   arc. Two to four sentences, no heading.
2. **Body sections** — `##` for main movements, `###` for a deep dive into one
   mechanism. A narrative order, not a list of facts.
3. **Closing section** (`## Wrapping up` or similar) — tie the idea back
   together and point to the next lesson by name, never to the next course.
4. **`## References`** — the primary sources behind the claims, with DOIs, and
   an **Image credits** line listing every figure.

## Writing the body

- Ground every abstract claim in something concrete: a named method, a person,
  a date, a number, an example.
- After explaining a mechanism, step back and name the **transferable idea**
  ("reduce an unreadable chemical question to a measurable fragment length",
  "read the pieces, then reassemble by overlaps"). This is what a senior
  explanation adds over a list of facts.
- Prefer an analogy for a hard idea, then return to the precise statement.
- Define a term the first time it appears, briefly and inline.
- Vary the rhythm: paragraphs for reasoning, a short list only when the items
  are genuinely parallel.

## Figures

- Real images, from public sources, with a permissive licence: **public
  domain, CC0 or CC BY**. Avoid CC BY-SA and GPL, and avoid logos/trademarks.
- File lives under `public/study/<locale>/<track>/imgs/`, referenced as
  `./imgs/<name>`.
- Caption carries the figure number and the credit:

```markdown
![Short alt text](./imgs/file.png "Figure 3. What the figure shows. Image: Author, licence, via Wikimedia Commons.")
```

- Source images from Wikimedia Commons, resize locally (~520–900 px) to keep
  the file small, and record the credit in the References section as well.
- Number figures sequentially in the order they appear.

## Admonitions

- Use `:::note`, `:::tip`, `:::warning` sparingly — one or two per lesson, for
  a caveat or a rule of thumb, not for ordinary content.

## Language rules

Follow the project content style in `AGENTS.md`:

- Humble and evidence-based: "typically", "in most cases", "commonly cited",
  "around". Never "obviously", "of course", "clearly", "always".
- Attribute other people's work: name the source; never use "we"/"our" for work
  done by someone else.
- State scope and conditions instead of universals.
- No hype, no promises, no urgency. Imperative only inside a numbered step.
- Keep technical terms in English (the Study content is monolingual per
  locale; the Vietnamese mirror is translated later, not maintained in step).

## References section

- List the primary papers or authoritative sources behind the factual claims,
  newest relevance first is fine, with a DOI or a stable link.
- Close with an **Image credits** paragraph that names each figure, its author
  and its licence.

## Checklist before committing

- [ ] Frontmatter complete; `order` and `module` correct; `related` are valid
      blog slugs.
- [ ] Opens with a framing paragraph; closes by pointing to the next lesson.
- [ ] Every figure is a real, permissively licensed image with a credited
      caption; figure numbers are sequential.
- [ ] A `## References` section exists with sources and image credits.
- [ ] No absolute claims, no hype, no first person for others' work.
- [ ] `npm run build` passes and the lesson renders with no figure placeholders.
