import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import Guide from "@/components/Guide";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/guide",
  title: dict.metadata.guide.title,
  description: dict.metadata.guide.description,
});

export default function GuidePage() {
  return <Guide guide={dict.guide} locale="vi" />;
}
