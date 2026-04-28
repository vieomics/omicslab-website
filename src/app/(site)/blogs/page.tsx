import BlogList from "@/components/Blog/BlogList";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllPosts, getAllTags } from "@/utils/markdown";
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
  ]);
  const allTags = getAllTags();

  return (
    <>
      <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <BlogList posts={posts} allTags={allTags} />
        </div>
      </section>
    </>
  );
};

export default Blog;
