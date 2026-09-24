import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import Link from "next/link";
import RichText from "../Common/RichText";
import SectionTitle from "../Common/SectionTitle";

const Pricing = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  const { section, subscription, topup } = dict.pricingPage;
  return (
    <>
      <section id="pricing" className="section-pad">
        <div className="page-width">
          <SectionTitle
            subtitle={section.subtitle}
            title={section.title}
            paragraph={section.paragraph}
            center
          />

          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3 lg:mt-20">
            {subscription.tiers.map((tier) => (
              <div key={tier.name} className="flex flex-col bg-paper-light p-8">
                <span className="micro-label text-muted">{tier.highlight}</span>
                <h3 className="display-md mt-3 text-ink">{tier.name}</h3>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl leading-none font-extrabold text-ink">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6 text-sm leading-relaxed text-muted">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 bg-ink"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={localizeHref(tier.ctaHref, locale)}
                  target={
                    tier.ctaHref.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    tier.ctaHref.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="btn-editorial mt-7 w-full justify-center"
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <SectionTitle
            subtitle={topup.subtitle}
            title={topup.title}
            paragraph={topup.paragraph}
            center
          />

          <ul className="border-line mx-auto mt-14 max-w-3xl border-t">
            {topup.lines.map((line, index) => (
              <li
                key={index}
                className="border-line text-muted [&_strong]:text-ink border-b py-5 text-center text-base leading-relaxed [&_strong]:font-bold"
              >
                <RichText segments={line} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pricing;
