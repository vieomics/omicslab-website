"use client";

import { TocItem } from "@/utils/toc";
import { useEffect, useRef, useState } from "react";

interface TableOfContentsProps {
  headings: TocItem[];
  title: string;
}

/** Matches the scroll offset used when a ToC link is clicked. */
const SCROLL_OFFSET = 100;

const TableOfContents = ({ headings, title }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Highlight the section that sits under the top of the viewport while
  // the reader scrolls, the same way clicking a link positions it.
  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let current = headings[0].id;

      if (scrolledToBottom) {
        current = headings[headings.length - 1].id;
      } else {
        for (const heading of headings) {
          const element = document.getElementById(heading.id);
          if (!element) continue;
          if (element.getBoundingClientRect().top - SCROLL_OFFSET <= 0) {
            current = heading.id;
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
  }, [headings]);

  // Keep the highlighted link visible inside a long, scrollable ToC list.
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

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top =
        element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-24 border border-line bg-paper-light p-6">
      <h3 className="micro-label mb-4 text-muted">{title}</h3>
      <nav
        ref={navRef}
        className="flex max-h-[calc(100vh-11rem)] flex-col gap-1 overflow-y-auto"
      >
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={`${heading.id}-${index}`}
              ref={(element) => {
                if (element) {
                  linkRefs.current.set(heading.id, element);
                } else {
                  linkRefs.current.delete(heading.id);
                }
              }}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
              className={`block border-l-2 py-1 text-sm leading-snug transition-colors ${
                heading.level === 2 ? "pl-3" : "pl-6"
              } ${
                isActive
                  ? "border-ink font-semibold text-ink"
                  : heading.level === 2
                    ? "border-line text-ink hover:border-ink"
                    : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
