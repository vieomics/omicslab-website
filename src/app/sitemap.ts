import type { MetadataRoute } from "next";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { getPostSlugs, getPostTranslation } from "@/utils/markdown";

export const dynamic = "force-static";

const baseUrl = "https://omicslab.io";
const localeList: Locale[] = ["vi", "en"];

const staticPaths = [
  "/",
  "/about",
  "/blogs",
  "/contact",
  "/solutions",
  "/solutions/data-platform",
  "/solutions/pipelines-softwares",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of localeList) {
      entries.push({
        url: `${baseUrl}${localizePath(path, locale)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            vi: `${baseUrl}${localizePath(path, "vi")}`,
            en: `${baseUrl}${localizePath(path, "en")}`,
          },
        },
      });
    }
  }

  for (const locale of localeList) {
    for (const slug of getPostSlugs(locale)) {
      const translation = getPostTranslation(locale, slug);
      const languages: Record<string, string> = {
        [locale]: `${baseUrl}${localizePath(`/blogs/${slug}`, locale)}`,
      };
      if (translation) {
        const other: Locale = locale === "vi" ? "en" : "vi";
        languages[other] =
          `${baseUrl}${localizePath(`/blogs/${translation}`, other)}`;
      }

      entries.push({
        url: `${baseUrl}${localizePath(`/blogs/${slug}`, locale)}`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
