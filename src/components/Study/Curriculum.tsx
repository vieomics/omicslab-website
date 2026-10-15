import Link from "next/link";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import type { StudyTrack } from "@/utils/study";

interface CurriculumProps {
  track: StudyTrack;
  locale: Locale;
  dict: Dictionary;
  /** Slug of the lesson being read, highlighted in the list. */
  activeLesson?: string;
}

/**
 * Ordered curriculum for a course: one list per module, lessons numbered across
 * the whole track so the sequence is unambiguous.
 */
export default function Curriculum({
  track,
  locale,
  dict,
  activeLesson,
}: CurriculumProps) {
  const t = dict.study;
  let counter = 0;

  return (
    <div className="space-y-12">
      {track.modules.map((studyModule) => (
        <section key={studyModule.title}>
          {studyModule.title && (
            <h3 className="micro-label text-muted">{studyModule.title}</h3>
          )}
          <ol className="mt-4 border-t border-line">
            {studyModule.lessons.map((lesson) => {
              counter += 1;
              const active = lesson.slug === activeLesson;
              return (
                <li key={lesson.slug} className="border-b border-line">
                  <Link
                    href={localizePath(
                      `/study/${track.slug}/${lesson.slug}`,
                      locale,
                    )}
                    aria-current={active ? "page" : undefined}
                    className="group flex gap-5 py-5"
                  >
                    <span
                      className={`font-display text-[22px] leading-none ${
                        active ? "text-ink" : "text-muted"
                      }`}
                    >
                      {String(counter).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-base font-semibold ${
                          active
                            ? "text-ink underline decoration-accent decoration-2 underline-offset-4"
                            : "text-ink group-hover:text-muted"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      {lesson.description && (
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {lesson.description}
                        </span>
                      )}
                      {lesson.duration && (
                        <span className="micro-label mt-2 block text-muted">
                          {lesson.duration}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
      <p className="micro-label text-muted">
        {track.lessonCount} {t.lessonsSuffix}
      </p>
    </div>
  );
}
