"use client";

import { useState, useMemo } from "react";
import { Blog } from "@/types/blog";
import SingleBlog from "./SingleBlog";

interface BlogListProps {
  posts: Blog[];
  allTags: string[];
}

const BlogList = ({ posts, allTags }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title?.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [posts, selectedTag, searchQuery]);

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
