import type { MetadataRoute } from "next";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { getPostSlugs, getPostTranslation } from "@/utils/markdown";
import { getAllTracks } from "@/utils/study";

export const dynamic = "force-static";

const baseUrl = "https://omicslab.io";
const localeList: Locale[] = ["vi", "en"];

const staticPaths = [
  "/",
  "/about",
  "/blogs",
  "/blogs/topics",
  "/study",
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

  for (const locale of localeList) {
    const other: Locale = locale === "vi" ? "en" : "vi";

    for (const track of getAllTracks(locale)) {
      entries.push({
        url: `${baseUrl}${localizePath(`/study/${track.slug}`, locale)}`,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            vi: `${baseUrl}${localizePath(`/study/${track.slug}`, "vi")}`,
            en: `${baseUrl}${localizePath(`/study/${track.slug}`, "en")}`,
          },
        },
      });

      for (const lesson of track.lessons) {
        const lessonPath = `/study/${track.slug}/${lesson.slug}`;
        entries.push({
          url: `${baseUrl}${localizePath(lessonPath, locale)}`,
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              [locale]: `${baseUrl}${localizePath(lessonPath, locale)}`,
              [other]: `${baseUrl}${localizePath(lessonPath, other)}`,
            },
          },
        });
      }
    }
  }

  return entries;
}
