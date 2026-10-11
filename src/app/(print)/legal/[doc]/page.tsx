import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import PolicyDocument from "@/components/Legal/PolicyDocument";
import type { PolicyPage } from "@/i18n/dictionaries/policies/en";
import type { Metadata } from "next";

const dict = getDictionary("vi");

/**
 * The policy documents exported to PDF for the e-commerce notification portal,
 * keyed by the `doc` segment in /legal/[doc].
 */
const documents: Record<string, PolicyPage> = {
  privacy: dict.policies.privacy,
  terms: dict.policies.terms,
  security: dict.policies.security,
  pricing: dict.policies.pricing,
  payment: dict.policies.payment,
  "service-provision": dict.policies.serviceProvision,
  conditions: dict.policies.conditions,
  "rights-obligations": dict.policies.rightsObligations,
  complaints: dict.policies.complaints,
  support: dict.policies.support,
};

export function generateStaticParams() {
  return Object.keys(documents).map((doc) => ({ doc }));
}

export const dynamicParams = false;

type Props = {
  params: Promise<{ doc: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params;
  const page = documents[doc];
  return {
    title: page ? page.title : "Policy",
    robots: { index: false, follow: false },
  };
}

export default async function PrintablePolicyDocument({ params }: Props) {
  const { doc } = await params;
  const page = documents[doc];

  if (!page) {
    notFound();
  }

  return (
    <PolicyDocument
      page={page}
      site={dict.site}
      locale="vi"
      lastUpdatedLabel={dict.policies.shared.lastUpdatedLabel}
      lastUpdated={dict.policies.shared.lastUpdated}
    />
  );
}
