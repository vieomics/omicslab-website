import { Dictionary } from "@/i18n";
import SectionTitle from "../Common/SectionTitle";

const PlatformStrip = ({ dict }: { dict: Dictionary }) => {
  const { platforms } = dict.home;
  return (
    <section className="section-pad rule-top">
      <div className="page-width">
        <SectionTitle
          subtitle={platforms.subtitle}
          title={platforms.title}
          paragraph={platforms.paragraph}
          center
        />

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {platforms.items.map((item, i) => (
            <div key={i} className="bg-paper-light p-6">
              <h3 className="font-display text-2xl leading-none font-extrabold tracking-[-0.01em] text-ink uppercase">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStrip;
