import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import AboutView from "@/views/AboutView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/about",
  title: dict.metadata.about.title,
  description: dict.metadata.about.description,
});

export default function AboutPage() {
  return <AboutView dict={dict} />;
}
