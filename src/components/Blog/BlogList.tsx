"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Blog } from "@/types/blog";
import SingleBlog from "./SingleBlog";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

interface BlogListProps {
  posts: Blog[];
  allTags: string[];
}

const BlogList = ({ posts, allTags }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const performSearch = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 2) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&limit=10`,
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setShowDropdown(true);
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, performSearch]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    return result;
  }, [posts, selectedTag]);

  const handleResultClick = (slug: string) => {
    window.location.href = `/blogs/${slug}`;
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
            All
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
            placeholder="Search posts..."
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
          {isSearching && (
            <div className="absolute top-1/2 right-10 -translate-y-1/2">
              <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
            </div>
          )}
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
        <div className="-mx-4 flex flex-wrap justify-center">
          {filteredPosts.map((blog, i) => (
            <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          No posts found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default BlogList;
