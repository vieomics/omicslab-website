import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import ContactView from "@/views/ContactView";
import type { Metadata } from "next";

const dict = getDictionary("vi");

export const metadata: Metadata = pageMetadata({
  locale: "vi",
  path: "/contact",
  title: dict.metadata.contact.title,
  description: dict.metadata.contact.description,
});

const ContactPage = () => {
  return <ContactView dict={dict} locale="vi" />;
};

export default ContactPage;
