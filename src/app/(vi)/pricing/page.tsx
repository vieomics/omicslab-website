import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import PricingView from "@/views/PricingView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/pricing",
  title: dict.metadata.pricing.title,
  description: dict.metadata.pricing.description,
});

const PricingPage = () => {
  return <PricingView dict={dict} locale="vi" />;
};

export default PricingPage;
