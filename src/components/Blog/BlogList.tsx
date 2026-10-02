"use client";

import { useState, useMemo, useEffect } from "react";
import { Blog } from "@/types/blog";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
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
  const [searchResults, setSearchResults] = useState<SearchIndexItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
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
      .catch(() => {});
  }, [locale]);

  useEffect(() => {
    if (!fuse || !searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const results = fuse.search(searchQuery, { limit: 10 });
    setSearchResults(results.map((r) => r.item));
    setShowDropdown(true);
  }, [searchQuery, fuse]);

  const filteredPosts = useMemo(() => {
    if (selectedTag) {
      return posts.filter((post) => post.tags?.includes(selectedTag));
    }
    return posts;
  }, [posts, selectedTag]);

  const handleResultClick = (slug: string) => {
    window.location.href = localizePath(`/blogs/${slug}`, locale);
  };

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 border-b border-line pb-8">
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder={dict.blogPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
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
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 mt-px w-full divide-y divide-line border border-line bg-paper-light">
              {searchResults.map((result) => (
                <button
                  key={result.slug}
                  onClick={() => handleResultClick(result.slug)}
                  className="block w-full px-4 py-3 text-left transition-colors hover:bg-paper"
                >
                  <div className="font-display text-base leading-tight font-bold tracking-[-0.01em] text-ink uppercase">
                    {result.title}
                  </div>
                  <div className="mt-1 line-clamp-1 text-xs text-muted">
                    {result.excerpt || result.content.slice(0, 100)}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {result.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="micro-label border border-line px-2 py-1 text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
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
