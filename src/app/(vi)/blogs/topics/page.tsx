import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import BlogTopicsView, { type TopicPost } from "@/views/BlogTopicsView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/blogs/topics",
  title: dict.blogPage.topics.title,
  description: dict.blogPage.topics.description,
});

const BlogTopics = () => {
  const posts = getAllPosts("vi", [
    "title",
    "date",
    "slug",
    "tags",
    "metadata",
  ]);

  return <BlogTopicsView dict={dict} locale="vi" posts={posts as unknown as TopicPost[]} />;
};

export default BlogTopics;
