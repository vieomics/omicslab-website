import Contact from "@/components/Contact";
import SingleBlog from "@/components/Blog/SingleBlog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import { getAuthorByKey } from "@/utils/authors";
import Link from "next/link";

export default function MetagenomicsView({
  dict,
  locale,
  posts,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: any[];
}) {
  const t = dict.solutions.metagenomics;
  const blogSlugs = new Set(t.blog.slugs);
  const blogCards = posts
    .filter((post) => blogSlugs.has(post.slug as string))
    .map((post) => ({
      title: post.title as string,
      slug: post.slug as string,
      excerpt: post.description as string,
      coverImage: (post.coverImage as string | null) ?? undefined,
      date: post.date as string,
      author: post.author as string,
      tags: (post.tags as string[]) || [],
      authorData: post.author ? getAuthorByKey(post.author as string) : null,
    }));

  return (
    <div>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <h1 className="display-lg max-w-[1100px] text-white">{t.title}</h1>
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
                className="text-ink mt-5 text-base leading-relaxed first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {blogCards.length > 0 && (
        <section className="section-pad rule-top">
          <div className="page-width">
            <h2 className="display-md text-ink">{t.blog.title}</h2>
            <p className="text-muted mt-5 max-w-[820px] text-base leading-relaxed">
              {t.blog.subtitle}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogCards.map((blog) => (
                <SingleBlog
                  key={blog.slug}
                  blog={blog}
                  dict={dict}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad">
        <div className="page-width">
          <div className="band-dark px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <h2 className="display-md max-w-[760px] text-white">
              {t.cta.title}
            </h2>
            <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-white/65 sm:text-base">
              {t.cta.paragraph}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localizeHref(t.cta.primaryHref, locale)}
                target={
                  t.cta.primaryHref.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  t.cta.primaryHref.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="btn-editorial btn-editorial-inverse"
              >
                {t.cta.primaryLabel}
              </Link>
              <Link
                href={localizeHref(t.cta.secondaryHref, locale)}
                className="btn-editorial border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink"
              >
                {t.cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
