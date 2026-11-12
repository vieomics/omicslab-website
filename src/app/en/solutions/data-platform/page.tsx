import JsonLd from "@/components/Seo/JsonLd";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { serviceJsonLd } from "@/utils/structuredData";
import DataPlatformView from "@/views/DataPlatformView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/solutions/data-platform",
  title: dict.solutions.dataPlatform.metadataTitle,
  description: dict.solutions.dataPlatform.metadataDescription,
});

export default function DataPlatformPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          locale: "en",
          path: "/solutions/data-platform",
          name: dict.solutions.dataPlatform.title,
          description: dict.solutions.dataPlatform.metadataDescription,
          serviceType: dict.solutions.dataPlatform.serviceType,
        })}
      />
      <DataPlatformView dict={dict} locale="en" />
    </>
  );
}
