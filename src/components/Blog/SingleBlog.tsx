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
    <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
      <div className="mb-8 overflow-hidden rounded">
        <Link href={href} aria-label="blog cover" className="block">
          <Image
            src={coverImage || "/images/blog/placeholder.jpg"}
            alt="image"
            className="h-[225px] w-full object-cover transition group-hover:scale-125 group-hover:rotate-6"
            width={408}
            height={225}
          />
        </Link>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-3">
          {authorData?.image_url ? (
            <div className="h-8 w-8 overflow-hidden rounded-full">
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
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          )}
          <span className="text-dark text-sm font-medium dark:text-white">
            {authorData?.name || author || dict.common.anonymous}
          </span>
          {authorTitle && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              • {authorTitle}
            </span>
          )}
        </div>
        <span className="bg-primary mb-5 inline-block rounded px-4 py-1 text-center text-xs leading-loose font-semibold text-white">
          {date ? formatDate(date, locale) : dict.common.noDate}
        </span>
        <h3>
          <Link
            href={href}
            className="text-dark hover:text-primary dark:hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl dark:text-white"
          >
            {title}
          </Link>
        </h3>
        <p className="text-body-color dark:text-dark-6 text-base">{excerpt}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
