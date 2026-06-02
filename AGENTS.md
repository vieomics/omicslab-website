# AGENTS.md

Instructions for AI coding assistants working with this project.

## Project Overview

Static website for Omicslab — a bioinformatics blog and landing page. Next.js 16 App Router, exported as fully static HTML (`output: "export"`). No server, no database, no API routes.

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS v4 with TailGrids plugin
- Blog: Markdown files via gray-matter + remark/rehype pipeline
- Client-side search: Fuse.js with build-time JSON index
- State: react-hot-toast for notifications, next-themes for dark mode

## Commands

```bash
npm run dev        # Next.js dev server on :3000
npm run build      # Generate search index + static export to out/
npm run preview    # Node.js static server serving out/ on :3000
npm run lint       # ESLint
docker compose up -d --build   # Build image and run with traefik on :80/:443
```

## Architecture Rules

### No server dependencies
- No Prisma, no PostgreSQL, no API routes
- No NextAuth, no Stripe, no Nodemailer
- `src/app/api/` is completely removed
- All data comes from filesystem at BUILD TIME, not runtime
- No `.env` file — site name/author are hardcoded constants since the build is fully static and single-brand

### Blog content flow
1. Markdown source: `markdown/blogs/YYYY-MM/*.md` with YAML frontmatter
2. `scripts/build-search-index.js` runs at build → `public/search-index.json`
3. `src/utils/markdown.ts` reads files, `gray-matter` parses frontmatter
4. `src/utils/markdownToHtml.ts` unified pipeline: remark-parse → remark-gfm → remark-directive → remark-rehype → rehype-slug → rehype-highlight → rehype-stringify
5. `generateStaticParams()` in blogs/[slug]/page.tsx prerenders all slugs at build
6. BlogList.tsx fetches `search-index.json` client-side, runs Fuse.js in browser

### Image paths
- Blog images are served from `public/images/blog-content/YYYY-MM/img*/`
- Images are copied from `markdown/blogs/` to `public/` via a manual prebuild step
- Content markdown image paths are rewritten by markdown.ts from relative to `/images/blog-content/`

### Styling
- Tailwind CSS v4 with `@import "tailwindcss"` (no PostCSS config)
- Custom theme colors in `@theme`: `--color-primary`, `--color-dark`, `--color-body-color`, etc.
- Dark mode via `next-themes` with class strategy (`.dark` class)
- Global container padding via `@layer base` in `src/styles/index.css`

### Component patterns
- Server Components by default, `"use client"` only for interactive components (Header, BlogList, TableOfContents, CodeBlockWrapper)
- `next/image` with `unoptimized: true` globally (required for static export)
- `next/link` for all internal navigation
- Section components are self-contained, accept props for configuration

## File Conventions

- Components: PascalCase directories with `index.tsx` (e.g., `Header/index.tsx`)
- Pages: Next.js file-based routing in `src/app/`
- Utils: camelCase files in `src/utils/`
- Types: `src/types/` for TypeScript interfaces

## Anti-patterns (DO NOT)

- Do NOT add `"use server"` directives or Server Actions
- Do NOT add API routes in `src/app/api/`
- Do NOT add database dependencies (Prisma, PostgreSQL, etc.)
- Do NOT add authentication (NextAuth, etc.)
- Do NOT add payment integrations (Stripe, etc.)
- Do NOT use `getServerSideProps` or `getStaticProps` (Pages Router — use generateStaticParams in App Router)
- Do NOT add `output: "standalone"` to next.config.js (use `"export"`)
- Do NOT add `next/image` without `unoptimized` (breaks static export)
