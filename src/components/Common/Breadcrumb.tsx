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
    <>
      <div className="dark:bg-dark relative z-10 overflow-hidden pt-[120px] pb-[60px] md:pt-[130px] lg:pt-[160px]">
        <div className="from-stroke/0 via-stroke to-stroke/0 dark:via-dark-3 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r"></div>
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div className="text-center">
                <h1 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px] md:leading-[1.2] dark:text-white">
                  {pageName}
                </h1>
                <p className="text-body-color dark:text-dark-6 mb-5 text-base">
                  {pageDescription}
                </p>

                <ul className="flex items-center justify-center gap-[10px]">
                  <li>
                    <Link
                      href={localizeHref("/", locale)}
                      className="text-dark flex items-center gap-[10px] text-base font-medium dark:text-white"
                    >
                      {dict.common.home}
                    </Link>
                  </li>
                  <li>
                    <p className="text-body-color flex items-center gap-[10px] text-base font-medium">
                      <span className="text-body-color dark:text-dark-6">
                        {" "}
                        /{" "}
                      </span>
                      {pageName}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
