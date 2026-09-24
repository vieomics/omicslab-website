import Contact from "@/components/Contact";
import PipelineBlogList from "@/components/Pipelines/PipelineBlogList";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { toBlogPosts } from "@/utils/blogPosts";
import Link from "next/link";

export default function PipelinesView({
  dict,
  locale,
  posts,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: any[];
}) {
  const t = dict.solutions.pipelines;
  const pipelinePosts = posts.filter((post) =>
    (post.tags as string[])?.includes("pipeline"),
  );

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
            <p className="text-ink text-base leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.available.title}</h2>
          <p className="text-muted mt-5 max-w-[820px] text-base leading-relaxed">
            {t.available.paragraph}
          </p>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-2 lg:grid-cols-3">
            {t.available.categories.map((category) => (
              <div key={category.title} className="bg-paper-light p-8">
                <h3 className="display-md text-ink mb-5">{category.title}</h3>
                <ul>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="border-line text-muted flex items-baseline gap-3 border-b py-3 text-sm leading-relaxed last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-ink inline-block h-[6px] w-[6px] shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {pipelinePosts.length > 0 && (
            <PipelineBlogList
              posts={toBlogPosts(pipelinePosts)}
              dict={dict}
              locale={locale}
            />
          )}
        </div>
      </section>

      <section className="section-pad rule-top">
        <div className="page-width">
          <h2 className="display-md text-ink">{t.software.title}</h2>
          <p className="text-muted mt-5 max-w-[820px] text-base leading-relaxed">
            {t.software.paragraph}
          </p>

          <div className="border-line bg-line mt-10 grid gap-px border md:grid-cols-2">
            {t.software.packages.map((pkg) => (
              <div key={pkg.name} className="bg-paper-light flex flex-col p-8">
                <h3 className="display-md text-ink">{pkg.name}</h3>
                <p className="text-muted mt-5 flex-1 text-sm leading-relaxed">
                  {pkg.description}
                </p>
                <Link
                  href={pkg.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="micro-label text-ink hover:text-muted mt-8 inline-flex items-center gap-2 transition-colors"
                >
                  {pkg.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
