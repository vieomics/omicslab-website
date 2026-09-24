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
        "copy-btn absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition opacity-0 group-hover:opacity-100";
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
