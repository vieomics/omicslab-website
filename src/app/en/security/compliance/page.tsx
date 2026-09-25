import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/security/compliance",
  title: dict.metadata.securityCompliance.title,
  description: dict.metadata.securityCompliance.description,
});

export default function SecurityCompliancePage() {
  return (
    <LegalView
      dict={dict}
      locale="en"
      path="/security/compliance"
      page={dict.policies.compliance}
    />
  );
}
