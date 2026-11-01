"use client";

import { useEffect, useRef, useState } from "react";
import type { GuideChapter } from "@/i18n/dictionaries/guides/types";

/** Matches the `scroll-mt-28` (112px) applied to chapter and section anchors. */
const SCROLL_OFFSET = 112;
const ACTIVE_TOLERANCE = 2;

interface GuideTocProps {
  label: string;
  chapters: GuideChapter[];
}

function anchorId(chapter: GuideChapter, sectionId: string) {
  return `${chapter.slug}-${sectionId}`;
}

/**
 * Nested table of contents for the single-page guide: chapters with their
 * sections underneath, highlighting the part currently in view. The list
 * scrolls independently so the sidebar stays usable on a long page.
 */
export default function GuideToc({ label, chapters }: GuideTocProps) {
  const [activeId, setActiveId] = useState("");
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const ids = chapters.flatMap((chapter) => [
      chapter.slug,
      ...chapter.sections.map((section) => anchorId(chapter, section.id)),
    ]);

    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let current = ids[0] ?? "";

      if (scrolledToBottom) {
        current = ids[ids.length - 1] ?? current;
      } else {
        for (const id of ids) {
          const element = document.getElementById(id);
          if (!element) continue;
          if (
            element.getBoundingClientRect().top - SCROLL_OFFSET <=
            ACTIVE_TOLERANCE
          ) {
            current = id;
          } else {
            break;
          }
        }
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  // Keep the highlighted link inside the scrollable list.
  useEffect(() => {
    const nav = navRef.current;
    const link = activeId ? linkRefs.current.get(activeId) : undefined;
    if (!nav || !link || nav.scrollHeight <= nav.clientHeight) {
      return;
    }

    const linkBox = link.getBoundingClientRect();
    const navBox = nav.getBoundingClientRect();

    if (linkBox.top < navBox.top) {
      nav.scrollTop -= navBox.top - linkBox.top;
    } else if (linkBox.bottom > navBox.bottom) {
      nav.scrollTop += linkBox.bottom - navBox.bottom;
    }
  }, [activeId]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const element = document.getElementById(id);
    if (!element) return;

    event.preventDefault();
    const top =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <div className="border-line bg-paper-light border p-6">
      <p className="micro-label text-muted mb-4">{label}</p>
      <nav
        ref={navRef}
        aria-label={label}
        className="flex max-h-[calc(100vh-14rem)] flex-col gap-4 overflow-y-auto pr-1"
      >
        {chapters.map((chapter) => {
          const chapterActive =
            activeId === chapter.slug ||
            chapter.sections.some(
              (section) => anchorId(chapter, section.id) === activeId,
            );

          return (
            <div key={chapter.slug}>
              <a
                href={`#${chapter.slug}`}
                ref={(element) => {
                  if (element) {
                    linkRefs.current.set(chapter.slug, element);
                  } else {
                    linkRefs.current.delete(chapter.slug);
                  }
                }}
                onClick={(event) => handleClick(event, chapter.slug)}
                className={`block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                  chapterActive
                    ? "border-ink text-ink font-semibold"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                <span className="mr-1.5 text-[10px] font-bold tracking-[0.12em]">
                  {chapter.number}
                </span>
                {chapter.navTitle}
              </a>

              <div className="mt-1 flex flex-col gap-0.5">
                {chapter.sections.map((section) => {
                  const id = anchorId(chapter, section.id);
                  const active = activeId === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      ref={(element) => {
                        if (element) {
                          linkRefs.current.set(id, element);
                        } else {
                          linkRefs.current.delete(id);
                        }
                      }}
                      onClick={(event) => handleClick(event, id)}
                      className={`block border-l-2 py-0.5 pl-3 text-[13px] leading-snug transition-colors ${
                        active
                          ? "border-ink text-ink font-semibold"
                          : "border-line text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {section.title}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
