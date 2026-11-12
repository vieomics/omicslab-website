import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Locale } from "@/i18n/config";

const postsRoot = join(process.cwd(), "public/blogs");

interface PostFile {
  slug: string;
  folderPath: string;
  fileName: string;
}

function localeDirectory(locale: Locale): string {
  return join(postsRoot, locale);
}

function getPostFiles(locale: Locale): PostFile[] {
  const files: PostFile[] = [];
  const baseDir = localeDirectory(locale);

  if (!fs.existsSync(baseDir)) {
    return files;
  }

  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        const relativePath = fullPath.replace(baseDir + "/", "");
        const folderPath = relativePath
          .replace(/\.mdx?$/, "")
          .replace(/\/[^/]+$/, "");
        const slug = entry.name.replace(/\.mdx?$/, "");
        files.push({ slug, folderPath, fileName: entry.name });
      }
    }
  }

  scanDirectory(baseDir);
  return files;
}

/**
 * Resolve an image referenced from a post. Images are looked up in the post's
 * own locale folder first, then in the other locale folder, so translated
 * posts can reuse the original images without duplicating files.
 */
function resolveImagePath(
  locale: Locale,
  folderPath: string,
  src: string,
): string {
  if (src.startsWith("/") || src.startsWith("http")) {
    return src;
  }

  const relative = src.replace(/^\.\//, "");
  const candidates: Locale[] = locale === "vi" ? ["vi", "en"] : ["en", "vi"];

  for (const candidate of candidates) {
    const absolute = join(postsRoot, candidate, folderPath, relative);
    if (fs.existsSync(absolute)) {
      return `/blogs/${candidate}/${folderPath}/${relative}`;
    }
  }

  return `/blogs/${locale}/${folderPath}/${relative}`;
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function readPostFile(file: PostFile, locale: Locale) {
  const fullPath = join(localeDirectory(locale), file.folderPath, file.fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
}

function findPostFile(locale: Locale, slug: string): PostFile | null {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const postFiles = getPostFiles(locale);

  let postFile = postFiles.find((f) => f.slug === realSlug);

  if (!postFile) {
    for (const file of postFiles) {
      const { data } = readPostFile(file, locale);
      if (data.slug === realSlug) {
        postFile = file;
        break;
      }
    }
  }

  return postFile ?? null;
}

export function getPostSlugs(locale: Locale): string[] {
  const slugs: string[] = [];
  const postFiles = getPostFiles(locale);

  for (const file of postFiles) {
    const { data } = readPostFile(file, locale);
    slugs.push(data.slug || file.slug);
  }

  return slugs;
}

export function getPostBySlug(
  locale: Locale,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const postFile = findPostFile(locale, realSlug);

  if (!postFile) {
    return null;
  }

  const { data, content } = readPostFile(postFile, locale);

  type Items = {
    [key: string]: string | string[] | object | null;
  };

  const items: Items = {};

  function parseDateFromFileName(fileName: string): Date | null {
    const match = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) {
      const date = new Date(match[1]);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return null;
  }

  function processContent(rawContent: string, folderPath: string) {
    let processed = rawContent.replace(/<!--truncate-->/g, "");
    processed = processed.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      (match, alt, path) => {
        const fixedPath = resolveImagePath(locale, folderPath, path);
        return `<img src="${fixedPath}" alt="${escapeHtmlAttribute(alt)}" />`;
      },
    );
    processed = processed.replace(
      /<figure[^>]*>[\s\S]*?<\/figure>/gi,
      (match) => {
        const imgMatch = match.match(/<img[^>]+src="([^"]+)"/);
        const captionMatch = match.match(
          /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/,
        );
        if (imgMatch) {
          const src = resolveImagePath(locale, folderPath, imgMatch[1]);
          let html = `<figure><img src="${src}" alt="" />`;
          if (captionMatch) {
            html += `<figcaption>${captionMatch[1]}</figcaption>`;
          }
          html += "</figure>";
          return html;
        }
        return match;
      },
    );
    return processed;
  }

  const postSlug = data.slug || realSlug;
  const folderPath = postFile.folderPath;

  let postDate = data.date ? new Date(data.date) : null;
  if (!postDate || isNaN(postDate.getTime())) {
    postDate = parseDateFromFileName(postFile.fileName);
  }
  if (!postDate || isNaN(postDate.getTime())) {
    postDate = new Date();
  }

  const authorName = Array.isArray(data.authors)
    ? data.authors[0]
    : data.authors || "Anonymous";
  const tags = Array.isArray(data.tags)
    ? data.tags
    : data.tags
      ? [data.tags]
      : [];

  const imagePath = data.image
    ? resolveImagePath(locale, folderPath, data.image)
    : null;

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = postSlug;
    }
    if (field === "content") {
      items[field] = processContent(content, folderPath);
    }
    if (field === "date") {
      items[field] = postDate?.toISOString();
    }
    if (field === "author") {
      items[field] = authorName;
    }
    if (field === "tags") {
      items[field] = tags;
    }
    if (field === "coverImage") {
      items[field] = imagePath;
    }
    if (field === "metadata") {
      items[field] = {
        ...data,
        coverImage: imagePath,
        tags,
        authors: data.authors,
      };
    }
    if (
      typeof data[field] !== "undefined" &&
      !["slug", "date", "authors", "tags", "image"].includes(field)
    ) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(locale: Locale, fields: string[] = []) {
  const postFiles = getPostFiles(locale);
  const posts: PostItems[] = [];

  for (const file of postFiles) {
    const { data } = readPostFile(file, locale);
    const slug = data.slug || file.slug;

    const post = getPostBySlug(locale, slug, fields);
    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((post1, post2) => {
    const date1 = new Date(post1.date as string);
    const date2 = new Date(post2.date as string);
    return date2.getTime() - date1.getTime();
  });
}

export function getAllTags(locale: Locale): string[] {
  const posts = getAllPosts(locale, ["tags"]);
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    const tags = post.tags as string[];
    if (tags) {
      tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

type PostItems = {
  [key: string]: string | string[] | object | null;
};

export function getPostsByTag(
  locale: Locale,
  tag: string,
  fields: string[] = [],
): PostItems[] {
  const allPosts = getAllPosts(locale, [...fields, "tags"]);
  return allPosts.filter((post) => {
    const tags = post.tags as string[];
    return tags ? tags.includes(tag) : false;
  });
}

export function searchPosts(
  locale: Locale,
  query: string,
  fields: string[] = [],
): PostItems[] {
  const allPosts = getAllPosts(locale, [...fields, "title", "content", "tags"]);
  const lowerQuery = query.toLowerCase();

  return allPosts.filter((post) => {
    const title = ((post.title as string) || "").toLowerCase();
    const content = ((post.content as string) || "").toLowerCase();
    const tags = ((post.tags as string[]) || []).map((t) => t.toLowerCase());

    return (
      title.includes(lowerQuery) ||
      content.includes(lowerQuery) ||
      tags.some((tag) => tag.includes(lowerQuery))
    );
  });
}

/**
 * Slugs that exist in both locales. Used by the language switcher to link
 * directly to a translated article instead of the blog index.
 */
export function getTranslatedSlugs(): string[] {
  const viSlugs = new Set(getPostSlugs("vi"));
  const enSlugs = getPostSlugs("en");
  return enSlugs.filter((slug) => viSlugs.has(slug));
}

/**
 * Return the slug of the same article in the other locale, or null when the
 * article has not been translated yet.
 */
export function getPostTranslation(
  locale: Locale,
  slug: string,
): string | null {
  const other: Locale = locale === "vi" ? "en" : "vi";
  const realSlug = slug.replace(/\.mdx?$/, "");
  const file = findPostFile(other, realSlug);
  if (!file) {
    return null;
  }
  const { data } = readPostFile(file, other);
  return data.slug || file.slug;
}
