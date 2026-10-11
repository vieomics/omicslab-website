import Link from "next/link";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import { policyPageRoutes } from "@/i18n/policyRoutes";

/**
 * Index page for the legal/policy set at /policies: a single hub linking every
 * policy document, mirroring the structure used for e-commerce notification.
 */
const PolicyHub = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  const hub = dict.policies.hub;

  return (
    <article>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <span className="eyebrow text-white">
            <span className="eyebrow-line" />
            {hub.kicker}
          </span>
          <h1 className="display-lg mt-6 max-w-[1000px] text-white">
            {hub.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
            {hub.description}
          </p>
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <p className="max-w-[820px] text-base leading-relaxed text-ink">
            {hub.intro}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {policyPageRoutes.map((route) => {
              const page = dict.policies[route.key];
              return (
                <Link
                  key={route.path}
                  href={localizeHref(route.path, locale)}
                  className="group flex flex-col border border-line bg-paper-light p-6 transition-colors hover:border-ink"
                >
                  <span className="display-sm text-ink">{page.navTitle}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">
                    {page.description}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
};

export default PolicyHub;
