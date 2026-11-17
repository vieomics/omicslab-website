import JsonLd from "@/components/Seo/JsonLd";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import { serviceJsonLd } from "@/utils/structuredData";
import SolutionExamplesView from "@/views/SolutionExamplesView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/solutions/methylation",
  title: dict.solutions.methylation.metadataTitle,
  description: dict.solutions.methylation.metadataDescription,
});

export default function MethylationPage() {
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
          path: "/solutions/methylation",
          name: dict.solutions.methylation.title,
          description: dict.solutions.methylation.metadataDescription,
          serviceType: dict.solutions.methylation.serviceType,
        })}
      />
      <SolutionExamplesView
        content={dict.solutions.methylation}
        dict={dict}
        locale="en"
        posts={posts}
      />
    </>
  );
}
