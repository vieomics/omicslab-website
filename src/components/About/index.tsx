import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/i18n";

const About = ({ dict }: { dict: Dictionary }) => {
  const { about } = dict.home;
  return (
    <section id="about" className="section-pad">
      <div className="page-width grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="display-lg mb-8 max-w-[560px] text-ink">
            {about.title}
          </h2>
          <p className="mb-10 max-w-[540px] text-base leading-relaxed text-muted">
            {about.paragraph1}
          </p>

          <Link
            href="https://github.com/vieomics"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial"
          >
            {about.cta}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-px border border-line bg-line">
          <div className="relative aspect-[4/5] bg-paper-light">
            <Image
              src="/images/about/multiomics.svg"
              alt="about image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-px bg-line">
            <div className="relative aspect-square bg-paper-light">
              <Image
                src="/images/about/cat.gif"
                alt="about image"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center bg-ink p-6 text-paper-light">
              <span className="font-display text-4xl leading-none font-extrabold">
                {about.badge.line1}
              </span>
              <span className="micro-label mt-3 text-white">
                {about.badge.line2}
              </span>
              <span className="mt-1 text-xs text-white">
                {about.badge.line3}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
