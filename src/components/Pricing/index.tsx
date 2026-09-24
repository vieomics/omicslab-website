import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import RichText from "../Common/RichText";
import SectionTitle from "../Common/SectionTitle";

const Pricing = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  const { section } = dict.pricingPage;
  return (
    <section id="pricing" className="section-pad">
      <div className="page-width">
        <SectionTitle
          subtitle={section.subtitle}
          title={section.title}
          paragraph={section.paragraph}
          center
        />

        <ul className="border-line mx-auto mt-14 max-w-3xl border-t">
          {section.lines.map((line, index) => (
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
  );
};

export default Pricing;
