import BlogList from "@/components/Blog/BlogList";
import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

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
    <>
      <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <BlogList
            posts={posts}
            allTags={allTags}
            dict={dict}
            locale={locale}
          />
        </div>
      </section>
    </>
  );
}
