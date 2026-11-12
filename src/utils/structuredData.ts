import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { siteName, siteUrl } from "@/i18n/site";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/images/logo/omicslab-ico.svg`,
    sameAs: [
      "https://github.com/vieomics",
      "https://www.linkedin.com/company/omicstech/",
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url:
      locale === "vi"
        ? `${siteUrl}/`
        : `${siteUrl}${localizePath("/", locale)}`,
    name: siteName,
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    publisher: { "@id": organizationId },
  };
}

interface BlogPostingJsonLdInput {
  locale: Locale;
  slug: string;
  title: string;
  description?: string;
  image?: string;
  date: string;
  author: string;
  authorUrl?: string | null;
  authorSameAs?: (string | null | undefined)[];
}

export function blogPostingJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  date,
  author,
  authorUrl,
  authorSameAs = [],
}: BlogPostingJsonLdInput) {
  const sameAs = authorSameAs.filter((url): url is string => Boolean(url));
  const url = `${siteUrl}${localizePath(`/blogs/${slug}`, locale)}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
      ...(authorUrl ? { url: authorUrl } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
    publisher: { "@id": organizationId },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    isPartOf: { "@id": websiteId },
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\*\*/g, ""),
      },
    })),
  };
}

interface ServiceJsonLdInput {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  serviceType: string;
}

export function serviceJsonLd({
  locale,
  path,
  name,
  description,
  serviceType,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${siteUrl}${localizePath(path, locale)}`,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Vietnam" },
    availableLanguage: ["vi", "en"],
  };
}

interface BreadcrumbJsonLdInput {
  locale: Locale;
  slug: string;
  title: string;
  homeLabel: string;
  blogLabel: string;
}

export function breadcrumbJsonLd({
  locale,
  slug,
  title,
  homeLabel,
  blogLabel,
}: BreadcrumbJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${siteUrl}${localizePath("/", locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blogLabel,
        item: `${siteUrl}${localizePath("/blogs", locale)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteUrl}${localizePath(`/blogs/${slug}`, locale)}`,
      },
    ],
  };
}
