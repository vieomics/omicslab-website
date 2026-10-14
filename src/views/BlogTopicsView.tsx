import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/date";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";

export interface TopicPost {
  title: string;
  slug: string;
  date: string;
  tags?: string[];
  metadata?: { series?: string; seriesOrder?: number | string };
}

interface BlogTopicsViewProps {
  dict: Dictionary;
  locale: Locale;
  posts: TopicPost[];
}

/**
 * Group posts by tag and render one small table per topic. Posts with several
 * tags appear under each of them, so a topic is complete even when a post
 * belongs to more than one.
 */
function groupByTopic(posts: TopicPost[]): { tag: string; posts: TopicPost[] }[] {
  const groups = new Map<string, TopicPost[]>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      if (!tag) continue;
      if (!groups.has(tag)) groups.set(tag, []);
      groups.get(tag)!.push(post);
    }
  }
  return Array.from(groups.entries())
    .map(([tag, list]) => ({
      tag,
      // series parts first (by order), then newest first
      posts: list.slice().sort((a, b) => {
        const sa = a.metadata?.series;
        const sb = b.metadata?.series;
        if (sa && sb && sa === sb) {
          return Number(a.metadata?.seriesOrder ?? 0) - Number(b.metadata?.seriesOrder ?? 0);
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    }))
    .sort((a, b) => b.posts.length - a.posts.length || a.tag.localeCompare(b.tag));
}

export default function BlogTopicsView({ dict, locale, posts }: BlogTopicsViewProps) {
  const t = dict.blogPage.topics;
  const groups = groupByTopic(posts);

  return (
    <section className="section-pad">
      <div className="page-width">
        <header className="mb-14 max-w-[820px]">
          <span className="eyebrow text-muted">
            <span className="eyebrow-line" />
            {t.subtitle}
          </span>
          <h1 className="display-title mt-6 mb-6 text-ink">{t.title}</h1>
          <p className="text-base leading-relaxed text-muted">{t.intro}</p>
          <Link
            href={localizePath("/blogs", locale)}
            className="btn-editorial btn-editorial-ghost mt-8 min-h-0 px-4 py-2"
          >
            {t.browseAll}
          </Link>
        </header>

        {groups.map((group) => (
          <section key={group.tag} className="rule-top mb-16 pt-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="display-md text-ink">{group.tag}</h2>
              <span className="micro-label text-muted">
                {group.posts.length} {t.postsSuffix}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="micro-label py-3 pr-4 text-muted">{t.columnPost}</th>
                    <th className="micro-label hidden py-3 pr-4 text-muted sm:table-cell">
                      {t.columnSeries}
                    </th>
                    <th className="micro-label hidden py-3 text-muted md:table-cell">
                      {t.columnDate}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.posts.map((post) => (
                    <tr key={group.tag + post.slug} className="border-b border-line align-top">
                      <td className="py-4 pr-4">
                        <Link
                          href={localizePath(`/blogs/${post.slug}`, locale)}
                          className="text-ink transition-colors hover:text-muted"
                        >
                          {post.metadata?.series && post.metadata?.seriesOrder
                            ? `${post.metadata.seriesOrder}. `
                            : ""}
                          {post.title}
                        </Link>
                      </td>
                      <td className="hidden py-4 pr-4 text-sm text-muted sm:table-cell">
                        {post.metadata?.series || "—"}
                      </td>
                      <td className="hidden whitespace-nowrap py-4 text-sm text-muted md:table-cell">
                        {formatDate(post.date, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
