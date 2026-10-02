"use client";

import { useEffect } from "react";

/**
 * Fallback for contexts where the async clipboard API is unavailable
 * (e.g. non-secure origins). Mirrors the behavior Expressive Code ships.
 */
function fallbackCopy(text: string): boolean {
  const scratch = document.createElement("pre");
  Object.assign(scratch.style, {
    opacity: "0",
    pointerEvents: "none",
    position: "absolute",
    overflow: "hidden",
    left: "0",
    top: "0",
    width: "20px",
    height: "20px",
    WebkitUserSelect: "auto",
    userSelect: "all",
  });
  scratch.setAttribute("aria-hidden", "true");
  scratch.textContent = text;
  document.body.appendChild(scratch);

  const range = document.createRange();
  range.selectNode(scratch);
  const selection = window.getSelection();
  if (!selection) {
    document.body.removeChild(scratch);
    return false;
  }
  selection.removeAllRanges();
  selection.addRange(range);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    document.body.removeChild(scratch);
  }
  return copied;
}

/**
 * Expressive Code renders the copy button (and its markup) at build time but
 * its script is not injected: article bodies are swapped in through
 * `dangerouslySetInnerHTML`, where inline scripts never execute. This
 * component binds those buttons after mount, so copying works on hard loads
 * and client-side navigation alike.
 */
export default function CodeBlockWrapper({
  copyLabel,
  copiedLabel,
}: {
  copyLabel: string;
  copiedLabel: string;
}) {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      ".expressive-code .copy button",
    );

    buttons.forEach((button) => {
      if (button.dataset.copyBound === "true") return;
      button.dataset.copyBound = "true";

      // Expressive Code ships English strings; use the dictionary instead.
      button.title = copyLabel;
      button.dataset.copied = copiedLabel;

      button.addEventListener("click", async () => {
        // The rendered attribute stores newlines as \u007f.
        const code = (button.dataset.code || "").replace(/\u007f/g, "\n");

        let copied = false;
        try {
          await navigator.clipboard.writeText(code);
          copied = true;
        } catch {
          copied = fallbackCopy(code);
        }

        const live = button.parentNode?.querySelector("[aria-live]");
        if (!copied || !live || live.querySelector(".feedback")) return;

        const feedback = document.createElement("div");
        feedback.classList.add("feedback");
        feedback.append(copiedLabel);
        live.append(feedback);
        // Force a reflow so the transition runs on the next frame.
        void feedback.offsetWidth;
        requestAnimationFrame(() => feedback.classList.add("show"));

        const hide = () => feedback.classList.remove("show");
        const remove = () => {
          if (parseFloat(getComputedStyle(feedback).opacity) > 0) return;
          feedback.remove();
        };

        window.setTimeout(hide, 1500);
        window.setTimeout(remove, 2500);
        button.addEventListener("blur", hide);
        feedback.addEventListener("transitioncancel", remove);
        feedback.addEventListener("transitionend", remove);
      });
    });
  }, [copyLabel, copiedLabel]);

  return null;
}
