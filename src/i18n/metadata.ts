import type { Metadata } from "next";
import { Locale, defaultLocale } from "./config";
import { localizePath } from "./paths";
import { siteName, siteUrl } from "./site";
import { getPostTranslation } from "@/utils/markdown";

interface PageMetadataOptions {
  locale: Locale;
  /** Locale-independent path, e.g. "/about". */
  path: string;
  title: string;
  description?: string;
}

interface BlogMetadataOptions {
  locale: Locale;
  slug: string;
  title: string;
  description?: string;
  image?: string;
  date?: string;
  author?: string;
}

function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataOptions): Metadata {
  const viPath = absoluteUrl(localizePath(path, "vi"));
  const enPath = absoluteUrl(localizePath(path, "en"));
  const canonical = locale === "vi" ? viPath : enPath;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        vi: viPath,
        en: enPath,
        "x-default": viPath,
      },
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonical,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? ["en_US"] : ["vi_VN"],
    },
  };
}

export function blogPostMetadata({
  locale,
  slug,
  title,
  description,
  image,
  date,
  author,
}: BlogMetadataOptions): Metadata {
  const otherLocale: Locale = locale === "vi" ? "en" : "vi";
  const translation = getPostTranslation(locale, slug);
  const currentPath = localizePath(`/blogs/${slug}`, locale);
  const canonical = absoluteUrl(currentPath);

  const languages: Record<string, string> = {
    [locale]: canonical,
  };
  if (translation) {
    languages[otherLocale] = absoluteUrl(
      localizePath(`/blogs/${translation}`, otherLocale),
    );
  }

  // x-default must point at a page that actually exists. The default locale is
  // Vietnamese, so use the translated Vietnamese slug when there is one and
  // fall back to the current article when it has not been translated yet.
  const defaultPath =
    locale === defaultLocale
      ? currentPath
      : translation
        ? localizePath(`/blogs/${translation}`, defaultLocale)
        : currentPath;
  languages["x-default"] = absoluteUrl(defaultPath);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "article",
      siteName,
      title,
      description,
      url: canonical,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? ["en_US"] : ["vi_VN"],
      publishedTime: date,
      authors: author ? [author] : undefined,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
