const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const locales = ["vi", "en"];
const postsRoot = path.join(process.cwd(), "public/blogs");
const publicDir = path.join(process.cwd(), "public");

function getPostFiles(locale) {
  const files = [];
  const baseDir = path.join(postsRoot, locale);

  if (!fs.existsSync(baseDir)) {
    return files;
  }

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        const relativePath = fullPath.replace(baseDir + path.sep, "");
        const folderPath = relativePath
          .replace(/\.mdx?$/, "")
          .replace(/\/[^/]+$/, "");
        files.push({
          fullPath,
          folderPath,
          fileName: entry.name,
        });
      }
    }
  }

  scanDirectory(baseDir);
  return files;
}

function resolveImagePath(locale, folderPath, image) {
  if (!image) return null;
  if (image.startsWith("/") || image.startsWith("http")) return image;

  const relative = image.replace(/^\.\//, "");
  const candidates = locale === "vi" ? ["vi", "en"] : ["en", "vi"];

  for (const candidate of candidates) {
    const absolute = path.join(postsRoot, candidate, folderPath, relative);
    if (fs.existsSync(absolute)) {
      return `/blogs/${candidate}/${folderPath}/${relative}`;
    }
  }

  return `/blogs/${locale}/${folderPath}/${relative}`;
}

for (const locale of locales) {
  const postFiles = getPostFiles(locale);
  const searchItems = [];

  for (const file of postFiles) {
    const fileContents = fs.readFileSync(file.fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const slug = data.slug || file.fileName.replace(/\.mdx?$/, "");
    const title = data.title || slug;
    const description = data.description || "";
    const date = data.date
      ? new Date(data.date).toISOString()
      : file.fileName.replace(/\.mdx?$/, "");
    const tags = Array.isArray(data.tags)
      ? data.tags
      : data.tags
        ? [data.tags]
        : [];
    const imagePath = resolveImagePath(locale, file.folderPath, data.image);

    searchItems.push({
      slug,
      title,
      excerpt: description,
      content: content
        .replace(/#{1,6}\s+/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/`{1,3}[^`]*`{1,3}/g, "")
        .replace(/<[^>]*>/g, "")
        .replace(/\n+/g, " ")
        .slice(0, 2000),
      tags,
      date,
      coverImage: imagePath,
    });
  }

  const outputPath = path.join(publicDir, `search-index.${locale}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(searchItems), "utf8");
  console.log(
    `Search index generated with ${searchItems.length} ${locale} posts at ${outputPath}`,
  );
}

// Remove the legacy single-locale index if it exists.
const legacyIndex = path.join(publicDir, "search-index.json");
if (fs.existsSync(legacyIndex)) {
  fs.unlinkSync(legacyIndex);
}
