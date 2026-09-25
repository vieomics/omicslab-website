import CodeBlockWrapper from "@/components/Blog/CodeBlockWrapper";
import SingleBlog from "@/components/Blog/SingleBlog";
import TableOfContents from "@/components/Blog/TableOfContents";
import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/date";
import { localizePath } from "@/i18n/paths";
import { TocItem } from "@/utils/toc";
import Image from "next/image";
import Link from "next/link";

interface BlogPostViewProps {
  dict: Dictionary;
  locale: Locale;
  title: string;
  content: string;
  coverImage: string;
  author: string;
  authorImage: string;
  date: string;
  headings: TocItem[];
  recentPosts: Blog[];
  translationSlug: string | null;
}

export default function BlogPostView({
  dict,
  locale,
  title,
  content,
  coverImage,
  author,
  authorImage,
  date,
  headings,
  recentPosts,
  translationSlug,
}: BlogPostViewProps) {
  const otherLocale: Locale = locale === "vi" ? "en" : "vi";

  return (
    <>
      <CodeBlockWrapper
        copyLabel={dict.common.copy}
        copiedLabel={dict.common.copied}
      />

      <section className="section-pad">
        <div className="page-width">
          <header className="mb-14">
            <span className="eyebrow text-muted">
              <span className="eyebrow-line" />
              {formatDate(date, locale)}
            </span>
            <h1 className="display-lg mt-6 mb-8 max-w-[1100px] text-ink">
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
                <p className="micro-label text-ink">{author}</p>
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
            <div className="mt-10 border border-line">
              <Image
                src={coverImage}
                alt="image"
                width={1920}
                height={600}
                className="h-auto w-full object-cover"
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

          <div className="rule-top mt-24 pt-12">
            <h2 className="display-md text-ink">
              {dict.common.recentArticles}
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {recentPosts.slice(0, 6).map((blog, key) => (
              <SingleBlog key={key} blog={blog} dict={dict} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
