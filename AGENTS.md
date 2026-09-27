# AGENTS.md

Instructions for AI coding assistants working with this project.

## Project Overview

Static website for Omicslab — a bioinformatics blog and landing page. Next.js 16 App Router, exported as fully static HTML (`output: "export"`). No server, no database, no API routes.

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS v4 with an editorial monochrome theme (no UI kit plugin)
- Blog: Markdown files via gray-matter + remark/rehype pipeline
- Client-side search: Fuse.js with build-time JSON index
- State: react-hot-toast for notifications (single light theme, no dark mode)

## Commands

```bash
npm run dev        # Next.js dev server on :3100
npm run build      # Generate search index + static export to out/
npm run preview    # Node.js static server serving out/ on :3000
npm run lint       # ESLint
```

## Architecture Rules

### No server dependencies
- No Prisma, no PostgreSQL, no API routes
- No NextAuth, no Stripe, no Nodemailer
- `src/app/api/` is completely removed
- All data comes from filesystem at BUILD TIME, not runtime
- No `.env` file — site name/author are hardcoded constants since the build is fully static and single-brand

### Internationalization (Vietnamese default + English)
- Vietnamese is the default locale at `/`; English lives under `/en`
- Two root layouts: `src/app/(vi)/layout.tsx` and `src/app/en/layout.tsx` (no top-level `app/layout.tsx`)
- All copy lives in `src/i18n/dictionaries/{vi,en}.ts`; `en.ts` defines the `Dictionary` type so missing vi keys fail the build
- Pages are thin wrappers (metadata + view); shared page bodies live in `src/views/`
- Components take `dict` (and `locale`) as props — do NOT add an i18n context or runtime library
- Never hardcode user-facing strings in components; add them to both dictionaries
- Internal links MUST use `localizeHref`/`localizePath` from `src/i18n/paths.ts`
- Blog translations share the same `slug` across `public/blogs/vi` and `public/blogs/en`; tags stay in English
- Unmatched routes are handled by `src/app/global-not-found.tsx` (`experimental.globalNotFound`)

### Blog content flow
1. Markdown source: `public/blogs/<locale>/YYYY-MM/*.md` with YAML frontmatter
2. `scripts/build-search-index.js` runs at build → `public/search-index.vi.json` and `public/search-index.en.json`
3. `src/utils/markdown.ts` reads files per locale, `gray-matter` parses frontmatter
4. `src/utils/markdownToHtml.ts` unified pipeline: remark-parse → remark-gfm → remark-directive → remark-rehype → rehype-slug → rehype-highlight → rehype-stringify
5. `generateStaticParams()` in `(vi)/blogs/[slug]/page.tsx` and `en/blogs/[slug]/page.tsx` prerenders all slugs per locale
6. BlogList.tsx fetches the locale's search index client-side, runs Fuse.js in browser

### Image paths
- Blog images live alongside markdown in `public/blogs/<locale>/YYYY-MM/imgs/`
- Images are served directly at `/blogs/<locale>/YYYY-MM/imgs/`
- Content markdown image paths are rewritten by markdown.ts from relative to `/blogs/<locale>/`
- If an image is missing in the post's locale, the resolver falls back to the other locale's folder (translations reuse English screenshots)

### Policy pages (Privacy, Terms, Security)
- Content lives in `src/i18n/dictionaries/policies/{en,vi}.ts`, wired into both dictionaries as the `policies` key (`vi.ts` is typed as `Policies`, so a missing translation fails the build)
- Long-form copy uses light inline markup — `**bold**` and `[label](/path)` — rendered by `src/components/Legal/index.tsx`, which localises every link with `localizeHref`
- Routes: `/privacy`, `/terms`, `/security`, `/security/compliance`, `/security/responsibility` (each in `(vi)` and `en`), all thin pages wrapping `src/views/LegalView.tsx`
- Linked from the footer and listed in `src/app/sitemap.ts`

### Styling
- Tailwind CSS v4 with `@import "tailwindcss"` (no PostCSS config, no UI kit plugin)
- Editorial monochrome theme tokens in `@theme`: `--color-ink`, `--color-black`, `--color-charcoal`, `--color-accent`, `--color-paper`, `--color-paper-light`, `--color-muted`, `--color-line`
- Fonts via `next/font/google` in `src/app/fonts.ts`: Inter (body) + Barlow Condensed (display); headings use the display font automatically
- Editorial primitives in `src/styles/index.css`: `.page-width`, `.section-pad`, `.eyebrow`, `.micro-label`, `.display-*`, `.rule-top`, `.rule-accent`, `.band-dark`, `.btn-editorial`
- Single theme — no dark mode and no `dark:` variants
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
