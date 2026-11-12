import type { MetadataRoute } from "next";
import { Locale, defaultLocale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { siteUrl } from "@/i18n/site";
import { getAllPosts, getPostTranslation } from "@/utils/markdown";

export const dynamic = "force-static";

const localeList: Locale[] = ["vi", "en"];

const staticPaths = [
  "/",
  "/about",
  "/blogs",
  "/blogs/topics",
  "/guide",
  "/guide/videos",
  "/contact",
  "/privacy",
  "/terms",
  "/policies",
  "/policies/security",
  "/policies/pricing",
  "/policies/payment",
  "/policies/service-provision",
  "/policies/conditions",
  "/policies/rights-obligations",
  "/policies/complaints",
  "/policies/support",
  "/solutions",
  "/solutions/data-platform",
  "/solutions/custom-solutions",
];

function staticAlternates(path: string): Record<string, string> {
  const vi = `${siteUrl}${localizePath(path, "vi")}`;
  const en = `${siteUrl}${localizePath(path, "en")}`;
  return {
    vi,
    en,
    "x-default": vi,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of localeList) {
      entries.push({
        url: `${siteUrl}${localizePath(path, locale)}`,
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.8,
        alternates: {
          languages: staticAlternates(path),
        },
      });
    }
  }

  for (const locale of localeList) {
    for (const post of getAllPosts(locale, ["slug", "date"])) {
      const slug = post.slug as string;
      const translation = getPostTranslation(locale, slug);
      const otherLocale: Locale = locale === "vi" ? "en" : "vi";
      const languages: Record<string, string> = {
        [locale]: `${siteUrl}${localizePath(`/blogs/${slug}`, locale)}`,
      };

      if (translation) {
        languages[otherLocale] = `${siteUrl}${localizePath(
          `/blogs/${translation}`,
          otherLocale,
        )}`;
      }

      const defaultSlug = locale === defaultLocale ? slug : translation;
      languages["x-default"] = `${siteUrl}${localizePath(
        `/blogs/${defaultSlug ?? slug}`,
        defaultSlug ? defaultLocale : locale,
      )}`;

      entries.push({
        url: `${siteUrl}${localizePath(`/blogs/${slug}`, locale)}`,
        lastModified: new Date(post.date as string),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
