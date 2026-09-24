import type { BlogPost } from "@/components/Blog/BlogListWithFilter";
import { getAuthorByKey } from "./authors";

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
