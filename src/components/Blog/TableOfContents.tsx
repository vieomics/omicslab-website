"use client";

import { TocItem } from "@/utils/toc";
import { useState } from "react";

interface TableOfContentsProps {
  headings: TocItem[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
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
    <div className="sticky top-24">
      <h3 className="text-dark mb-4 text-lg font-semibold dark:text-white">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <a
            key={`${heading.id}-${index}`}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(heading.id);
            }}
            className={`hover:text-primary block text-sm transition-colors ${
              heading.level === 2
                ? "text-dark font-medium dark:text-white"
                : "pl-4 text-gray-600 dark:text-gray-400"
            } ${activeId === heading.id ? "text-primary font-medium" : ""}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
