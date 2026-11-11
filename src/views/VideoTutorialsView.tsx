import Link from "next/link";
import VideoTutorials from "@/components/Guide/VideoTutorials";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";

export default function VideoTutorialsView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.guide.videos;

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
          <p className="micro-label text-accent mt-8">{t.meta}</p>
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-9">
              <div className="border-line bg-paper-light border p-4 sm:p-6 lg:p-8">
                <VideoTutorials series={t} locale={locale} />
              </div>

              <aside className="guide-note mt-8">
                <p className="guide-note-title">{t.noteTitle}</p>
                <p>{t.note}</p>
              </aside>
            </div>

            <aside className="min-w-0 lg:col-span-3">
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="border-line bg-paper-light border p-6">
                  <p className="micro-label text-muted">{t.aboutLabel}</p>
                  <p className="text-muted mt-3 text-sm leading-relaxed">
                    {t.intro}
                  </p>
                  <p className="border-line micro-label text-ink mt-5 border-t pt-4">
                    {t.languageNote}
                  </p>
                </div>

                <div className="border-line bg-paper-light border p-6">
                  <p className="micro-label text-muted">
                    {t.writtenGuideLabel}
                  </p>
                  <p className="text-muted mt-3 text-sm leading-relaxed">
                    {t.writtenGuideText}
                  </p>
                  <Link
                    href={localizeHref("/guide", locale)}
                    className="micro-label text-ink decoration-accent mt-4 inline-block underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    {t.writtenGuideCta} →
                  </Link>
                </div>

                <div className="border-line bg-paper-light border p-6">
                  <p className="micro-label text-muted">{t.docsLabel}</p>
                  <p className="text-muted mt-3 text-sm leading-relaxed">
                    {t.docsText}
                  </p>
                  <a
                    href="https://docs.omicslab.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="micro-label text-ink decoration-accent mt-4 inline-block underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    {t.docsCta} ↗
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
