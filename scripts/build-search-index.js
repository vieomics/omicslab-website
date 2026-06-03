const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "public/blogs");
const outputPath = path.join(process.cwd(), "public/search-index.json");

function getPostFiles() {
  const files = [];

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        const relativePath = fullPath.replace(postsDirectory + "/", "");
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

  scanDirectory(postsDirectory);
  return files;
}

const postFiles = getPostFiles();
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
  const imagePath = data.image
    ? `/blogs/${file.folderPath}/${data.image.replace(/^\.\//, "")}`
    : null;

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

fs.writeFileSync(outputPath, JSON.stringify(searchItems), "utf8");
console.log(`Search index generated with ${searchItems.length} posts at ${outputPath}`);
