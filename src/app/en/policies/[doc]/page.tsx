import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { policyDocumentRoutes } from "@/i18n/policyRoutes";
import LegalView from "@/views/LegalView";
import type { Metadata } from "next";

const dict = getDictionary("en");

type Props = {
  params: Promise<{ doc: string }>;
};

export function generateStaticParams() {
  return policyDocumentRoutes.map((route) => ({
    doc: route.path.split("/").pop() as string,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params;
  const route = policyDocumentRoutes.find(
    (item) => item.path === `/policies/${doc}`,
  );
  if (!route) {
    return { title: "Policy", robots: { index: false, follow: false } };
  }
  const page = dict.policies[route.key];
  return pageMetadata({
    locale: "en",
    path: route.path,
    title: page.title,
    description: page.description,
  });
}

export default async function PolicyDocumentPage({ params }: Props) {
  const { doc } = await params;
  const route = policyDocumentRoutes.find(
    (item) => item.path === `/policies/${doc}`,
  );
  if (!route) {
    notFound();
  }

  return (
    <LegalView
      dict={dict}
      locale="en"
      path={route.path}
      page={dict.policies[route.key]}
    />
  );
}
