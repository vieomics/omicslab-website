# Omicslab Website

Static website for [Omicslab](https://omicslab.io) — innovative bioinformatics solutions for researchers. Built with Next.js, deployed as fully static HTML.

## Tech Stack

- **Next.js 16** (App Router, `output: "export"`)
- **React 19** / TypeScript
- **Tailwind CSS v4** + TailGrids components
- **Markdown** blogs with gray-matter, unified/remark/rehype pipeline
- **Fuse.js** client-side search with build-time index

## Getting Started

```bash
npm install
npm run dev       # development server on :3000
npm run build     # static export to out/
npm run preview   # serve out/ locally on :3000
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/             # Public site route group
│   │   ├── about/          # About page
│   │   ├── blogs/          # Blog listing + [slug]
│   │   ├── contact/        # Contact page
│   │   ├── pricing/        # Pricing page
│   │   └── solutions/      # Infrastructure, Data Platform, Pipelines
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Homepage
│   └── providers.tsx       # ThemeProvider + Toaster
├── components/             # React components
│   ├── Header/             # Navigation with dropdown
│   ├── Blog/               # Blog cards, search, TOC, etc.
│   ├── About/ Hero/ Services/ Contact/ Pricing/
│   ├── Faq/ Team/ CallToAction/
│   └── Common/             # SectionTitle, Breadcrumb, etc.
├── utils/
│   ├── markdown.ts         # Read & parse blog markdown files
│   ├── markdownToHtml.ts   # remark/rehype MD→HTML pipeline
│   ├── authors.ts          # Authors YAML parser
│   ├── toc.ts              # Table of contents extraction
│   └── search.ts           # Fuse.js search (legacy, replaced)
├── types/                  # TypeScript interfaces
└── styles/                 # Global CSS
markdown/
├── authors.yml             # Author definitions
└── blogs/                  # Blog posts in YYYY-MM/ directories
    ├── 2026-01/
    └── 2026-05/
scripts/
└── build-search-index.js   # Generates public/search-index.json at build
public/
├── images/                 # Static images, logos, team photos
└── search-index.json       # Generated at build time (gitignored)
```

## Blog System

Blog posts are plain Markdown files in `public/blogs/YYYY-MM/` with YAML frontmatter:

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
- Author data from `markdown/authors.yml`
- Client-side search with Fuse.js index built at build time
- All blog posts prerendered as static HTML via `generateStaticParams()`

## Static Export

The site is configured with `output: "export"`. All pages (including blog posts) are prerendered at build time. No server, no database, no API routes needed.

To serve the output:
```bash
npm run build
npm run preview   # node server.js → http://localhost:3000
```

Or deploy `out/` to any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, Nginx).

## Docker (local)

```bash
docker build -t omicslab-website .
docker run -p 80:80 omicslab-website
```

Uses multi-stage build: Node.js builder → Nginx Alpine serving `out/`.

## Docker Compose (production)

Production deployment uses **Traefik** as reverse proxy with automatic Let's Encrypt TLS:

```bash
docker compose up --build -d
```

The stack is defined in `docker-compose.yaml`:
- `omicslab` service — Nginx serving the built site
- `traefik` service — reverse proxy with TLS termination for `omicslab.io`

Configuration:
- `traefik/traefik.yaml` — static Traefik config
- `traefik/dynamic/` — dynamic routing rules
- `traefik/acme.json` — Let's Encrypt certificates (gitignored)

> **Note**: A Traefik Docker network named `traefik-public` must exist before first run:
> ```bash
> docker network create traefik-public
> ```

## CI/CD — GitHub Actions

On every push to `main`, the [`deploy.yml`](.github/workflows/deploy.yml) workflow:

1. **Build check** — installs dependencies and builds the site (catches errors early)
2. **Deploy to VPS** — SSHes into the production server, pulls the latest code, installs deps, builds, and restarts the Docker Compose stack

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `SSH_HOST` | VPS hostname or IP (e.g. `omicslab.io`) |
| `SSH_USER` | SSH user (e.g. `river`) |
| `SSH_PRIVATE_KEY` | Private SSH key for authentication |

The workflow uses the built-in `GITHUB_TOKEN` to authenticate `git pull` on the VPS — no deploy keys or PATs needed.

### Manual Trigger

The workflow can also be triggered manually from GitHub → Actions → **Deploy** → **Run workflow**.

## Google Analytics

Tracked via `G-H4DR9KS6SL` (gtag.js). The scripts are injected in the root `<head>` at `src/app/layout.tsx:26-35`. No environment variables needed — the ID is hardcoded since the site is single-brand and statically exported.

## License

MIT — free for personal and commercial use.
