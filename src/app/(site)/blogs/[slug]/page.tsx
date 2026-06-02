import PopularArticle from "@/components/Blog/PopularArticle";
import SingleBlog from "@/components/Blog/SingleBlog";
import TableOfContents from "@/components/Blog/TableOfContents";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CodeBlockWrapper from "@/components/Blog/CodeBlockWrapper";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/utils/markdown";
import { extractHeadings } from "@/utils/toc";
import markdownToHtml from "@/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const post = getPostBySlug(slug, ["title", "author", "content", "metadata"]);

  const siteName = "Omicslab";
  const authorName = "Omicslab";

  if (post) {
    const postMeta = post.metadata as { description?: string };
    const metadata = {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      description: postMeta?.description || post.title || "",
      author: authorName,
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };

    return metadata;
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
      author: authorName,
      robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

import { getAuthors } from "@/utils/authors";

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const authors = getAuthors();
  const allPosts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
    "author",
  ]);

  const posts = allPosts.map((post: any) => ({
    ...post,
    authorData: post.author ? authors[post.author] || null : null,
  }));

  const post = getPostBySlug(slug, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  const authorKey = post?.author as string;
  const authorData = authorKey ? (authors as any)[authorKey] : null;

  const content = await markdownToHtml((post?.content as string) || "");
  const headings = extractHeadings(content);
  const coverImage =
    (post?.coverImage as string) || "/images/blog/placeholder.jpg";
  const authorImage =
    (authorData?.image_url as string) || "/images/blog/author-01.jpg";
  const author =
    (authorData?.name as string) || (post?.author as string) || "Anonymous";
  const date = (post?.date as string) || new Date().toISOString();
  const title = (post?.title as string) || "";

  return (
    <>
      <CodeBlockWrapper />

      <section className="dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mb-[60px] w-full"
                data-wow-delay=".1s"
              >
                <Image
                  src={coverImage}
                  alt="image"
                  width={1920}
                  height={600}
                  className="h-auto w-full object-cover"
                />
                <h1 className="text-dark mt-6 mb-4 text-3xl font-bold sm:text-4xl dark:text-white">
                  {title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={authorImage}
                      alt={author}
                      className="h-full w-full object-cover"
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-dark text-base font-medium dark:text-white">
                      {author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(date), "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-9/12">
                  <div className="blog-details xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-3/12">
                  <div className="sticky top-24">
                    <TableOfContents headings={headings} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div
              className="wow fadeInUp mt-14 w-full px-4"
              data-wow-delay=".2s"
            >
              <h2 className="text-dark relative pb-5 text-2xl font-semibold sm:text-[28px] dark:text-white">
                Recent Articles
              </h2>
              <span className="bg-primary mb-10 inline-block h-[2px] w-20"></span>
            </div>

            {posts.slice(0, 6).map((blog, key) => (
              <div key={key} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
