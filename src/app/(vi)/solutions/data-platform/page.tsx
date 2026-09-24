import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import DataPlatformView from "@/views/DataPlatformView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/solutions/data-platform",
  title: dict.solutions.dataPlatform.metadataTitle,
  description: dict.solutions.dataPlatform.metadataDescription,
});

export default function DataPlatformPage() {
  return <DataPlatformView dict={dict} locale="vi" />;
}
