import JsonLd from "@/components/Seo/JsonLd";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import { serviceJsonLd } from "@/utils/structuredData";
import SolutionExamplesView from "@/views/SolutionExamplesView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/solutions/variants",
  title: dict.solutions.variants.metadataTitle,
  description: dict.solutions.variants.metadataDescription,
});

export default function VariantsPage() {
  const posts = getAllPosts("vi", [
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
          locale: "vi",
          path: "/solutions/variants",
          name: dict.solutions.variants.title,
          description: dict.solutions.variants.metadataDescription,
          serviceType: dict.solutions.variants.serviceType,
        })}
      />
      <SolutionExamplesView
        content={dict.solutions.variants}
        dict={dict}
        locale="vi"
        posts={posts}
      />
    </>
  );
}
