"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop({ label }: { label: string }) {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed right-8 bottom-8 z-[999]">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label={label}
          className="flex h-11 w-11 cursor-pointer items-center justify-center border border-ink bg-ink text-paper-light transition-colors duration-300 hover:bg-transparent hover:text-ink"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-current"></span>
        </div>
      )}
    </div>
  );
}
