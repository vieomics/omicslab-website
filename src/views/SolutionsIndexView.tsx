import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";

export default function SolutionsIndexView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { index } = dict.solutions;
  const solutions = [
    {
      title: dict.solutions.dataPlatform.title,
      description: dict.solutions.dataPlatform.subtitle,
      href: "/solutions/data-platform",
    },
    {
      title: dict.solutions.pipelines.title,
      description: dict.solutions.pipelines.subtitle,
      href: "/solutions/custom-solutions",
    },
    {
      title: dict.solutions.metagenomics.title,
      description: dict.solutions.metagenomics.subtitle,
      href: "/solutions/metagenomics",
    },
  ];

  return (
    <div>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <h1 className="display-lg max-w-[1000px] text-white">
            {index.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
            {index.subtitle}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-width">
          <div className="rule-accent max-w-[760px]">
            <p className="text-ink text-base leading-relaxed">
              {index.paragraph}
            </p>
          </div>

          <div className="border-line bg-line mt-12 grid gap-px border md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <Link
                key={solution.href}
                href={localizePath(solution.href, locale)}
                className="group bg-paper-light p-8 transition-colors hover:bg-paper"
              >
                <h2 className="display-md text-ink">{solution.title}</h2>
                <p className="text-muted mt-4 text-sm leading-relaxed">
                  {solution.description}
                </p>
                <span className="micro-label text-ink mt-8 inline-block">
                  {dict.common.readMore} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
