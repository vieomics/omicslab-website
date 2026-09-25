import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/privacy",
  title: dict.metadata.privacy.title,
  description: dict.metadata.privacy.description,
});

export default function PrivacyPage() {
  return (
    <LegalView
      dict={dict}
      locale="en"
      path="/privacy"
      page={dict.policies.privacy}
    />
  );
}
