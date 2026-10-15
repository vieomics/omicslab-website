import BlogList from "@/components/Blog/BlogList";
import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";

interface BlogListViewProps {
  dict: Dictionary;
  locale: Locale;
  posts: Blog[];
  allTags: string[];
}

export default function BlogListView({
  dict,
  locale,
  posts,
  allTags,
}: BlogListViewProps) {
  return (
    <section className="section-pad">
      <div className="page-width">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <span className="eyebrow text-muted">
            <span className="eyebrow-line" />
            {dict.blogPage.title}
          </span>
          <Link
            href={localizePath("/blogs/topics", locale)}
            className="btn-editorial btn-editorial-ghost min-h-0 px-4 py-2"
          >
            {dict.blogPage.topics.browseTopics}
          </Link>
        </div>
        <BlogList posts={posts} allTags={allTags} dict={dict} locale={locale} />
      </div>
    </section>
  );
}
