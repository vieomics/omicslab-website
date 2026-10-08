"use client";

import { useState, useMemo, useEffect } from "react";
import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import SingleBlog from "./SingleBlog";
import Fuse from "fuse.js";

interface SearchIndexItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  coverImage: string | null;
}

interface BlogListProps {
  posts: Blog[];
  allTags: string[];
  dict: Dictionary;
  locale: Locale;
}

const BlogList = ({ posts, allTags, dict, locale }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [fuse, setFuse] = useState<Fuse<SearchIndexItem> | null>(null);

  useEffect(() => {
    fetch(`/search-index.${locale}.json`)
      .then((res) => res.json())
      .then((data: SearchIndexItem[]) => {
        const index = new Fuse(data, {
          keys: [
            { name: "title", weight: 0.4 },
            { name: "content", weight: 0.3 },
            { name: "tags", weight: 0.2 },
            { name: "excerpt", weight: 0.1 },
          ],
          threshold: 0.3,
          ignoreLocation: true,
          minMatchCharLength: 2,
        });
        setFuse(index);
      })
      .catch((error) => {
        // The list still filters via the local title/excerpt/tag fallback below,
        // so a failed index load degrades gracefully instead of doing nothing.
        console.error("Failed to load the blog search index:", error);
      });
  }, [locale]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Slugs matched by the full-text index for the current query, or null when we
  // should fall back to a local text match (query too short / index unavailable).
  const matchedSlugs = useMemo(() => {
    if (normalizedQuery.length < 2 || !fuse) return null;
    const results = fuse.search(normalizedQuery, { limit: 100 });
    return new Set(results.map((result) => result.item.slug));
  }, [normalizedQuery, fuse]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      if (!matchesTag) return false;

      if (normalizedQuery.length < 2) return true;

      if (matchedSlugs) {
        return post.slug ? matchedSlugs.has(post.slug) : false;
      }

      const haystack = `${post.title ?? ""} ${post.excerpt ?? ""} ${(
        post.tags ?? []
      ).join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, selectedTag, normalizedQuery, matchedSlugs]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 border-b border-line pb-8">
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder={dict.blogPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={dict.blogPage.searchPlaceholder}
            className="w-full border border-line bg-paper-light py-3 pr-10 pl-4 text-sm text-ink placeholder:text-muted"
          />
          <svg
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9 17A8 8 0 109 1a8 8 0 000 16z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`micro-label border px-4 py-2.5 transition-colors ${
              selectedTag === null
                ? "border-ink bg-ink text-paper-light"
                : "border-line bg-paper-light text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {dict.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`micro-label border px-4 py-2.5 transition-colors ${
                selectedTag === tag
                  ? "border-ink bg-ink text-paper-light"
                  : "border-line bg-paper-light text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="border-l-2 border-line pl-4 text-xs leading-relaxed text-muted">
          {dict.blogPage.terminologyNote}
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((blog, i) => (
            <SingleBlog key={i} blog={blog} dict={dict} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="border border-line bg-paper-light py-16 text-center">
          <p className="micro-label text-muted">{dict.common.noPosts}</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
