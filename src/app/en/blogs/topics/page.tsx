import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import BlogTopicsView, { type TopicPost } from "@/views/BlogTopicsView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/blogs/topics",
  title: dict.blogPage.topics.title,
  description: dict.blogPage.topics.description,
});

const BlogTopics = () => {
  const posts = getAllPosts("en", [
    "title",
    "date",
    "slug",
    "tags",
    "metadata",
  ]);

  return <BlogTopicsView dict={dict} locale="en" posts={posts as unknown as TopicPost[]} />;
};

export default BlogTopics;
