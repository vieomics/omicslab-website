"use client";

import BlogListWithFilter, {
  BlogPost,
} from "@/components/Blog/BlogListWithFilter";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

export default function PipelineBlogList({
  posts,
  dict,
  locale,
}: {
  posts: BlogPost[];
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <div className="mt-16">
      <BlogListWithFilter
        posts={posts}
        dict={dict}
        locale={locale}
        layout="grid"
        searchPlaceholder={dict.blogPage.searchPipelines}
      />
    </div>
  );
}
