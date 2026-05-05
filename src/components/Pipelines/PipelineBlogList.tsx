"use client";

import BlogListWithFilter, {
  BlogPost,
} from "@/components/Blog/BlogListWithFilter";

export default function PipelineBlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="mt-12">
      <BlogListWithFilter
        posts={posts}
        layout="grid"
        searchPlaceholder="Search pipelines..."
      />
    </div>
  );
}
