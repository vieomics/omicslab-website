import BlogListWithFilter from "@/components/Blog/BlogListWithFilter";
import Contact from "@/components/Contact";
import OfferList from "@/components/Pricing/OfferList";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { toBlogPosts } from "@/utils/blogPosts";

const availableIcons = [
  <svg
    key="on-prem"
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M16,48V464H496V48ZM464,432H48V336H464Zm0-128H48V208H464ZM48,176V80H464v96Z" />
    <rect width="32" height="32" x="80" y="112" />
    <rect width="32" height="32" x="80" y="240" />
    <rect width="32" height="32" x="80" y="368" />
  </svg>,
  <svg
    key="aws"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    />
  </svg>,
  <svg
    key="gcp"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    />
  </svg>,
];

const cloudFeatureIcons = [
  <svg
    key="scaling"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>,
  <svg
    key="cost"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>,
  <svg
    key="monitoring"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>,
  <svg
    key="storage"
    viewBox="0 0 36 36"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M33,6.69h0c-.18-3.41-9.47-4.33-15-4.33S3,3.29,3,6.78V29.37c0,3.49,9.43,4.43,15,4.43s15-.93,15-4.43V6.78s0,0,0,0S33,6.7,33,6.69Zm-2,7.56c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,15.34v2.08A43.32,43.32,0,0,0,18,18.7c4,0,9.93-.48,13-2v5.17c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,22.92V25a43.32,43.32,0,0,0,11,1.28c4,0,9.93-.48,13-2v5.1c-.35.86-5.08,2.45-13,2.45S5.3,30.2,5,29.37V6.82C5.3,6,10,4.36,18,4.36c7.77,0,12.46,1.53,13,2.37-.52.87-5.21,2.39-13,2.39A37.6,37.6,0,0,1,7,7.76V9.85a43.53,43.53,0,0,0,11,1.27c4,0,9.93-.48,13-2Z" />
  </svg>,
];

export default function InfrastructureView({
  dict,
  locale,
  posts,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: any[];
}) {
  const t = dict.solutions.infrastructure;
  const infraPosts = posts.filter((post) => {
    const tags = (post.tags as string[]) || [];
    return tags.includes("HPC") || tags.includes("infrastructure");
  });

  return (
    <div>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <h1 className="display-lg max-w-[1000px] text-white">{t.title}</h1>
          <p className="mt-6 max-w-[820px] text-base leading-relaxed text-white sm:text-lg">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-width">
          <div className="rule-accent max-w-[900px]">
            {t.intro.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-ink text-base leading-relaxed first:mt-0 mt-5"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Related HPC Blog Posts */}
      {infraPosts.length > 0 && (
        <section className="section-pad rule-top">
          <div className="page-width">
            <h2 className="display-md text-ink">
              {dict.blogPage.guides.title}
            </h2>
            <p className="text-muted mt-5 max-w-[820px] text-base leading-relaxed">
              {dict.blogPage.guides.paragraph}
            </p>
            <div className="mt-10">
              <BlogListWithFilter
                posts={toBlogPosts(infraPosts)}
                dict={dict}
                locale={locale}
                layout="grid"
                searchPlaceholder={t.searchPlaceholder}
                className="grid gap-6 md:grid-cols-3"
              />
            </div>
          </div>
        </section>
      )}

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.available.title}</h2>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-3">
            {t.available.items.map((item, index) => (
              <div key={item.title} className="bg-paper-light p-8">
                <div className="border-ink bg-ink text-paper-light mb-6 flex h-12 w-12 items-center justify-center border">
                  {availableIcons[index]}
                </div>
                <h3 className="display-md text-ink mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Premises HPC Details */}
      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.onPrem.title}</h2>
          <p className="text-muted mt-5 max-w-[820px] text-base leading-relaxed">
            {t.onPrem.paragraph}
          </p>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-3">
            {t.onPrem.plans.map((plan, index) => {
              const featured = index === 0;
              return (
                <div
                  key={plan.title}
                  className={`flex flex-col p-8 ${
                    featured
                      ? "band-dark border border-black"
                      : "border-line bg-paper-light border"
                  }`}
                >
                  <span
                    className={`micro-label self-start border px-3 py-1.5 ${
                      featured
                        ? "border-white/30 text-white"
                        : "border-line text-muted"
                    }`}
                  >
                    {plan.badge}
                  </span>

                  <h3
                    className={`display-md mt-7 ${
                      featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      featured ? "text-white" : "text-muted"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-8 flex items-baseline gap-2">
                    <span
                      className={`font-display text-[44px] leading-none font-bold tracking-[-0.02em] ${
                        featured ? "text-white" : "text-ink"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.priceSuffix && (
                      <span
                        className={`text-sm ${
                          featured ? "text-white" : "text-muted"
                        }`}
                      >
                        {plan.priceSuffix}
                      </span>
                    )}
                  </div>

                  {plan.configTitle && plan.config.length > 0 && (
                    <div className="mt-8">
                      <p
                        className={`micro-label ${
                          featured ? "text-white" : "text-muted"
                        }`}
                      >
                        {plan.configTitle}
                      </p>
                      <div className="mt-3">
                        {plan.config.map((item) => (
                          <OfferList
                            key={item}
                            text={item}
                            inverse={featured}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <p
                      className={`micro-label ${
                        featured ? "text-white" : "text-muted"
                      }`}
                    >
                      {plan.includesTitle}
                    </p>
                    <div className="mt-3">
                      {plan.includes.map((item) => (
                        <OfferList key={item} text={item} inverse={featured} />
                      ))}
                    </div>
                  </div>

                  <p
                    className={`mt-auto pt-8 text-xs leading-relaxed ${
                      featured ? "text-white" : "text-muted"
                    }`}
                  >
                    {plan.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cloud Features */}
      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.cloudFeatures.title}</h2>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-2">
            {t.cloudFeatures.items.map((item, index) => (
              <div key={item.title} className="bg-paper-light p-8">
                <div className="border-ink bg-ink text-paper-light mb-6 flex h-12 w-12 items-center justify-center border">
                  {cloudFeatureIcons[index]}
                </div>
                <h3 className="display-md text-ink mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
