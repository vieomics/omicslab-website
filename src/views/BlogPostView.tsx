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

      <section className="dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mb-[60px] w-full"
                data-wow-delay=".1s"
              >
                <Image
                  src={coverImage}
                  alt="image"
                  width={1920}
                  height={600}
                  className="h-auto w-full object-cover"
                />
                <h1 className="text-dark mt-6 mb-4 text-3xl font-bold sm:text-4xl dark:text-white">
                  {title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={authorImage}
                        alt={author}
                        className="h-full w-full object-cover"
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-dark text-base font-medium dark:text-white">
                        {author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(date, locale)}
                      </p>
                    </div>
                  </div>
                  {translationSlug && (
                    <Link
                      href={localizePath(
                        `/blogs/${translationSlug}`,
                        otherLocale,
                      )}
                      className="text-primary text-sm font-medium underline"
                    >
                      {dict.common.readInOtherLanguage}
                    </Link>
                  )}
                </div>
              </div>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-9/12">
                  <div className="blog-details xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-3/12">
                  <div className="sticky top-24">
                    <TableOfContents
                      headings={headings}
                      title={dict.common.tableOfContents}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div
              className="wow fadeInUp mt-14 w-full px-4"
              data-wow-delay=".2s"
            >
              <h2 className="text-dark relative pb-5 text-2xl font-semibold sm:text-[28px] dark:text-white">
                {dict.common.recentArticles}
              </h2>
              <span className="bg-primary mb-10 inline-block h-[2px] w-20"></span>
            </div>

            {recentPosts.slice(0, 6).map((blog, key) => (
              <div key={key} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} dict={dict} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
