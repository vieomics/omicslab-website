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
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded px-4 py-2 text-sm font-medium transition ${
              selectedTag === null
                ? "bg-primary text-white"
                : "text-dark hover:bg-primary dark:bg-dark-2 bg-gray-100 hover:text-white dark:text-white"
            }`}
          >
            {dict.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`rounded px-4 py-2 text-sm font-medium transition ${
                selectedTag === tag
                  ? "bg-primary text-white"
                  : "text-dark hover:bg-primary dark:bg-dark-2 bg-gray-100 hover:text-white dark:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder={dict.blogPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
            className="text-dark focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded border border-gray-200 bg-white px-4 py-2 focus:outline-none dark:text-white"
          />
          <svg
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
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
            <div className="dark:bg-dark-2 absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
              {searchResults.map((result) => (
                <button
                  key={result.slug}
                  onClick={() => handleResultClick(result.slug)}
                  className="dark:hover:bg-dark-3 w-full px-4 py-3 text-left hover:bg-gray-100"
                >
                  <div className="text-dark font-medium dark:text-white">
                    {result.title}
                  </div>
                  <div className="line-clamp-1 text-sm text-gray-500">
                    {result.excerpt || result.content.slice(0, 100)}
                  </div>
                  <div className="mt-1 flex gap-1">
                    {result.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="dark:bg-dark-3 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400"
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
      </div>

      {filteredPosts.length > 0 ? (
        <div className="-mx-4 flex flex-wrap justify-start">
          {filteredPosts.map((blog, i) => (
            <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <SingleBlog blog={blog} dict={dict} locale={locale} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          {dict.common.noPosts}
        </div>
      )}
    </div>
  );
};

export default BlogList;
