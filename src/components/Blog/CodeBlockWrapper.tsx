"use client";

import { useEffect } from "react";

export default function CodeBlockWrapper({
  copyLabel,
  copiedLabel,
}: {
  copyLabel: string;
  copiedLabel: string;
}) {
  useEffect(() => {
    const preElements = document.querySelectorAll("pre[data-code]");

    preElements.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const code = pre.getAttribute("data-code") || "";

      const button = document.createElement("button");
      button.className =
        "copy-btn absolute top-3 right-3 border border-line bg-paper-light px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper-light opacity-0 group-hover:opacity-100 focus:opacity-100";
      button.textContent = copyLabel;

      const wrapper = document.createElement("div");
      wrapper.className = "group relative";

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);

      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = copiedLabel;
          setTimeout(() => {
            button.textContent = copyLabel;
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });
    });
  }, [copyLabel, copiedLabel]);

  return null;
}
