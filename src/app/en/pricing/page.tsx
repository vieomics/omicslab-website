import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import PricingView from "@/views/PricingView";
import type { Metadata } from "next";

const dict = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/pricing",
  title: dict.metadata.pricing.title,
  description: dict.metadata.pricing.description,
});

const PricingPage = () => {
  return <PricingView dict={dict} locale="en" />;
};

export default PricingPage;
