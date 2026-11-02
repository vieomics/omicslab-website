"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fallback for contexts where the async clipboard API is unavailable
 * (e.g. non-secure origins). Mirrors the behavior used by CodeBlockWrapper.
 */
function fallbackCopy(text: string): boolean {
  const scratch = document.createElement("textarea");
  scratch.value = text;
  Object.assign(scratch.style, {
    opacity: "0",
    pointerEvents: "none",
    position: "absolute",
    left: "0",
    top: "0",
  });
  scratch.setAttribute("readonly", "");
  scratch.setAttribute("aria-hidden", "true");
  document.body.appendChild(scratch);
  scratch.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    document.body.removeChild(scratch);
  }
  return copied;
}

/**
 * Displays a promo code with a copy button. Used on the data platform page,
 * where the code is entered in the checkout dialog of the platform.
 */
export default function PromoCode({
  code,
  copyLabel,
  copiedLabel,
}: {
  code: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopy() {
    let copiedOk = false;
    try {
      await navigator.clipboard.writeText(code);
      copiedOk = true;
    } catch {
      copiedOk = fallbackCopy(code);
    }

    if (!copiedOk) return;

    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <p className="border-ink/30 bg-paper text-ink border border-dashed px-3 py-4 text-center font-mono text-lg leading-none font-bold tracking-[0.08em] whitespace-nowrap sm:text-xl">
          {code}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="border-ink text-ink hover:bg-ink hover:text-paper-light inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center border px-5 text-[11px] font-extrabold tracking-[0.12em] uppercase transition-colors"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
