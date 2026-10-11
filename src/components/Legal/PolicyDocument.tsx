import type { Locale } from "@/i18n/config";
import type { PolicyPage } from "@/i18n/dictionaries/policies/en";
import { Block, Inline } from "./index";

interface SiteInfo {
  legalName: string;
  address: string;
  taxLabel: string;
  taxId: string;
  phoneLabel: string;
  phone: string;
}

interface PolicyDocumentProps {
  page: PolicyPage;
  site: SiteInfo;
  locale: Locale;
  lastUpdatedLabel: string;
  lastUpdated: string;
}

/**
 * Standalone, chrome-free rendering of a single policy document. Used by the
 * printable `/legal/[doc]` routes so each policy can be exported to PDF for
 * submission (e.g. to Vietnam's e-commerce notification portal).
 */
const PolicyDocument = ({
  page,
  site,
  locale,
  lastUpdatedLabel,
  lastUpdated,
}: PolicyDocumentProps) => {
  return (
    <article className="policy-doc mx-auto max-w-[820px] px-8 py-10">
      <header className="border-b border-line pb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
          {site.legalName}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">
          {site.address}
        </p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
          {site.taxLabel}: {site.taxId}
          {"  ·  "}
          {site.phoneLabel}: {site.phone}
        </p>
      </header>

      <h1 className="display-md mt-8 text-ink">{page.title}</h1>

      {page.description && (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {page.description}
        </p>
      )}

      <p className="micro-label mt-5 text-muted">
        {lastUpdatedLabel}: {lastUpdated}
      </p>

      {page.notice && (
        <div className="mt-6 border-l-4 border-ink bg-paper-light py-4 pr-5 pl-5">
          <p className="text-sm leading-relaxed text-ink">
            <Inline text={page.notice} locale={locale} />
          </p>
        </div>
      )}

      <div className="mt-8 space-y-9">
        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="policy-section">
            {section.title && (
              <h2 className="display-sm text-ink">{section.title}</h2>
            )}
            <div className="legal-body mt-4">
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} locale={locale} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};

export default PolicyDocument;
