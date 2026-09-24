import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import InfrastructureView from "@/views/InfrastructureView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/solutions/infrastructure",
  title: dict.solutions.infrastructure.metadataTitle,
  description: dict.solutions.infrastructure.metadataDescription,
});

export default function InfrastructurePage() {
  const posts = getAllPosts("vi", [
    "title",
    "slug",
    "date",
    "description",
    "coverImage",
    "tags",
    "author",
  ]);

  return <InfrastructureView dict={dict} locale="vi" posts={posts} />;
}
