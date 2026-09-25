import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/security/responsibility",
  title: dict.metadata.securityResponsibility.title,
  description: dict.metadata.securityResponsibility.description,
});

export default function SecurityResponsibilityPage() {
  return (
    <LegalView
      dict={dict}
      locale="vi"
      path="/security/responsibility"
      page={dict.policies.responsibility}
    />
  );
}
