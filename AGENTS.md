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

### Policy pages
- Content lives in `src/i18n/dictionaries/policies/{en,vi}.ts`, wired into both dictionaries as the `policies` key (`vi.ts` is typed as `Policies`, so a missing translation fails the build). Section titles use `Điều N.` (vi) / `Article N.` (en).
- `src/i18n/policyRoutes.ts` is the single ordered list of policy pages; it drives the legal sidebar, the `/policies` hub and the sitemap.
- Long-form copy uses light inline markup — `**bold**` and `[label](/path)` — rendered by `src/components/Legal/index.tsx`, which localises every link with `localizeHref`
- Routes (each in `(vi)` and `en`): `/privacy`, `/terms`, `/policies` (hub), and `/policies/[doc]` for `pricing`, `payment`, `service-provision`, `conditions`, `rights-obligations`, `complaints`, `support`. The `[doc]` route uses `generateStaticParams`; pages wrap `src/views/LegalView.tsx` / `src/components/Legal/PolicyHub.tsx`
- The set mirrors the Bộ Công Thương-approved per-policy model (one page per policy, `Điều N.` articles), keeping Omicslab/Vieomics specifics
- Linked from the footer and listed in `src/app/sitemap.ts`
- `(print)/legal/[doc]` renders a chrome-free standalone document per policy (`noindex`, excluded from the sitemap). Run `npm run build && npm run pdf:policies` to export the 4 upload PDFs (privacy, complaints, pricing, payment) to `policy-pdfs/` for the e-commerce notification portal
- Sensitive-data positioning (keep Privacy, Terms and the policy set consistent): the public cloud platform does **not** accept or process sensitive personal data of individuals in Vietnam (human genomic / health data). Such data is handled only through a separate, contracted on-premise deployment where Vieomics just delivers/deploys the software and instructs the customer's team, and the customer runs, analyses, stores and manages the data itself — Vieomics is neither Data Controller nor Data Processor for it. The public, platform-managed (Marketplace) service is documented as intended **only** for non-human data (microorganisms, plants, animals, environmental samples), simulated/benchmark data, and lawfully published or properly de-identified public data; state this scope identically wherever the Marketplace is described (Privacy Policy, Terms of Service, and the `service-provision` / `conditions` policy docs) so the security/responsibility language never implies the public Platform handles non-public human data
- Data-processing roles are determined by the **actual processing activities, not labels**: if Vieomics accesses servers, views data to debug, receives logs/diagnostics/job metadata containing personal data, or runs jobs on customer infrastructure, it may act as processor (or controller where it sets purposes) for that data, and contractual disclaimers never override mandatory legal obligations. Keep the boundary between software sale/licence, limited support, and actually operating infrastructure/processing data explicit in Privacy §1/§12 and Terms §3
- Never claim that customer-managed or BYOC infrastructure keeps data in Vietnam — residency there depends on the infrastructure the customer selects/operates and Vieomics does not control or guarantee it. Residency "in Vietnam / no cross-border transfer" claims apply only to storage and compute that Vieomics itself provides
- For NGS/human data, file format (FASTQ/BAM/VCF), Sample ID / subject codes instead of names, and availability on public repositories (NCBI) are **not** by themselves proof that personal-data obligations have disappeared. Require the Privacy §1 assessment (access conditions, licence, permitted purpose, accompanying metadata, re-identification risk) and state that dataset-specific rules should be confirmed with qualified Vietnamese legal counsel
- Security/encryption claims must be scoped to three tiers: (1) measures Vieomics directly implements and controls, (2) measures the cloud/infrastructure provider is responsible for, and (3) measures the customer implements (self-hosted / BYOC storage, database, backup, logging). Never publish absolute claims (e.g. "AES-256 at rest" on every resource) unless verified in that deployment model — use "where the platform directly stores it / supported by the underlying provider and configuration" instead
- Retention is a **single 7-day window** — grace and recovery are unified (`GRACE_DAYS = 7`; `workspace_recovery_days` default `7`). For marketplace storage: when the prepaid cycle ends, access is blocked and the data is retained for **7 days**; at expiry + 7 days the workspace is archived for immediate purge and the daily sweep permanently deletes the data (only `audit/` kept). A workspace/organization the customer deletes is restorable for the same **7 days**. Source of truth: `omicslab-platform` `backend/app/service_payment/storage_billing.py`, `service_job/tasks/billing.py`, `service_workspace/lifecycle.py`, `service_job/tasks/purge.py`

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
