import NotFound from "@/components/NotFound";
import { getDictionary } from "@/i18n";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = {
  title: dict.errorPage.title,
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound dict={dict} locale="vi" />;
}
