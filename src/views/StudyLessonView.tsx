import Link from "next/link";
import TableOfContents from "@/components/Blog/TableOfContents";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { TocItem } from "@/utils/toc";
import type { StudyLessonMeta, StudyTrack } from "@/utils/study";

interface StudyLessonViewProps {
  dict: Dictionary;
  locale: Locale;
  track: StudyTrack;
  lesson: StudyLessonMeta;
  index: number;
  content: string;
  headings: TocItem[];
  related: { slug: string; title: string; excerpt?: string }[];
}

/**
 * A single lesson: the markdown body in the article column, the lesson table of
 * contents and the course contents in the sidebar, then previous/next and the
 * blog articles that go deeper into the same subject.
 */
export default function StudyLessonView({
  dict,
  locale,
  track,
  lesson,
  index,
  content,
  headings,
  related,
}: StudyLessonViewProps) {
  const t = dict.study;
  const previous = index > 0 ? track.lessons[index - 1] : null;
  const next =
    index < track.lessons.length - 1 ? track.lessons[index + 1] : null;

  return (
    <article>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <span className="eyebrow text-white">
            <span className="eyebrow-line" />
            {t.lessonLabel} {index + 1} · {lesson.module}
          </span>
          <h1 className="display-title mt-6 max-w-[1000px] text-white">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
              {lesson.description}
            </p>
          )}
          <div className="micro-label mt-8 flex flex-wrap gap-x-8 gap-y-2 text-accent">
            <Link
              href={localizePath(`/study/${track.slug}`, locale)}
              className="text-accent underline decoration-accent underline-offset-4 hover:text-white"
            >
              {track.title}
            </Link>
            <span>
              {t.by} {t.author}
            </span>
            {lesson.duration && <span>{lesson.duration}</span>}
          </div>
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-9">
              <div className="border border-line bg-paper-light p-6 sm:p-10">
                <div
                  className="blog-details"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>

              {(previous || next) && (
                <nav className="rule-top mt-12 grid gap-6 pt-8 sm:grid-cols-2">
                  {previous ? (
                    <Link
                      href={localizePath(
                        `/study/${track.slug}/${previous.slug}`,
                        locale,
                      )}
                      className="group border border-line bg-paper-light p-5 transition-colors hover:border-ink"
                    >
                      <span className="micro-label text-muted">
                        {t.previous}
                      </span>
                      <span className="mt-2 block text-base font-semibold text-ink group-hover:text-muted">
                        {previous.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next && (
                    <Link
                      href={localizePath(
                        `/study/${track.slug}/${next.slug}`,
                        locale,
                      )}
                      className="group border border-line bg-paper-light p-5 text-right transition-colors hover:border-ink"
                    >
                      <span className="micro-label text-muted">{t.next}</span>
                      <span className="mt-2 block text-base font-semibold text-ink group-hover:text-muted">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}

              {related.length > 0 && (
                <div className="mt-16">
                  <div className="rule-top pt-8">
                    <h2 className="display-md text-ink">{t.relatedLabel}</h2>
                    <p className="mt-4 max-w-[720px] text-sm leading-relaxed text-muted">
                      {t.relatedIntro}
                    </p>
                  </div>
                  <ul className="mt-6 border-t border-line">
                    {related.map((post) => (
                      <li key={post.slug} className="border-b border-line">
                        <Link
                          href={localizePath(`/blogs/${post.slug}`, locale)}
                          className="block py-4 text-base text-ink transition-colors hover:text-muted"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="min-w-0 lg:col-span-3">
              <div className="flex flex-col gap-6">
                <TableOfContents headings={headings} title={t.inThisLesson} />

                <div className="border border-line bg-paper-light p-6">
                  <p className="micro-label mb-4 text-muted">
                    {t.courseContents}
                  </p>
                  <nav className="flex flex-col gap-1">
                    {track.lessons.map((item, itemIndex) => {
                      const active = item.slug === lesson.slug;
                      return (
                        <Link
                          key={item.slug}
                          href={localizePath(
                            `/study/${track.slug}/${item.slug}`,
                            locale,
                          )}
                          aria-current={active ? "page" : undefined}
                          className={`block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                            active
                              ? "border-ink font-semibold text-ink"
                              : "border-line text-muted hover:border-ink hover:text-ink"
                          }`}
                        >
                          {itemIndex + 1}. {item.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
