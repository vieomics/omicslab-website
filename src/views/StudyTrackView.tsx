import Link from "next/link";
import Curriculum from "@/components/Study/Curriculum";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import type { StudyTrack } from "@/utils/study";

interface StudyTrackViewProps {
  dict: Dictionary;
  locale: Locale;
  track: StudyTrack;
}

/**
 * Course overview: what the course covers, who it is for, the tools used, and
 * the ordered curriculum. The first lesson is the primary call to action.
 */
export default function StudyTrackView({
  dict,
  locale,
  track,
}: StudyTrackViewProps) {
  const t = dict.study;
  const firstLesson = track.lessons[0];

  return (
    <article>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <span className="eyebrow text-white">
            <span className="eyebrow-line" />
            {t.courseLabel}
          </span>
          <h1 className="display-lg mt-6 max-w-[1000px] text-white">
            {track.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
            {track.description}
          </p>
          <div className="micro-label mt-8 flex flex-wrap gap-x-8 gap-y-2 text-accent">
            {track.level && <span>{track.level}</span>}
            {track.duration && <span>{track.duration}</span>}
            <span>
              {track.lessonCount} {t.lessonsSuffix}
            </span>
            {track.modules.length > 0 && (
              <span>
                {track.modules.length} {t.modulesSuffix}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              {track.outcomes.length > 0 && (
                <div className="mb-14">
                  <h2 className="display-md text-ink">{t.outcomesLabel}</h2>
                  <ul className="mt-6 space-y-4">
                    {track.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rule-accent text-base leading-relaxed text-ink"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h2 className="display-md text-ink">{t.curriculumLabel}</h2>
                <div className="mt-8">
                  <Curriculum track={track} locale={locale} dict={dict} />
                </div>
              </div>
            </div>

            <aside className="min-w-0 lg:col-span-4">
              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                <div className="border border-line bg-paper-light p-6">
                  {firstLesson && (
                    <Link
                      href={localizePath(
                        `/study/${track.slug}/${firstLesson.slug}`,
                        locale,
                      )}
                      className="btn-editorial w-full"
                    >
                      {t.startCourse}
                    </Link>
                  )}
                  <Link
                    href={localizePath("/study", locale)}
                    className="mt-4 block text-sm text-muted underline decoration-accent underline-offset-4 hover:text-ink"
                  >
                    {t.backToStudy}
                  </Link>
                </div>

                {track.tools.length > 0 && (
                  <div className="border border-line bg-paper-light p-6">
                    <p className="micro-label mb-4 text-muted">
                      {t.toolsLabel}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {track.tools.map((tool) => (
                        <li
                          key={tool}
                          className="border border-line px-3 py-1 text-sm text-ink"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="border-l-2 border-line pl-4 text-xs leading-relaxed text-muted">
                  {t.notice}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
