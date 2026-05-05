import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Services from "@/components/Services";
import Team from "@/components/Team";
import { getAllPosts } from "@/utils/markdown";
import { getAuthors } from "@/utils/authors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omicslab - Omics Technology",
  description:
    "Innovative bioinformatics solutions for researchers. Production-ready variant calling pipelines, multiomics analysis tools, and data platforms.",
};

export default function Home() {
  const posts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "author",
  ]);
  const authors = getAuthors();

  const postsWithAuthorData = posts.map((post: any) => ({
    ...post,
    authorData: post.author ? authors[post.author] || null : null,
  }));

  return (
    <main>
      <ScrollUp />
      <Hero />
      <Services />
      <About />
      <CallToAction />
      <Faq />
      <HomeBlogSection posts={postsWithAuthorData} />
      <Contact />
    </main>
  );
}
