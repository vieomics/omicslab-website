import JsonLd from "@/components/Seo/JsonLd";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import { serviceJsonLd } from "@/utils/structuredData";
import PipelinesView from "@/views/PipelinesView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/solutions/custom-solutions",
  title: dict.solutions.pipelines.metadataTitle,
  description: dict.solutions.pipelines.metadataDescription,
});

export default function CustomSolutionsPage() {
  const posts = getAllPosts("en", [
    "title",
    "slug",
    "date",
    "description",
    "coverImage",
    "tags",
    "author",
  ]);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          locale: "en",
          path: "/solutions/custom-solutions",
          name: dict.solutions.pipelines.title,
          description: dict.solutions.pipelines.metadataDescription,
          serviceType: dict.solutions.pipelines.serviceType,
        })}
      />
      <PipelinesView dict={dict} locale="en" posts={posts} />
    </>
  );
}
