import Contact from "@/components/Contact";
import PipelineBlogList from "@/components/Pipelines/PipelineBlogList";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { toBlogPosts } from "@/utils/blogPosts";
import Link from "next/link";

export default function PipelinesView({
  dict,
  locale,
  posts,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: any[];
}) {
  const t = dict.solutions.pipelines;
  const pipelinePosts = posts.filter((post) =>
    (post.tags as string[])?.includes("pipeline"),
  );

  return (
    <div className="container mt-16 py-20">
      <h1 className="mb-8 text-4xl font-bold">{t.title}</h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
        {t.subtitle}
      </p>

      <div className="border-primary mb-12 border-l-4 bg-gray-50 p-6 dark:bg-gray-800">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          {t.intro}
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.available.title}</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {t.available.paragraph}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {t.available.categories.map((category, index) => (
            <div
              key={category.title}
              className={`rounded-lg p-6 ${
                [
                  "bg-blue-50 dark:bg-blue-900/20",
                  "bg-pink-50 dark:bg-pink-900/20",
                  "bg-green-50 dark:bg-green-900/20",
                  "bg-purple-50 dark:bg-purple-900/20",
                  "bg-orange-50 dark:bg-orange-900/20",
                  "bg-teal-50 dark:bg-teal-900/20",
                ][index % 6]
              }`}
            >
              <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {category.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {pipelinePosts.length > 0 && (
          <PipelineBlogList
            posts={toBlogPosts(pipelinePosts)}
            dict={dict}
            locale={locale}
          />
        )}
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">{t.software.title}</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {t.software.paragraph}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {t.software.packages.map((pkg) => (
            <div key={pkg.name} className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">{pkg.name}</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {pkg.description}
              </p>
              <Link
                href={pkg.href}
                target="_blank"
                className="text-primary hover:underline"
              >
                {pkg.linkText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Contact dict={dict} fullHeight={false} />
    </div>
  );
}
