import About from "@/components/About";
import Team from "@/components/Team";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";

export default function AboutView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const page = dict.aboutPage;

  return (
    <main>
      <About dict={dict} />

      <section className="section-pad rule-top">
        <div className="page-width">
          <span className="eyebrow text-muted">
            <span className="eyebrow-line" />
            {page.whatWeDo.subtitle}
          </span>
          <h2 className="display-lg mt-6 max-w-[760px] text-ink">
            {page.whatWeDo.title}
          </h2>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-muted">
            {page.whatWeDo.paragraph}
          </p>

          <div className="border-line bg-line mt-12 grid gap-px border md:grid-cols-3">
            {page.whatWeDo.items.map((item) => (
              <article key={item.title} className="bg-paper-light p-8">
                <h3 className="display-md text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.paragraph}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <span className="eyebrow text-muted">
              <span className="eyebrow-line" />
              {page.approach.subtitle}
            </span>
            <h2 className="display-lg mt-6 text-ink">
              {page.approach.title}
            </h2>
          </div>

          <div className="space-y-5 lg:col-span-7">
            {page.approach.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              {page.approach.links.map((link) => (
                <Link
                  key={link.href}
                  href={localizePath(link.href, locale)}
                  className="btn-editorial btn-editorial-ghost min-h-0 px-4 py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Team dict={dict} />
    </main>
  );
}
