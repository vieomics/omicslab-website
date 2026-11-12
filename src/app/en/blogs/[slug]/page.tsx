import { getDictionary } from "@/i18n";
import { getAuthorTitle } from "@/i18n/authors";
import { blogPostMetadata } from "@/i18n/metadata";
import { getAuthors } from "@/utils/authors";
import { selectRelatedPosts } from "@/utils/blogPosts";
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  getPostTranslation,
} from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { extractHeadings } from "@/utils/toc";
import BlogPostView from "@/views/BlogPostView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const dict = getDictionary("en");

export function generateStaticParams() {
  const slugs = getPostSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("en", slug, [
    "title",
    "metadata",
    "date",
    "author",
    "coverImage",
  ]);

  if (!post) {
    return {
      title: dict.errorPage.title,
      description: dict.errorPage.description,
      robots: { index: false, follow: false },
    };
  }

  const postMeta = post.metadata as { description?: string };
  return blogPostMetadata({
    locale: "en",
    slug,
    title: (post.title as string) || slug,
    description: postMeta?.description,
    image: (post.coverImage as string) || undefined,
    date: post.date as string,
    author: post.author as string,
  });
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const authors = getAuthors();

  const post = getPostBySlug("en", slug, [
    "title",
    "author",
    "content",
    "coverImage",
    "date",
    "description",
    "tags",
  ]);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts("en", [
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "author",
    "tags",
  ]);

  const authorKey = post.author as string;
  const authorData = authorKey ? (authors as any)[authorKey] : null;
  const relatedPosts = selectRelatedPosts(
    allPosts,
    slug,
    (post.tags as string[]) || [],
  ).map((recent: any) => ({
    ...recent,
    authorData: recent.author ? authors[recent.author] || null : null,
  }));

  const content = await markdownToHtml((post.content as string) || "");
  const headings = extractHeadings(content);

  return (
    <BlogPostView
      dict={dict}
      locale="en"
      slug={slug}
      title={(post.title as string) || ""}
      description={(post.description as string) || ""}
      content={content}
      coverImage={
        (post.coverImage as string) || "/images/blog/placeholder.jpg"
      }
      author={
        (authorData?.name as string) || (post.author as string) || "Omicslab"
      }
      authorImage={
        (authorData?.image_url as string) || "/images/team/omicslab-team.svg"
      }
      authorTitle={getAuthorTitle(authorKey, authorData?.title, dict)}
      authorScholar={authorData?.socials?.scholar || null}
      authorLinkedin={authorData?.socials?.linkedin || null}
      authorGithub={
        authorData?.socials?.github
          ? `https://github.com/${authorData.socials.github}`
          : null
      }
      date={(post.date as string) || new Date().toISOString()}
      headings={headings}
      relatedPosts={relatedPosts}
      translationSlug={getPostTranslation("en", slug)}
    />
  );
}
