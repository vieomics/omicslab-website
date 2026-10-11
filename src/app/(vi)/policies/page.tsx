import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import PolicyHub from "@/components/Legal/PolicyHub";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/policies",
  title: dict.policies.hub.title,
  description: dict.policies.hub.description,
});

export default function PoliciesPage() {
  return <PolicyHub dict={dict} locale="vi" />;
}
