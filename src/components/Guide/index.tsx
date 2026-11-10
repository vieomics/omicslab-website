import Image from "next/image";
import GuideToc from "./GuideToc";
import { Inline } from "@/components/Legal";
import { guideImageSizes } from "@/i18n/dictionaries/guides/imageSizes";
import type {
  GuideBlock,
  GuideContent,
  GuideListItem,
} from "@/i18n/dictionaries/guides/types";
import { Locale } from "@/i18n/config";

interface GuideProps {
  guide: GuideContent;
  locale: Locale;
}

function GuideList({ item, locale }: { item: GuideListItem; locale: Locale }) {
  if (typeof item === "string") {
    return (
      <li>
        <Inline text={item} locale={locale} />
      </li>
    );
  }

  return (
    <li>
      <Inline text={item.text} locale={locale} />
      <ul>
        {item.children.map((child, index) => (
          <GuideList key={index} item={child} locale={locale} />
        ))}
      </ul>
    </li>
  );
}

function GuideBlockView({
  block,
  locale,
  figureLabel,
  figureNumber,
  openImage,
}: {
  block: GuideBlock;
  locale: Locale;
  figureLabel: string;
  figureNumber?: number;
  openImage: string;
}) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} locale={locale} />
        </p>
      );
    case "label":
      return (
        <p className="legal-label">
          <Inline text={block.text} locale={locale} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, index) => (
            <GuideList key={index} item={item} locale={locale} />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline text={item} locale={locale} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                {block.head.map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <Inline text={cell} locale={locale} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className="guide-figure">
          <a
            href={block.src}
            target="_blank"
            rel="noopener noreferrer"
            title={openImage}
            className="block"
          >
            <Image
              src={block.src}
              alt={block.alt}
              width={guideImageSizes[block.src]?.width ?? 2400}
              height={guideImageSizes[block.src]?.height ?? 1400}
              sizes="(min-width: 1024px) 780px, 100vw"
              className="border-line h-auto w-full border bg-white"
            />
          </a>
          <figcaption>
            {figureNumber ? (
              <span className="guide-figure-label">
                {figureLabel} {figureNumber}
              </span>
            ) : null}
            <Inline text={block.caption} locale={locale} />
            <span className="guide-figure-open">{openImage}</span>
          </figcaption>
        </figure>
      );
    case "note":
      return (
        <aside className="guide-note">
          {block.title ? (
            <p className="guide-note-title">
              <Inline text={block.title} locale={locale} />
            </p>
          ) : null}
          <p>
            <Inline text={block.text} locale={locale} />
          </p>
        </aside>
      );
  }
}

/**
 * The complete user guide as one long page, laid out like the policy pages:
 * dark editorial header, article card on the left, sticky chapter/section
 * navigation in the right sidebar.
 */
export default function Guide({ guide, locale }: GuideProps) {
  const { hub, shared, chapters } = guide;

  // Number the figures once across the whole page so captions stay unique.
  const figureNumbers = new Map<GuideBlock, number>();
  let figureIndex = 0;
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      for (const block of section.blocks) {
        if (block.type === "figure") {
          figureIndex += 1;
          figureNumbers.set(block, figureIndex);
        }
      }
    }
  }

  return (
    <article id="top">
      <section className="band-dark pt-36 pb-16 lg:pt-[190px] lg:pb-24">
        <div className="page-width">
          <span className="eyebrow text-white">
            <span className="eyebrow-line" />
            {hub.kicker}
          </span>
          <h1 className="display-lg mt-6 max-w-[1000px] text-white">
            {hub.title}
          </h1>
          <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white sm:text-lg">
            {hub.description}
          </p>
          <p className="micro-label text-accent mt-8">
            {shared.lastUpdatedLabel}: {shared.lastUpdated}
          </p>
        </div>
      </section>

      <section className="rule-top section-pad">
        <div className="page-width">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-9">
              <div className="border-line bg-paper-light border p-6 sm:p-10">
                <div className="legal-body guide-body">
                  <p>
                    <Inline text={hub.intro} locale={locale} />
                  </p>
                  <aside className="guide-note">
                    <p className="guide-note-title">{hub.noteTitle}</p>
                    <p>
                      <Inline text={hub.note} locale={locale} /> (
                      {shared.lastUpdated})
                    </p>
                  </aside>
                </div>

                {hub.video ? (
                  <section className="bg-ink mt-10 border border-black text-white">
                    <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-5 sm:px-7">
                      <div className="max-w-[680px]">
                        <p className="micro-label text-accent">
                          {hub.video.kicker}
                        </p>
                        <h2 className="display-sm mt-2 text-white">
                          {hub.video.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {hub.video.description}
                        </p>
                      </div>
                      <p className="micro-label text-white/45">
                        {hub.video.duration}
                      </p>
                    </div>
                    <video
                      className="aspect-video w-full bg-black"
                      controls
                      playsInline
                      preload="metadata"
                      poster={hub.video.poster}
                      aria-label={hub.video.title}
                    >
                      <source src={hub.video.src} type="video/mp4" />
                      <track
                        kind="captions"
                        src={hub.video.captions}
                        srcLang="vi"
                        label={hub.video.captionsLabel}
                        default
                      />
                    </video>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 px-5 py-3 sm:px-7">
                      <p className="micro-label text-white/45">
                        {hub.video.note}
                      </p>
                      <a
                        href={`#${chapters[0]?.slug ?? "bat-dau"}`}
                        className="micro-label text-white/70 transition-colors hover:text-white"
                      >
                        {hub.video.jump} ↓
                      </a>
                    </div>
                  </section>
                ) : null}

                <details className="border-line bg-paper mt-8 border px-4 py-3 lg:hidden">
                  <summary className="micro-label text-ink cursor-pointer">
                    {shared.tocLabel}
                  </summary>
                  <nav className="mt-4 flex flex-col gap-4">
                    {chapters.map((chapter) => (
                      <div key={chapter.slug}>
                        <a
                          href={`#${chapter.slug}`}
                          className="text-ink text-sm font-semibold"
                        >
                          <span className="mr-1.5 text-[10px] font-bold tracking-[0.12em]">
                            {chapter.number}
                          </span>
                          {chapter.navTitle}
                        </a>
                        <div className="mt-1 flex flex-col gap-1 pl-3">
                          {chapter.sections.map((section) => (
                            <a
                              key={section.id}
                              href={`#${chapter.slug}-${section.id}`}
                              className="text-muted text-[13px] leading-snug"
                            >
                              {section.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>
                </details>

                {chapters.map((chapter) => (
                  <section
                    key={chapter.slug}
                    id={chapter.slug}
                    className="rule-top mt-12 scroll-mt-28 pt-10"
                  >
                    <p className="micro-label text-accent">{chapter.kicker}</p>
                    <h2 className="display-md text-ink mt-3">
                      {chapter.title}
                    </h2>
                    <p className="text-muted mt-3 max-w-[720px] text-sm leading-relaxed">
                      {chapter.description}
                    </p>

                    <div className="mt-8 space-y-10">
                      {chapter.sections.map((section) => (
                        <section
                          key={section.id}
                          id={`${chapter.slug}-${section.id}`}
                          className="scroll-mt-28"
                        >
                          <h3 className="display-sm text-ink">
                            {section.title}
                          </h3>
                          <div className="legal-body guide-body mt-4">
                            {section.blocks.map((block, index) => (
                              <GuideBlockView
                                key={index}
                                block={block}
                                locale={locale}
                                figureLabel={shared.figureLabel}
                                figureNumber={figureNumbers.get(block)}
                                openImage={shared.openImage}
                              />
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </section>
                ))}

                <p className="rule-top mt-12 pt-6">
                  <a href="#top" className="micro-label text-ink">
                    ↑ {shared.backToTop}
                  </a>
                </p>
              </div>
            </div>

            <aside className="hidden min-w-0 lg:col-span-3 lg:block">
              <div className="lg:sticky lg:top-24">
                <GuideToc label={shared.tocLabel} chapters={chapters} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
