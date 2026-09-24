"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/date";
import { getAuthorTitle } from "@/i18n/authors";
import { localizePath } from "@/i18n/paths";

interface AuthorData {
  name: string;
  title: string;
  image_url: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  coverImage: string | null;
  tags: string[];
  author: string;
  authorData: AuthorData | null;
}

interface BlogListWithFilterProps {
  posts: BlogPost[];
  dict: Dictionary;
  locale: Locale;
  layout?: "grid" | "list";
  searchPlaceholder?: string;
  className?: string;
}

function PipelineBlogItem({
  post,
  dict,
  locale,
}: {
  post: BlogPost;
  dict: Dictionary;
  locale: Locale;
}) {
  const authorTitle = getAuthorTitle(post.author, post.authorData?.title, dict);
  return (
    <div className="group mb-10">
      <div className="mb-8 overflow-hidden rounded">
        <Link
          href={localizePath(`/blogs/${post.slug}`, locale)}
          aria-label="blog cover"
          className="block"
        >
          <Image
            src={post.coverImage || "/images/blog/placeholder.jpg"}
            alt={post.title}
            className="h-[225px] w-full object-cover transition group-hover:scale-125 group-hover:rotate-6"
            width={408}
            height={225}
          />
        </Link>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-3">
          {post.authorData?.image_url ? (
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={post.authorData.image_url}
                alt={post.authorData.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          )}
          <span className="text-dark text-sm font-medium dark:text-white">
            {post.authorData?.name || post.author || dict.common.anonymous}
          </span>
          {authorTitle && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              • {authorTitle}
            </span>
          )}
        </div>
        <span className="bg-primary mb-5 inline-block rounded px-4 py-1 text-center text-xs leading-loose font-semibold text-white">
          {formatDate(post.date, locale)}
        </span>
        <h3>
          <Link
            href={localizePath(`/blogs/${post.slug}`, locale)}
            className="text-dark hover:text-primary dark:hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl dark:text-white"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-body-color dark:text-dark-6 line-clamp-2 text-base">
          {post.description}
        </p>
      </div>
    </div>
  );
}

function InfrastructureBlogItem({
  post,
  dict,
  locale,
}: {
  post: BlogPost;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <Link
      href={localizePath(`/blogs/${post.slug}`, locale)}
      className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-16 w-24 shrink-0 rounded-lg object-cover"
        />
      )}
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {formatDate(post.date, locale)}
          </span>
          {post.authorData?.name && (
            <span className="text-xs text-gray-500">
              • {post.authorData.name}
            </span>
          )}
        </div>
        <h3 className="font-semibold group-hover:text-blue-600">
          {post.title}
        </h3>
        <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
          {post.description}
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function BlogListWithFilter({
  posts,
  dict,
  locale,
  layout = "grid",
  searchPlaceholder,
  className = "",
}: BlogListWithFilterProps) {
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags).filter(Boolean)),
  ).sort();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  if (posts.length === 0) {
    return null;
  }

  const renderItem = (post: BlogPost) => {
    if (layout === "list") {
      return (
        <InfrastructureBlogItem
          key={post.slug}
          post={post}
          dict={dict}
          locale={locale}
        />
      );
    }
    return (
      <PipelineBlogItem
        key={post.slug}
        post={post}
        dict={dict}
        locale={locale}
      />
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder={searchPlaceholder ?? dict.blogPage.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3 py-1 text-sm ${
              selectedTag === null
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {dict.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 text-sm ${
                selectedTag === tag
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div
        className={
          layout === "grid"
            ? `grid gap-6 md:grid-cols-3 ${className}`
            : className
        }
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => renderItem(post))
        ) : (
          <p className="text-gray-500">{dict.common.noBlogs}</p>
        )}
      </div>
    </div>
  );
}
