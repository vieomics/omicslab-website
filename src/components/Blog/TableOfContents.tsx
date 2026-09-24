"use client";

import { TocItem } from "@/utils/toc";
import { useState } from "react";

interface TableOfContentsProps {
  headings: TocItem[];
  title: string;
}

const TableOfContents = ({ headings, title }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-24 border border-line bg-paper-light p-6">
      <h3 className="micro-label mb-4 text-muted">{title}</h3>
      <nav className="flex flex-col gap-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={`${heading.id}-${index}`}
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
