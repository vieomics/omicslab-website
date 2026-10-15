import Link from "next/link";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import type { StudyTrack } from "@/utils/study";

interface StudyIndexViewProps {
  dict: Dictionary;
  locale: Locale;
  tracks: StudyTrack[];
}

/**
 * Study hub: the ordered list of courses on the platform. A new course appears
 * here automatically once its folder is added under `public/study/<locale>/`.
 */
export default function StudyIndexView({
  dict,
  locale,
  tracks,
}: StudyIndexViewProps) {
  const t = dict.study;

  return (
    <article>
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <span className="eyebrow text-white">
            <span className="eyebrow-line" />
            {t.kicker}
          </span>
          <h1 className="display-lg mt-6 max-w-[1000px] text-white">
            {t.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
            {t.description}
          </p>
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <p className="max-w-[820px] text-base leading-relaxed text-ink">
            {t.intro}
          </p>

          <p className="rule-accent mt-8 max-w-[820px] bg-paper-light py-4 pr-5 text-sm leading-relaxed text-muted">
            {t.notice}
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {tracks.map((track) => (
              <Link
                key={track.slug}
                href={localizePath(`/study/${track.slug}`, locale)}
                className="group flex flex-col border border-line bg-paper-light p-8 transition-colors hover:border-ink"
              >
                <span className="micro-label text-muted">
                  {track.tag || t.courseLabel}
                </span>
                <span className="display-sm mt-3 text-ink">{track.title}</span>
                <span className="mt-3 text-sm leading-relaxed text-muted">
                  {track.description}
                </span>
                <span className="micro-label mt-6 flex flex-wrap gap-x-6 gap-y-2 text-muted">
                  {track.level && <span>{track.level}</span>}
                  {track.duration && <span>{track.duration}</span>}
                  <span>
                    {track.lessonCount} {t.lessonsSuffix}
                  </span>
                </span>
                <span className="mt-6 text-[12px] font-extrabold tracking-[0.08em] text-ink uppercase underline decoration-accent decoration-2 underline-offset-8">
                  {t.openCourse}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-24">
            <div className="rule-top pt-10">
              <h2 className="display-md text-ink">{t.upcoming.title}</h2>
              <p className="mt-4 max-w-[820px] text-base leading-relaxed text-muted">
                {t.upcoming.description}
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.upcoming.items.map((item) => (
                <div
                  key={item.title}
                  className="border border-dashed border-line p-6"
                >
                  <span className="micro-label text-muted">{item.level}</span>
                  <span className="display-sm mt-3 block text-ink">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
