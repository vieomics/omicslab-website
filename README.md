# Omicslab Website

Static website for [Omicslab](https://omicslab.io) — innovative bioinformatics solutions for researchers. Built with Next.js, deployed as fully static HTML.

## Tech Stack

- **Next.js 16** (App Router, `output: "export"`)
- **React 19** / TypeScript
- **Tailwind CSS v4** + TailGrids components
- **Markdown** blogs with gray-matter, unified/remark/rehype pipeline
- **Fuse.js** client-side search with build-time index
- **i18n** — Vietnamese (default, no prefix) + English (`/en`), no runtime dependency

## Getting Started

```bash
npm install
npm run dev       # development server on :3100
npm run build     # static export to out/
npm run preview   # serve out/ locally on :3000
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (vi)/               # Vietnamese pages — root layout, no URL prefix
│   │   ├── about/          # About page
│   │   ├── blogs/          # Blog listing + [slug]
│   │   ├── contact/        # Contact page
│   │   ├── pricing/        # Pricing page
│   │   └── solutions/      # Infrastructure, Data Platform, Pipelines
│   ├── en/                 # English pages — root layout, /en prefix
│   ├── global-not-found.tsx# Bilingual 404 for unmatched routes (out/404.html)
│   ├── sitemap.ts          # Bilingual sitemap.xml with hreflang alternates
│   └── robots.ts           # robots.txt
├── i18n/
│   ├── config.ts           # locales, defaultLocale
│   ├── dictionaries/       # vi.ts (source of truth) + en.ts (typed)
│   ├── paths.ts            # localizePath, localizeHref, switchLocalePath
│   ├── metadata.ts         # page metadata + hreflang alternates
│   ├── date.ts             # locale-aware date formatting
│   └── authors.ts          # localized author titles
├── views/                  # Shared page bodies used by both locales
├── components/             # React components
│   ├── Header/             # Navigation, language switcher
│   ├── Blog/               # Blog cards, search, TOC, etc.
│   ├── About/ Hero/ Services/ Contact/ Pricing/
│   ├── Faq/ Team/ CallToAction/
│   └── Common/             # SectionTitle, Breadcrumb, RichText, etc.
├── utils/
│   ├── markdown.ts         # Read & parse blog markdown files (locale-aware)
│   ├── markdownToHtml.ts   # remark/rehype MD→HTML pipeline
│   ├── authors.ts          # Authors YAML parser
│   ├── toc.ts              # Table of contents extraction
│   └── search.ts           # Fuse.js search (legacy, replaced)
├── types/                  # TypeScript interfaces
└── styles/                 # Global CSS
public/
├── authors.yml             # Author definitions
├── blogs/
│   ├── vi/YYYY-MM/         # Vietnamese posts (translations)
│   └── en/YYYY-MM/         # English posts
├── images/                 # Static images, logos, team photos
├── search-index.vi.json    # Generated at build time (gitignored)
└── search-index.en.json    # Generated at build time (gitignored)
scripts/
└── build-search-index.js   # Generates per-locale search indexes at build
```

## Internationalization

Vietnamese is the default locale served at `/`; English is served under `/en`.
Both trees are **root layouts** (there is no top-level `app/layout.tsx`), which
lets each locale set its own `<html lang>` and metadata.

- **Copy** lives in `src/i18n/dictionaries/{vi,en}.ts`. `en.ts` is the source
  of the `Dictionary` type, so `vi.ts` fails to compile if a key is missing.
- **Pages** are thin wrappers: they define localized metadata and render a
  shared view from `src/views/` with the locale's dictionary.
- **Components** receive `dict` (and `locale` where needed) as props; there is
  no i18n context or runtime library.
- **Links** must go through `localizeHref`/`localizePath` from `src/i18n/paths.ts`.
- **The language switcher** in the header maps the current path to the other
  locale; blog posts without a translation fall back to the other locale's
  blog index.
- **SEO**: every page emits `hreflang` alternates via `src/i18n/metadata.ts`,
  and `sitemap.xml` lists both locales.

## Blog System

Blog posts are plain Markdown files in `public/blogs/<locale>/YYYY-MM/` with YAML frontmatter:

```yaml
---
slug: my-post-slug
title: My Post Title
description: A brief description
authors: [river]
tags: [pipeline, hpc]
image: ./imgs/cover.svg
---
```

Features:

- GFM tables, code blocks, admonitions (`:::info`, `:::warning`, `:::tip`, etc.)
- Syntax highlighting via rehype-highlight + prismjs
- Author data from `public/authors.yml`
- Client-side search with per-locale Fuse.js indexes built at build time
- All blog posts prerendered as static HTML via `generateStaticParams()`
- A translated post uses the **same `slug`** in `vi/` and `en/`; tags stay in
  English in both locales so filters behave identically
- Images are looked up in the post's own locale folder first and fall back to
  the other locale, so translations can reuse the original screenshots without
  duplicating files

## Static Export

The site is configured with `output: "export"`. All pages (including blog posts) are prerendered at build time. No server, no database, no API routes needed.

To serve the output:

```bash
npm run build
npm run preview   # node server.js → http://localhost:3000
```

Or deploy `out/` to any static host. Production uses **Cloudflare Pages** (see CI/CD below).

## Deploy — Cloudflare Pages

Production is served by **Cloudflare Pages** from the static `out/` directory.
The project is defined in `wrangler.toml`:

```toml
name = "omicslab-website"
pages_build_output_dir = "./out"
```

On every push to `main`, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Installs dependencies and runs `npm run build`
2. Deploys `out/` to Cloudflare Pages with `wrangler pages deploy`

### Required GitHub Secret

| Secret                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` | API token with permission to deploy Pages projects |

The workflow can also be triggered manually from GitHub → Actions → **Deploy to Cloudflare Pages** → **Run workflow**.

## Google Analytics

Tracked via `G-H4DR9KS6SL` (gtag.js). The scripts are injected in the root `<head>` at `src/app/layout.tsx:26-35`. No environment variables needed — the ID is hardcoded since the site is single-brand and statically exported.

## License

MIT — free for personal and commercial use.
