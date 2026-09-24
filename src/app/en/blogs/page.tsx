import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAuthors } from "@/utils/authors";
import { getAllPosts, getAllTags } from "@/utils/markdown";
import BlogListView from "@/views/BlogListView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/blogs",
  title: dict.metadata.blog.title,
  description: dict.metadata.blog.description,
});

const Blog = () => {
  const posts = getAllPosts("en", [
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "tags",
    "author",
  ]);
  const allTags = getAllTags("en");
  const authors = getAuthors();

  const postsWithAuthorData = posts.map((post: any) => ({
    ...post,
    authorData: post.author ? authors[post.author] || null : null,
  }));

  return (
    <BlogListView
      dict={dict}
      locale="en"
      posts={postsWithAuthorData}
      allTags={allTags}
    />
  );
};

export default Blog;
