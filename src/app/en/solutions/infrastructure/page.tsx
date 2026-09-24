import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import InfrastructureView from "@/views/InfrastructureView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/solutions/infrastructure",
  title: dict.solutions.infrastructure.metadataTitle,
  description: dict.solutions.infrastructure.metadataDescription,
});

export default function InfrastructurePage() {
  const posts = getAllPosts("en", [
    "title",
    "slug",
    "date",
    "description",
    "coverImage",
    "tags",
    "author",
  ]);

  return <InfrastructureView dict={dict} locale="en" posts={posts} />;
}
