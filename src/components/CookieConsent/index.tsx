"use client";

import { useEffect, useState } from "react";
import { Dictionary } from "@/i18n";

const STORAGE_KEY = "omicslab-analytics-consent";
const GA_ID = "G-H4DR9KS6SL";

let analyticsLoaded = false;

/**
 * Loads Google Analytics only after the visitor accepted analytics.
 * Consent Mode starts everything as denied, so no cookie is written before
 * the visitor presses "Accept".
 */
function enableAnalytics() {
  if (analyticsLoaded || typeof window === "undefined") return;
  analyticsLoaded = true;

  const w = window as typeof window & { dataLayer?: unknown[]; gtag?: unknown };
  w.dataLayer = w.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    w.dataLayer?.push(args);
  };
  w.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/**
 * Consent notice for the only optional cookie on this site: Google Analytics.
 * The choice is stored in localStorage; declining never loads the tag.
 */
const CookieConsent = ({ dict }: { dict: Dictionary }) => {
  const { cookieConsent } = dict;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      enableAnalytics();
    } else if (stored !== "declined") {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    if (value === "accepted") {
      enableAnalytics();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={cookieConsent.title}
      className="fixed inset-x-0 bottom-0 z-[999] border-t border-white/20 bg-black/95 backdrop-blur-[6px]"
    >
      <div className="page-width flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-[760px]">
          <p className="micro-label text-accent">{cookieConsent.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {cookieConsent.message}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="btn-editorial btn-editorial-inverse min-h-[46px] px-6"
          >
            {cookieConsent.accept}
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className="min-h-[46px] border border-white/40 px-6 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            {cookieConsent.decline}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
