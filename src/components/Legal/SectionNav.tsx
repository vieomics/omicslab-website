"use client";

import { useEffect, useRef, useState } from "react";

/** Matches the `scroll-mt-28` (112px) applied to every legal section. */
const SCROLL_OFFSET = 112;

/** Smooth scrolling lands a hair off the offset line, so allow a small slack. */
const ACTIVE_TOLERANCE = 2;

interface SectionNavProps {
  label: string;
  sections: { id: string; title: string }[];
}

/**
 * Scroll-spy table of contents for the policy pages: the section under the
 * reader's eye is highlighted, and the highlighted link stays visible inside
 * the scrollable list. Styling mirrors the blog's TableOfContents.
 */
const SectionNav = ({ label, sections }: SectionNavProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let current = sections[0].id;

      if (scrolledToBottom) {
        current = sections[sections.length - 1].id;
      } else {
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (!element) continue;
          if (
            element.getBoundingClientRect().top - SCROLL_OFFSET <=
            ACTIVE_TOLERANCE
          ) {
            current = section.id;
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
  }, [sections]);

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

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    event.preventDefault();
    const top =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <div className="border border-line bg-paper-light p-6">
      <p className="micro-label mb-4 text-muted">{label}</p>
      <nav
        ref={navRef}
        aria-label={label}
        className="flex max-h-[calc(100vh-32rem)] flex-col gap-1 overflow-y-auto"
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              ref={(element) => {
                if (element) {
                  linkRefs.current.set(section.id, element);
                } else {
                  linkRefs.current.delete(section.id);
                }
              }}
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              className={`block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                isActive
                  ? "border-ink font-semibold text-ink"
                  : "border-line text-ink hover:border-ink"
              }`}
            >
              {section.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default SectionNav;
