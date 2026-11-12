import type { BlogPost } from "@/components/Blog/BlogListWithFilter";
import { getAuthorByKey } from "./authors";

/**
 * Pick the posts most closely related to the current article: shared tags
 * first, then newest first. Falls back to recent posts when no tags overlap,
 * so the block always has useful internal links.
 */
export function selectRelatedPosts(
  posts: any[],
  currentSlug: string,
  currentTags: string[],
  limit = 6,
): any[] {
  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const tags = (post.tags as string[]) || [];
      const sharedTags = tags.filter((tag) => currentTags.includes(tag)).length;
      return { post, sharedTags };
    })
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) {
        return b.sharedTags - a.sharedTags;
      }
      return (
        new Date(b.post.date as string).getTime() -
        new Date(a.post.date as string).getTime()
      );
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Convert markdown posts (from utils/markdown) into the shape expected by
 * BlogListWithFilter, resolving author metadata from authors.yml.
 */
export function toBlogPosts(posts: any[]): BlogPost[] {
  return posts.map((post) => {
    const authorKey = post.author as string | undefined;
    const author = authorKey ? getAuthorByKey(authorKey) : null;
    return {
      title: post.title as string,
      slug: post.slug as string,
      date: post.date as string,
      description: post.description as string,
      coverImage: post.coverImage as string | null,
      tags: (post.tags as string[]) || [],
      author: post.author as string,
      authorData: author
        ? {
            name: author.name,
            title: author.title,
            image_url: author.image_url,
          }
        : null,
    };
  });
}
