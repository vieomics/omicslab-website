import BlogList from "@/components/Blog/BlogList";
import { getAllPosts, getAllTags } from "@/utils/markdown";
import { getAuthors } from "@/utils/authors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Grids | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "Blog grids page description",
};

const Blog = () => {
  const posts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "tags",
    "author",
  ]);
  const allTags = getAllTags();
  const authors = getAuthors();

  const postsWithAuthorData = posts.map((post: any) => ({
    ...post,
    authorData: post.author ? authors[post.author] || null : null,
  }));

  return (
    <>
      <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <BlogList posts={postsWithAuthorData} allTags={allTags} />
        </div>
      </section>
    </>
  );
};

export default Blog;
