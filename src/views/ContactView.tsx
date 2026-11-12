import Contact from "@/components/Contact";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";

export default function ContactView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const page = dict.contactPage;

  return (
    <>
      <Contact dict={dict} fullHeight={false} />

      <section className="section-pad rule-top bg-paper-light">
        <div className="page-width">
          <span className="eyebrow text-muted">
            <span className="eyebrow-line" />
            {page.subtitle}
          </span>
          <h2 className="display-lg mt-6 max-w-[760px] text-ink">
            {page.title}
          </h2>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-muted">
            {page.paragraph}
          </p>

          <div className="border-line bg-line mt-12 grid gap-px border md:grid-cols-3">
            {page.items.map((item) => (
              <article key={item.title} className="bg-paper-light p-8">
                <h3 className="display-md text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.paragraph}
                </p>
              </article>
            ))}
          </div>

          <div className="border-line bg-paper-light mt-12 border p-8">
            <h3 className="display-md text-ink">{page.support.title}</h3>
            <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-muted">
              {page.support.paragraph}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={localizePath("/guide", locale)}
                className="btn-editorial btn-editorial-ghost min-h-0 px-4 py-2"
              >
                {page.support.guideLabel}
              </Link>
              <Link
                href={localizePath("/policies/support", locale)}
                className="btn-editorial btn-editorial-ghost min-h-0 px-4 py-2"
              >
                {page.support.supportLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
