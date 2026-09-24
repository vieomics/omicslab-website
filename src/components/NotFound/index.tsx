import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";

const NotFound = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  return (
    <section className="section-pad">
      <div className="page-width">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="eyebrow text-muted">
            <span className="eyebrow-line" />
            {dict.errorPage.title}
          </span>

          <p className="display-xl text-ink mt-7">404</p>

          <div className="border-line bg-paper-light mt-12 w-full max-w-[280px] border p-8">
            <div className="relative aspect-[129/138]">
              <Image
                src="/images/404.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="display-md text-ink mt-12">{dict.notFound.heading}</h1>
          <p className="text-muted mt-5 max-w-[560px] text-base leading-relaxed">
            {dict.notFound.paragraph}
          </p>

          <Link
            href={localizeHref("/", locale)}
            className="btn-editorial mt-10"
          >
            {dict.notFound.button}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
