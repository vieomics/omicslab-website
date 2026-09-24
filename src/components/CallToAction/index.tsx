import Link from "next/link";
import { Dictionary } from "@/i18n";

const CallToAction = ({ dict }: { dict: Dictionary }) => {
  const { cta } = dict.home;
  return (
    <section className="band-dark section-pad">
      <div className="page-width">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="display-lg text-white">
            {cta.title} <span className="text-accent">{cta.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-7 mb-10 max-w-[560px] text-base leading-relaxed text-[#b9b9b9]">
            {cta.paragraph}
          </p>

          <Link
            href="#contact"
            className="btn-editorial btn-editorial-inverse"
          >
            {cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
