import Link from "next/link";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";

const Hero = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  const { hero } = dict.home;
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/images/hero/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />

      <div className="page-width relative z-10 pt-36 pb-24">
        <span className="eyebrow text-accent">
          <span className="eyebrow-line" />
          {dict.site.tagline}
        </span>
        <h1 className="display-xl mt-7 max-w-[1000px] text-white">
          {hero.title}
        </h1>
        <p className="mt-7 max-w-[640px] text-base leading-relaxed text-[#c9c9c9] sm:text-lg">
          {hero.paragraph}
        </p>
        <ul className="mt-10 flex flex-wrap items-center gap-4">
          <li>
            <Link
              href={localizeHref("/contact", locale)}
              className="btn-editorial btn-editorial-inverse"
            >
              {hero.contactCta}
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/vieomics"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink"
            >
              {hero.githubCta}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
