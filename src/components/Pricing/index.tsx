import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import RichText from "../Common/RichText";
import SectionTitle from "../Common/SectionTitle";

const Pricing = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  const { section } = dict.pricingPage;
  return (
    <section
      id="pricing"
      className="dark:bg-dark relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle={section.subtitle}
            title={section.title}
            paragraph={section.paragraph}
            center
          />
        </div>

        <div className="text-center">
          {section.lines.map((line, index) => (
            <p
              key={index}
              className="text-body-color dark:text-dark-6 mt-2 text-base first:mt-0"
            >
              <RichText segments={line} locale={locale} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
