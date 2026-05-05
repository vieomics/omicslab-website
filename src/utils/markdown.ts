import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "markdown/blogs");

interface PostFile {
  slug: string;
  folderPath: string;
  fileName: string;
}

function getPostFiles(): PostFile[] {
  const files: PostFile[] = [];

  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        const relativePath = fullPath.replace(postsDirectory + "/", "");
        const folderPath = relativePath
          .replace(/\.mdx?$/, "")
          .replace(/\/[^/]+$/, "");
        const slug = entry.name.replace(/\.mdx?$/, "");
        files.push({ slug, folderPath, fileName: entry.name });
      }
    }
  }

  scanDirectory(postsDirectory);
  return files;
}

export function getPostSlugs(): string[] {
  const slugs: string[] = [];
  const postFiles = getPostFiles();

  for (const file of postFiles) {
    const fullPath = join(postsDirectory, file.folderPath, file.fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    if (data.slug) {
      slugs.push(data.slug);
    } else {
      slugs.push(file.slug);
    }
  }

  return slugs;
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const postFiles = getPostFiles();

  let postFile = postFiles.find((f) => f.slug === realSlug);

  if (!postFile) {
    for (const file of postFiles) {
      const fullPath = join(postsDirectory, file.folderPath, file.fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      if (data.slug === realSlug) {
        postFile = file;
        break;
      }
    }
  }

  if (!postFile) {
    return null;
  }

  const fullPath = join(postsDirectory, postFile.folderPath, postFile.fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

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

  function processContent(content: string, folderPath: string) {
    let processed = content.replace(/<!--truncate-->/g, "");
    processed = processed.replace(/!\[.*?\]\((.*?)\)/g, (match, path) => {
      let fixedPath = path;
      if (!path.startsWith("/") && !path.startsWith("http")) {
        fixedPath = `/api/markdown-blogs/${folderPath}/${path.replace(/^\.\//, "")}`;
      }
      return `<img src="${fixedPath}" alt="" />`;
    });
    processed = processed.replace(
      /<figure[^>]*>[\s\S]*?<\/figure>/gi,
      (match) => {
        const imgMatch = match.match(/<img[^>]+src="([^"]+)"/);
        const captionMatch = match.match(
          /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/,
        );
        if (imgMatch) {
          let src = imgMatch[1];
          if (!src.startsWith("/") && !src.startsWith("http")) {
            src = `/api/markdown-blogs/${folderPath}/${src.replace(/^\.\//, "")}`;
          }
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
    ? `/api/markdown-blogs/${folderPath}/${data.image.replace(/^\.\//, "")}`
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

export function getAllPosts(fields: string[] = []) {
  const postFiles = getPostFiles();
  const posts: PostItems[] = [];

  for (const file of postFiles) {
    const fullPath = join(postsDirectory, file.folderPath, file.fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = data.slug || file.slug;

    const post = getPostBySlug(slug, fields);
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

export function getAllTags(): string[] {
  const posts = getAllPosts(["tags"]);
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

export function getPostsByTag(tag: string, fields: string[] = []): PostItems[] {
  const allPosts = getAllPosts([...fields, "tags"]);
  return allPosts.filter((post) => {
    const tags = post.tags as string[];
    return tags ? tags.includes(tag) : false;
  });
}

export function searchPosts(query: string, fields: string[] = []): PostItems[] {
  const allPosts = getAllPosts([...fields, "title", "content", "tags"]);
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
