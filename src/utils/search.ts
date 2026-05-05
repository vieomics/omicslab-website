import Fuse from "fuse.js";
import { getAllPosts } from "./markdown";

export interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

let searchIndex: Fuse<SearchItem> | null = null;

export function buildSearchIndex(): Fuse<SearchItem> {
  const posts = getAllPosts([
    "slug",
    "title",
    "excerpt",
    "content",
    "tags",
    "date",
  ]);

  const searchItems: SearchItem[] = posts.map((post) => ({
    slug: post.slug as string,
    title: post.title as string,
    excerpt: (post.excerpt as string) || "",
    content: ((post.content as string) || "")
      .replace(/<[^>]*>/g, " ")
      .slice(0, 5000),
    tags: (post.tags as string[]) || [],
    date: post.date as string,
  }));

  searchIndex = new Fuse(searchItems, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "content", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "excerpt", weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  return searchIndex;
}

export function searchPosts(query: string, limit: number = 10): SearchItem[] {
  if (!searchIndex) {
    buildSearchIndex();
  }

  const results = searchIndex!.search(query, { limit });

  return results.map((result) => ({
    slug: result.item.slug,
    title: result.item.title,
    excerpt: result.item.excerpt,
    content: result.item.content.slice(0, 200) + "...",
    tags: result.item.tags,
    date: result.item.date,
    score: result.score,
  }));
}

export function getSearchSuggestions(
  query: string,
  limit: number = 5,
): string[] {
  if (!searchIndex) {
    buildSearchIndex();
  }

  const results = searchIndex!.search(query, { limit: limit * 2 });

  const suggestions = new Set<string>();
  results.forEach((result) => {
    if (result.item.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(result.item.title);
    }
    result.item.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}
