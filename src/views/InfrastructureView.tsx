import BlogListWithFilter from "@/components/Blog/BlogListWithFilter";
import Contact from "@/components/Contact";
import OfferList from "@/components/Pricing/OfferList";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { toBlogPosts } from "@/utils/blogPosts";

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
    <div className="container mt-16 py-20">
      <h1 className="mb-8 text-4xl font-bold">{t.title}</h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
        {t.subtitle}
      </p>

      <div className="border-primary mb-12 border-l-4 bg-gray-50 p-6 dark:bg-gray-800">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          {t.intro}
        </p>
      </div>

      {/* Related HPC Blog Posts */}
      {infraPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">
            {dict.blogPage.guides.title}
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {dict.blogPage.guides.paragraph}
          </p>
          <BlogListWithFilter
            posts={toBlogPosts(infraPosts)}
            dict={dict}
            locale={locale}
            layout="grid"
            searchPlaceholder={t.searchPlaceholder}
            className="grid gap-6 md:grid-cols-3"
          />
        </section>
      )}

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.available.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <path
                    fill="var(--ci-primary-color, #000000)"
                    d="M16,48V464H496V48ZM464,432H48V336H464Zm0-128H48V208H464ZM48,176V80H464v96Z"
                  ></path>
                  <rect width="32" height="32" x="80" y="112"></rect>
                  <rect width="32" height="32" x="80" y="240"></rect>
                  <rect width="32" height="32" x="80" y="368"></rect>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.available.items[0].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.available.items[0].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.available.items[1].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.available.items[1].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.available.items[2].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.available.items[2].paragraph}
            </p>
          </div>
        </div>
      </section>

      {/* On-Premises HPC Details */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.onPrem.title}</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {t.onPrem.paragraph}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Mini-HPC */}
          <div className="rounded-xl border-2 border-blue-500 bg-white p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                {t.onPrem.plans[0].badge}
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-semibold">
              {t.onPrem.plans[0].title}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t.onPrem.plans[0].description}
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">
                {t.onPrem.plans[0].price}
              </span>
              <span className="text-gray-500">
                {t.onPrem.plans[0].priceSuffix}
              </span>
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">
                {t.onPrem.plans[0].configTitle}
              </p>
              {t.onPrem.plans[0].config.map((item) => (
                <OfferList key={item} text={item} />
              ))}
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">
                {t.onPrem.plans[0].includesTitle}
              </p>
              {t.onPrem.plans[0].includes.map((item) => (
                <OfferList key={item} text={item} />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-500">
              {t.onPrem.plans[0].note}
            </p>
          </div>

          {/* Maintenance Service */}
          <div className="rounded-xl border-2 border-green-500 bg-white p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                {t.onPrem.plans[1].badge}
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-semibold">
              {t.onPrem.plans[1].title}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t.onPrem.plans[1].description}
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">
                {t.onPrem.plans[1].price}
              </span>
              <span className="text-gray-500">
                {t.onPrem.plans[1].priceSuffix}
              </span>
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">
                {t.onPrem.plans[1].includesTitle}
              </p>
              {t.onPrem.plans[1].includes.map((item) => (
                <OfferList key={item} text={item} />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-500">
              {t.onPrem.plans[1].note}
            </p>
          </div>
          {/* Multi-nodes */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block rounded bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                {t.onPrem.plans[2].badge}
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-semibold">
              {t.onPrem.plans[2].title}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t.onPrem.plans[2].description}
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-600">
                {t.onPrem.plans[2].price}
              </span>
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">
                {t.onPrem.plans[2].configTitle}
              </p>
              {t.onPrem.plans[2].config.map((item) => (
                <OfferList key={item} text={item} />
              ))}
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">
                {t.onPrem.plans[2].includesTitle}
              </p>
              {t.onPrem.plans[2].includes.map((item) => (
                <OfferList key={item} text={item} />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-500">
              {t.onPrem.plans[2].note}
            </p>
          </div>
        </div>
      </section>

      {/* Cloud Features */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.cloudFeatures.title}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-cyan-50 p-6 dark:bg-cyan-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.cloudFeatures.items[0].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.cloudFeatures.items[0].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.cloudFeatures.items[1].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.cloudFeatures.items[1].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-pink-50 p-6 dark:bg-pink-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.cloudFeatures.items[2].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.cloudFeatures.items[2].paragraph}
            </p>
          </div>
          <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                <svg
                  fill="#000000"
                  viewBox="0 0 36 36"
                  version="1.1"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M33,6.69h0c-.18-3.41-9.47-4.33-15-4.33S3,3.29,3,6.78V29.37c0,3.49,9.43,4.43,15,4.43s15-.93,15-4.43V6.78s0,0,0,0S33,6.7,33,6.69Zm-2,7.56c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,15.34v2.08A43.32,43.32,0,0,0,18,18.7c4,0,9.93-.48,13-2v5.17c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,22.92V25a43.32,43.32,0,0,0,11,1.28c4,0,9.93-.48,13-2v5.1c-.35.86-5.08,2.45-13,2.45S5.3,30.2,5,29.37V6.82C5.3,6,10,4.36,18,4.36c7.77,0,12.46,1.53,13,2.37-.52.87-5.21,2.39-13,2.39A37.6,37.6,0,0,1,7,7.76V9.85a43.53,43.53,0,0,0,11,1.27c4,0,9.93-.48,13-2Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                {t.cloudFeatures.items[3].title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.cloudFeatures.items[3].paragraph}
            </p>
          </div>
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
