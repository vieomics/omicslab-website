import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import SolutionsIndexView from "@/views/SolutionsIndexView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/solutions",
  title: dict.solutions.index.title,
  description: dict.solutions.index.metadataDescription,
});

export default function SolutionsPage() {
  return <SolutionsIndexView dict={dict} />;
}
