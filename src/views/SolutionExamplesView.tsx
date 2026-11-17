import Contact from "@/components/Contact";
import SingleBlog from "@/components/Blog/SingleBlog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import { getAuthorByKey } from "@/utils/authors";
import Link from "next/link";

type SolutionExampleContent = {
  title: string;
  subtitle: string;
  intro: string;
  blog: {
    title: string;
    subtitle: string;
    slugs: string[];
  };
  cta: {
    title: string;
    paragraph: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  researchOnly?: {
    label: string;
    text: string;
  };
};

export default function SolutionExamplesView({
  content,
  dict,
  locale,
  posts,
}: {
  content: SolutionExampleContent;
  dict: Dictionary;
  locale: Locale;
  posts: any[];
}) {
  const blogSlugs = new Set(content.blog.slugs);
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
          <h1 className="display-lg max-w-[1100px] text-white">
            {content.title}
          </h1>
          <p className="mt-6 max-w-[820px] text-base leading-relaxed text-white sm:text-lg">
            {content.subtitle}
          </p>
          {content.researchOnly && (
            <div className="mt-8 inline-flex items-center border border-white/30 px-4 py-2">
              <span className="micro-label text-white/80">
                {content.researchOnly.label}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="section-pad">
        <div className="page-width">
          <div className="rule-accent max-w-[900px]">
            {content.intro.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-ink mt-5 text-base leading-relaxed first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {content.researchOnly && (
            <div className="border-line bg-paper-light mt-8 max-w-[900px] border px-5 py-4">
              <p className="micro-label text-ink">
                {content.researchOnly.label}
              </p>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {content.researchOnly.text}
              </p>
            </div>
          )}
        </div>
      </section>

      {blogCards.length > 0 && (
        <section className="section-pad rule-top">
          <div className="page-width">
            <h2 className="display-md text-ink">{content.blog.title}</h2>
            <p className="text-muted mt-5 max-w-[820px] text-base leading-relaxed">
              {content.blog.subtitle}
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
              {content.cta.title}
            </h2>
            <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-white/65 sm:text-base">
              {content.cta.paragraph}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localizeHref(content.cta.primaryHref, locale)}
                target={
                  content.cta.primaryHref.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  content.cta.primaryHref.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="btn-editorial btn-editorial-inverse"
              >
                {content.cta.primaryLabel}
              </Link>
              <Link
                href={localizeHref(content.cta.secondaryHref, locale)}
                className="btn-editorial border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink"
              >
                {content.cta.secondaryLabel}
              </Link>
            </div>
            {content.researchOnly && (
              <p className="mt-5 text-xs text-white/45">
                {content.researchOnly.label}
              </p>
            )}
          </div>
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
