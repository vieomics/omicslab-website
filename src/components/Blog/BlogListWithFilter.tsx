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
    <article className="group flex h-full flex-col border border-line bg-paper-light">
      <Link
        href={localizePath(`/blogs/${post.slug}`, locale)}
        aria-label="blog cover"
        className="block overflow-hidden border-b border-line bg-paper-light"
      >
        <div className="aspect-video w-full">
          <Image
            src={post.coverImage || "/images/blog/placeholder.jpg"}
            alt={post.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            width={408}
            height={230}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {post.authorData?.image_url ? (
            <div className="h-8 w-8 shrink-0 overflow-hidden border border-line">
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
            <div className="h-8 w-8 shrink-0 border border-line bg-paper" />
          )}
          <span className="micro-label text-ink">
            {post.authorData?.name || post.author || dict.common.anonymous}
          </span>
          {authorTitle && (
            <span className="micro-label text-muted">• {authorTitle}</span>
          )}
        </div>
        <span className="micro-label mb-4 inline-flex w-fit border border-line px-3 py-1.5 text-muted">
          {formatDate(post.date, locale)}
        </span>
        <h3 className="display-md mb-4">
          <Link
            href={localizePath(`/blogs/${post.slug}`, locale)}
            className="text-ink transition-colors hover:text-muted"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {post.description}
        </p>
      </div>
    </article>
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
      className="group flex items-center gap-5 border border-line bg-paper-light p-4 transition-colors hover:border-ink"
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-16 w-24 shrink-0 border border-line object-cover"
        />
      )}
      <div className="flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="micro-label text-muted">
            {formatDate(post.date, locale)}
          </span>
          {post.authorData?.name && (
            <span className="micro-label text-muted">
              • {post.authorData.name}
            </span>
          )}
        </div>
        <h3 className="display-md text-[22px] leading-tight transition-colors group-hover:text-muted">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-1 text-sm text-muted">
          {post.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="micro-label border border-line px-2 py-1 text-muted"
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
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder={searchPlaceholder ?? dict.blogPage.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-line bg-paper-light px-4 py-3 text-sm text-ink placeholder:text-muted sm:w-72"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`micro-label border px-3.5 py-2 transition-colors ${
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
              onClick={() => setSelectedTag(tag)}
              className={`micro-label border px-3.5 py-2 transition-colors ${
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
          <p className="text-muted">{dict.common.noBlogs}</p>
        )}
      </div>
    </div>
  );
}
