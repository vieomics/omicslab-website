import fs from "fs";
import { join } from "path";

export type Author = {
  name: string;
  title: string;
  url: string;
  image_url: string;
  page: boolean;
  email: string;
  socials: {
    linkedin?: string;
    github?: string;
  };
};

export type AuthorsData = {
  [key: string]: Author;
};

const authorsPath = join(process.cwd(), "public/authors.yml");

function parseSimpleYaml(content: string): AuthorsData {
  const result: AuthorsData = {};
  let currentKey = "";
  let currentAuthor: Partial<Author> = {};
  let inSocials = false;
  let socialsObj: { linkedin?: string; github?: string } = {};

  function flushCurrent() {
    if (currentKey && currentAuthor.name) {
      currentAuthor.socials = socialsObj;
      result[currentKey] = currentAuthor as Author;
    }
    currentKey = "";
    currentAuthor = {};
    socialsObj = {};
    inSocials = false;
  }

  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const indented = line !== line.trimStart();

    // Top-level keys start a new author entry. Nested keys (indented) never do,
    // even when their value is empty — e.g. a bare `title:`.
    if (!indented && trimmed.endsWith(":") && !trimmed.includes(" ")) {
      flushCurrent();
      currentKey = trimmed.slice(0, -1);
      continue;
    }

    if (indented && trimmed.startsWith("socials:")) {
      inSocials = true;
      continue;
    }

    if (inSocials && indented) {
      const [key, ...valueParts] = trimmed.split(":");
      const value = valueParts.join(":").trim();
      if (key.trim() === "linkedin") socialsObj.linkedin = value;
      if (key.trim() === "github") socialsObj.github = value;
      continue;
    }

    if (trimmed.includes(":")) {
      const colonIndex = trimmed.indexOf(":");
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      if (key === "name") currentAuthor.name = value;
      if (key === "title") currentAuthor.title = value;
      if (key === "url") currentAuthor.url = value;
      if (key === "image_url") currentAuthor.image_url = value;
      if (key === "page") currentAuthor.page = value === "true";
      if (key === "email") currentAuthor.email = value;
    }
  }

  flushCurrent();
  return result;
}

export function getAuthors(): AuthorsData {
  if (!fs.existsSync(authorsPath)) {
    return {};
  }

  const fileContents = fs.readFileSync(authorsPath, "utf8");
  return parseSimpleYaml(fileContents);
}

export function getAuthorByKey(key: string): Author | null {
  const authors = getAuthors();
  return authors[key] || null;
}
