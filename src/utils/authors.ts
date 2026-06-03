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

  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.endsWith(":") && !trimmed.includes(" ")) {
      if (currentKey && currentAuthor.name) {
        result[currentKey] = currentAuthor as Author;
      }
      currentKey = trimmed.replace(":", "");
      currentAuthor = {};
      inSocials = false;
      continue;
    }

    if (trimmed.startsWith("socials:")) {
      inSocials = true;
      socialsObj = {};
      continue;
    }

    if (inSocials && trimmed.includes(":")) {
      const [key, ...valueParts] = trimmed.split(":");
      const value = valueParts.join(":").trim();
      if (key.trim() === "linkedin") socialsObj.linkedin = value;
      if (key.trim() === "github") socialsObj.github = value;
      continue;
    }

    if (inSocials && !trimmed.startsWith(" ") && trimmed.includes(":")) {
      currentAuthor.socials = socialsObj;
      inSocials = false;
    }

    if (trimmed.includes(":") && !inSocials) {
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

  if (currentKey && currentAuthor.name) {
    result[currentKey] = currentAuthor as Author;
  }

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
