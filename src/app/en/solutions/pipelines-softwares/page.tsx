import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import PipelinesView from "@/views/PipelinesView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/solutions/pipelines-softwares",
  title: dict.solutions.pipelines.metadataTitle,
  description: dict.solutions.pipelines.metadataDescription,
});

export default function PipelinesPage() {
  const posts = getAllPosts("en", [
    "title",
    "slug",
    "date",
    "description",
    "coverImage",
    "tags",
    "author",
  ]);

  return <PipelinesView dict={dict} locale="en" posts={posts} />;
}
