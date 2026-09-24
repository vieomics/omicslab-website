import { Dictionary } from "@/i18n";
import SectionTitle from "../Common/SectionTitle";

const HowItWorks = ({ dict }: { dict: Dictionary }) => {
  const { howItWorks } = dict.home;
  return (
    <section className="section-pad rule-top">
      <div className="page-width">
        <SectionTitle
          subtitle={howItWorks.subtitle}
          title={howItWorks.title}
          paragraph={howItWorks.paragraph}
        />

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <div key={i} className="flex flex-col bg-paper-light p-8">
              <span className="font-display text-5xl leading-none font-extrabold text-line">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-md mt-6 mb-4 text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
