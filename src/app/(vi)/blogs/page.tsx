import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAuthors } from "@/utils/authors";
import { getAllPosts, getAllTags } from "@/utils/markdown";
import BlogListView from "@/views/BlogListView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/blogs",
  title: dict.metadata.blog.title,
  description: dict.metadata.blog.description,
});

const Blog = () => {
  const posts = getAllPosts("vi", [
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "tags",
    "author",
  ]);
  const allTags = getAllTags("vi");
  const authors = getAuthors();

  const postsWithAuthorData = posts.map((post: any) => ({
    ...post,
    authorData: post.author ? authors[post.author] || null : null,
  }));

  return (
    <BlogListView
      dict={dict}
      locale="vi"
      posts={postsWithAuthorData}
      allTags={allTags}
    />
  );
};

export default Blog;
