import { Dictionary } from "@/i18n";

export default function SolutionsIndexView({ dict }: { dict: Dictionary }) {
  const { index } = dict.solutions;
  return (
    <div>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <h1 className="display-lg max-w-[1000px] text-white">
            {index.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-[#c9c9c9] sm:text-lg">
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
        </div>
      </section>
    </div>
  );
}
