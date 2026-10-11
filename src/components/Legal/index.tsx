import Link from "next/link";
import SectionNav from "./SectionNav";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import type {
  PolicyBlock,
  PolicyListItem,
  PolicyPage,
} from "@/i18n/dictionaries/policies/en";

interface LegalProps {
  page: PolicyPage;
  /** Sibling policy pages listed in the sidebar. */
  pages: { path: string; label: string }[];
  /** Locale-independent path of the rendered page, used for active state. */
  currentPath: string;
  locale: Locale;
  shared: {
    lastUpdatedLabel: string;
    lastUpdated: string;
    tocLabel: string;
    policiesLabel: string;
  };
}

/**
 * Inline markup used by the policy dictionaries:
 *   **text**        -> <strong>
 *   [label](/href)  -> internal link, localised for the active locale
 */
const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function Inline({ text, locale }: { text: string; locale: Locale }) {
  const parts = text.split(INLINE_PATTERN).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <Link key={index} href={localizeHref(link[2], locale)}>
              {link[1]}
            </Link>
          );
        }

        return part;
      })}
    </>
  );
}

/** One list entry; nested entries render as a sub-list. */
function ListItem({ item, locale }: { item: PolicyListItem; locale: Locale }) {
  if (typeof item === "string") {
    return (
      <li>
        <Inline text={item} locale={locale} />
      </li>
    );
  }

  return (
    <li>
      <Inline text={item.text} locale={locale} />
      <ul>
        {item.children.map((child, index) => (
          <ListItem key={index} item={child} locale={locale} />
        ))}
      </ul>
    </li>
  );
}

export function Block({ block, locale }: { block: PolicyBlock; locale: Locale }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} locale={locale} />
        </p>
      );
    case "label":
      return (
        <p className="legal-label">
          <Inline text={block.text} locale={locale} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, index) => (
            <ListItem key={index} item={item} locale={locale} />
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                {block.head.map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <Inline text={cell} locale={locale} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/**
 * Long-form policy page, laid out like a blog post: dark editorial header,
 * article card on the left, sticky policy navigation + table of contents in
 * the right sidebar.
 */
const Legal = ({ page, pages, currentPath, locale, shared }: LegalProps) => {
  return (
    <article>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <span className="eyebrow text-white">
            <span className="eyebrow-line" />
            {page.kicker}
          </span>
          <h1 className="display-lg mt-6 max-w-[1000px] text-white">
            {page.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
            {page.description}
          </p>
          <p className="micro-label mt-8 text-accent">
            {shared.lastUpdatedLabel}: {shared.lastUpdated}
          </p>

          {page.notice && (
            <div className="rule-accent mt-8 max-w-[760px] bg-white/5 py-4 pr-5">
              <p className="text-sm leading-relaxed text-white">
                {page.notice}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-9">
              <div className="border border-line bg-paper-light p-6 sm:p-10">
                <div className="space-y-10">
                  {page.sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="rule-top scroll-mt-28 pt-8 first:border-t-0 first:pt-0"
                    >
                      <h2 className="display-sm text-ink">{section.title}</h2>
                      <div className="legal-body mt-5">
                        {section.blocks.map((block, index) => (
                          <Block key={index} block={block} locale={locale} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>

            <aside className="min-w-0 lg:col-span-3">
              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                <div className="border border-line bg-paper-light p-6">
                  <p className="micro-label mb-4 text-muted">
                    {shared.policiesLabel}
                  </p>
                  <nav
                    aria-label={shared.policiesLabel}
                    className="flex flex-col gap-1"
                  >
                    {pages.map((item) => {
                      const active = item.path === currentPath;
                      return (
                        <Link
                          key={item.path}
                          href={localizeHref(item.path, locale)}
                          aria-current={active ? "page" : undefined}
                          className={`block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                            active
                              ? "border-ink font-semibold text-ink"
                              : "border-line text-muted hover:border-ink hover:text-ink"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <SectionNav
                  label={shared.tocLabel}
                  sections={page.sections.map((section) => ({
                    id: section.id,
                    title: section.title,
                  }))}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Legal;
