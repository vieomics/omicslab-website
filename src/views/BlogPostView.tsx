import CodeBlockWrapper from "@/components/Blog/CodeBlockWrapper";
import JsonLd from "@/components/Seo/JsonLd";
import SingleBlog from "@/components/Blog/SingleBlog";
import TableOfContents from "@/components/Blog/TableOfContents";
import ScholarLink from "@/components/Common/ScholarLink";
import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/date";
import { localizePath } from "@/i18n/paths";
import { TocItem } from "@/utils/toc";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "@/utils/structuredData";
import Image from "next/image";
import Link from "next/link";

interface BlogPostViewProps {
  dict: Dictionary;
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  author: string;
  authorImage: string;
  authorTitle?: string | null;
  authorScholar?: string | null;
  authorLinkedin?: string | null;
  authorGithub?: string | null;
  date: string;
  updated?: string;
  tags?: string[];
  citations?: string[];
  headings: TocItem[];
  relatedPosts: Blog[];
  translationSlug: string | null;
}

export default function BlogPostView({
  dict,
  locale,
  slug,
  title,
  description,
  content,
  coverImage,
  author,
  authorImage,
  authorTitle,
  authorScholar,
  authorLinkedin,
  authorGithub,
  date,
  updated,
  tags = [],
  citations = [],
  headings,
  relatedPosts,
  translationSlug,
}: BlogPostViewProps) {
  const otherLocale: Locale = locale === "vi" ? "en" : "vi";
  const postingJsonLd = blogPostingJsonLd({
    locale,
    slug,
    title,
    description,
    image: coverImage,
    date,
    updated,
    tags,
    citations,
    author,
    authorUrl: authorLinkedin || authorScholar || authorGithub,
    authorSameAs: [authorScholar, authorLinkedin, authorGithub],
  });
  const breadcrumb = breadcrumbJsonLd({
    locale,
    slug,
    title,
    homeLabel: dict.nav.home,
    blogLabel: dict.nav.blog,
  });

  return (
    <>
      <JsonLd data={postingJsonLd} />
      <JsonLd data={breadcrumb} />
      <CodeBlockWrapper
        copyLabel={dict.common.copy}
        copiedLabel={dict.common.copied}
      />

      <section className="section-pad">
        <div className="page-width">
          <header className="mb-14">
            <nav
              aria-label={dict.common.breadcrumb}
              className="micro-label text-muted mb-8 flex flex-wrap items-center gap-2"
            >
              <Link
                href={localizePath("/", locale)}
                className="transition-colors hover:text-ink"
              >
                {dict.nav.home}
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={localizePath("/blogs", locale)}
                className="transition-colors hover:text-ink"
              >
                {dict.nav.blog}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink line-clamp-1">{title}</span>
            </nav>
            <span className="eyebrow text-muted">
              <span className="eyebrow-line" />
              {formatDate(date, locale)}
            </span>
            <h1 className="display-title mt-6 mb-8 max-w-[1100px] text-ink">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden border border-line">
                  <Image
                    src={authorImage}
                    alt={author}
                    className="h-full w-full object-cover"
                    width={40}
                    height={40}
                    unoptimized
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="micro-label text-ink">{author}</p>
                  {authorScholar && (
                    <ScholarLink href={authorScholar} size={14} />
                  )}
                </div>
              </div>
              {translationSlug && (
                <Link
                  href={localizePath(`/blogs/${translationSlug}`, otherLocale)}
                  className="btn-editorial btn-editorial-ghost min-h-0 px-4 py-2"
                >
                  {dict.common.readInOtherLanguage}
                </Link>
              )}
            </div>
            <div className="mt-10 border border-line bg-white">
              <Image
                src={coverImage}
                alt={title}
                width={1920}
                height={600}
                className="h-auto w-full object-cover"
                preload
              />
            </div>
          </header>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-9">
              <div className="border border-line bg-paper-light p-6 sm:p-10">
                <div className="blog-details xl:pr-6">
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
              </div>
            </div>
            <aside className="min-w-0 lg:col-span-3">
              <TableOfContents
                headings={headings}
                title={dict.common.tableOfContents}
              />
            </aside>
          </div>

          <aside className="rule-top mt-20 pt-10">
            <p className="eyebrow text-muted">
              <span className="eyebrow-line" />
              {dict.common.aboutAuthor}
            </p>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-16 w-16 shrink-0 overflow-hidden border border-line">
                <Image
                  src={authorImage}
                  alt={author}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="display-md text-ink">{author}</p>
                {authorTitle && (
                  <p className="micro-label text-muted mt-2">{authorTitle}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {authorScholar && (
                    <a
                      href={authorScholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="micro-label text-ink decoration-accent underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      {dict.common.googleScholar} ↗
                    </a>
                  )}
                  {authorLinkedin && (
                    <a
                      href={authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="micro-label text-ink decoration-accent underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      {dict.common.linkedin} ↗
                    </a>
                  )}
                  {authorGithub && (
                    <a
                      href={authorGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="micro-label text-ink decoration-accent underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      {dict.common.github} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <div className="rule-top mt-24 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display-md text-ink">
                {dict.common.relatedArticles}
              </h2>
              <Link
                href={localizePath("/blogs", locale)}
                className="micro-label text-ink decoration-accent underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
              >
                {dict.common.browseAllArticles} →
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.slice(0, 6).map((blog, key) => (
              <SingleBlog key={key} blog={blog} dict={dict} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
