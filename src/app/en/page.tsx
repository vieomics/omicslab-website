import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAuthors } from "@/utils/authors";
import { getAllPosts } from "@/utils/markdown";
import HomeView from "@/views/HomeView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = {
  ...pageMetadata({
    locale: "en",
    path: "/",
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
  }),
  title: { absolute: dict.metadata.home.title },
};

export default function Home() {
  const posts = getAllPosts("en", [
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "author",
  ]);
  const authors = getAuthors();

  const postsWithAuthorData = posts.map((post: any) => ({
    ...post,
    authorData: post.author ? authors[post.author] || null : null,
  }));

  return <HomeView dict={dict} locale="en" posts={postsWithAuthorData} />;
}
