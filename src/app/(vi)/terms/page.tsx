import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/terms",
  title: dict.metadata.terms.title,
  description: dict.metadata.terms.description,
});

export default function TermsPage() {
  return (
    <LegalView
      dict={dict}
      locale="vi"
      path="/terms"
      page={dict.policies.terms}
    />
  );
}
