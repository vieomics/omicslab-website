import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/terms",
  title: dict.metadata.terms.title,
  description: dict.metadata.terms.description,
});

export default function TermsPage() {
  return (
    <LegalView
      dict={dict}
      locale="en"
      path="/terms"
      page={dict.policies.terms}
    />
  );
}
