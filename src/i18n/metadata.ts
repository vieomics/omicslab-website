import type { Metadata } from "next";
import { Locale } from "./config";
import { localizePath } from "./paths";
import { getPostTranslation } from "@/utils/markdown";

interface PageMetadataOptions {
  locale: Locale;
  /** Locale-independent path, e.g. "/about". */
  path: string;
  title: string;
  description?: string;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataOptions): Metadata {
  const viPath = localizePath(path, "vi");
  const enPath = localizePath(path, "en");

  return {
    title,
    description,
    alternates: {
      canonical: localizePath(path, locale),
      languages: {
        vi: viPath,
        en: enPath,
        "x-default": viPath,
      },
    },
  };
}

interface BlogMetadataOptions {
  locale: Locale;
  slug: string;
  title: string;
  description?: string;
}

export function blogPostMetadata({
  locale,
  slug,
  title,
  description,
}: BlogMetadataOptions): Metadata {
  const translation = getPostTranslation(locale, slug);
  const currentPath = localizePath(`/blogs/${slug}`, locale);
  const languages: Record<string, string> = {
    [locale]: currentPath,
  };
  if (translation) {
    const other: Locale = locale === "vi" ? "en" : "vi";
    languages[other] = localizePath(`/blogs/${translation}`, other);
  }
  languages["x-default"] = localizePath(`/blogs/${slug}`, "vi");

  return {
    title,
    description,
    alternates: {
      canonical: currentPath,
      languages,
    },
  };
}
