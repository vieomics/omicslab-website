import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import ErrorView from "@/views/ErrorView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = {
  ...pageMetadata({
    locale: "vi",
    path: "/error",
    title: dict.errorPage.title,
    description: dict.errorPage.description,
  }),
  robots: { index: false, follow: false },
};

const ErrorPage = () => {
  return <ErrorView dict={dict} locale="vi" />;
};

export default ErrorPage;
