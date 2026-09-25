import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/date";
import { getAuthorTitle } from "@/i18n/authors";
import { localizePath } from "@/i18n/paths";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({
  blog,
  dict,
  locale,
}: {
  blog: Blog;
  dict: Dictionary;
  locale: Locale;
}) => {
  const { title, coverImage, excerpt, date, slug, author, authorData } = blog;
  const href = localizePath(`/blogs/${slug}`, locale);
  const authorTitle = getAuthorTitle(author, authorData?.title, dict);

  return (
    <article className="group flex h-full flex-col border border-line bg-paper-light">
      <Link
        href={href}
        aria-label="blog cover"
        className="block overflow-hidden border-b border-line bg-paper-light"
      >
        <div className="aspect-video w-full">
          <Image
            src={coverImage || "/images/blog/placeholder.jpg"}
            alt={title ?? ""}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            width={408}
            height={230}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {authorData?.image_url ? (
            <div className="h-8 w-8 shrink-0 overflow-hidden border border-line">
              <Image
                src={authorData.image_url}
                alt={authorData.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="h-8 w-8 shrink-0 border border-line bg-paper" />
          )}
          <span className="micro-label text-ink">
            {authorData?.name || author || dict.common.anonymous}
          </span>
          {authorTitle && (
            <span className="micro-label text-muted">• {authorTitle}</span>
          )}
        </div>
        <span className="micro-label mb-4 inline-flex w-fit border border-line px-3 py-1.5 text-muted">
          {date ? formatDate(date, locale) : dict.common.noDate}
        </span>
        <h3 className="display-md mb-4">
          <Link
            href={href}
            className="text-ink transition-colors hover:text-muted"
          >
            {title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {excerpt}
        </p>
      </div>
    </article>
  );
};

export default SingleBlog;
