import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/privacy",
  title: dict.metadata.privacy.title,
  description: dict.metadata.privacy.description,
});

export default function PrivacyPage() {
  return (
    <LegalView
      dict={dict}
      locale="vi"
      path="/privacy"
      page={dict.policies.privacy}
    />
  );
}
