import JsonLd from "@/components/Seo/JsonLd";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { getAllPosts } from "@/utils/markdown";
import { serviceJsonLd } from "@/utils/structuredData";
import MetagenomicsView from "@/views/MetagenomicsView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/solutions/metagenomics",
  title: dict.solutions.metagenomics.metadataTitle,
  description: dict.solutions.metagenomics.metadataDescription,
});

export default function MetagenomicsPage() {
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
          path: "/solutions/metagenomics",
          name: dict.solutions.metagenomics.title,
          description: dict.solutions.metagenomics.metadataDescription,
          serviceType: dict.solutions.metagenomics.serviceType,
        })}
      />
      <MetagenomicsView dict={dict} locale="vi" posts={posts} />
    </>
  );
}
