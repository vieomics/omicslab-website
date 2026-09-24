import Link from "next/link";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";

const Breadcrumb = ({
  dict,
  locale,
  pageName,
  pageDescription,
}: {
  dict: Dictionary;
  locale: Locale;
  pageName: string;
  pageDescription?: string;
}) => {
  return (
    <div className="band-dark overflow-hidden pt-[150px] pb-16 md:pt-[170px] md:pb-20">
      <div className="page-width">
        <nav
          aria-label={pageName}
          className="micro-label mb-7 flex items-center gap-3 text-white"
        >
          <Link
            href={localizeHref("/", locale)}
            className="transition-opacity hover:opacity-70"
          >
            {dict.common.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{pageName}</span>
        </nav>
        <h1 className="display-lg max-w-[900px] text-white">{pageName}</h1>
        {pageDescription && (
          <p className="mt-7 max-w-[640px] text-base leading-relaxed text-white">
            {pageDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
