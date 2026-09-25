import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/security",
  title: dict.metadata.security.title,
  description: dict.metadata.security.description,
});

export default function SecurityPage() {
  return (
    <LegalView
      dict={dict}
      locale="en"
      path="/security"
      page={dict.policies.security}
    />
  );
}
