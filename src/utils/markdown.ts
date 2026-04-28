import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const altFullPath = join(postsDirectory, `${realSlug}.mdx`);

  let fileContents: string = "";
  let fileName = "";

  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, "utf8");
    fileName = `${realSlug}.md`;
  } else if (fs.existsSync(altFullPath)) {
    fileContents = fs.readFileSync(altFullPath, "utf8");
    fileName = `${realSlug}.mdx`;
  } else {
    const slugs = getPostSlugs();
    for (const file of slugs) {
      const filePath = join(postsDirectory, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      if (data.slug === realSlug) {
        fileContents = content;
        fileName = file;
        break;
      }
    }
    if (!fileContents) {
      return null;
    }
  }

  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string | string[] | object | null;
  };

  const items: Items = {};

  function processContent(content: string) {
    let processed = content.replace(/<!--truncate-->/g, "");
    processed = processed.replace(/!\[.*?\]\((.*?)\)/g, (match, path) => {
      let fixedPath = path;
      if (!path.startsWith("/") && !path.startsWith("http")) {
        fixedPath = "/images/blog/" + path.replace(/^\.\//, "");
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
            src = "/images/blog/" + src.replace(/^\.\//, "");
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
  let postDate = data.date ? new Date(data.date) : new Date();
  if (isNaN(postDate.getTime())) {
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
    ? "/images/blog/" + data.image.replace(/^\.\//, "")
    : null;

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = postSlug;
    }
    if (field === "content") {
      items[field] = processContent(content);
    }
    if (field === "date") {
      items[field] = postDate.toISOString();
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
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post): post is PostItems => post !== null)
    .sort((post1, post2) => {
      const date1 = new Date(post1.date as string);
      const date2 = new Date(post2.date as string);
      return date2.getTime() - date1.getTime();
    });

  return posts;
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
