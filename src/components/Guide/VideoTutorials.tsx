"use client";

import Image from "next/image";
import { useState } from "react";
import type { GuideVideoSeries } from "@/i18n/dictionaries/guides/types";
import { Locale } from "@/i18n/config";

const PLAYLIST_ID = "PLQqDv1xr528w";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

export default function VideoTutorials({
  series,
  locale,
}: {
  series: GuideVideoSeries;
  locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const active = series.videos[activeIndex];
  const youtubeLang = locale === "vi" ? "vi" : "en";

  const selectVideo = (index: number) => {
    setActiveIndex(index);
    setPlaying(true);
  };

  return (
    <div>
      <div className="bg-ink border border-black text-white">
        <div className="relative aspect-video bg-black">
          {playing ? (
            <iframe
              key={active.id}
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&hl=${youtubeLang}`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`${series.playLabel}: ${active.title}`}
              className="group focus-visible:outline-accent absolute inset-0 block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
            >
              <Image
                src={active.thumbnail}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 820px, 100vw"
                className="object-cover opacity-80 transition-opacity group-hover:opacity-70"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="group-hover:border-accent group-hover:bg-accent flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/40 backdrop-blur transition-colors">
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 text-white"
                    aria-hidden="true"
                  >
                    <path d="M0 1.8C0 .9.9.3 1.8.8l17 9.2c.9.5.9 1.8 0 2.3l-17 9.2c-.9.5-1.8-.1-1.8-1V1.8Z" />
                  </svg>
                </span>
                <span className="micro-label text-white">
                  {series.playLabel}
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-5 sm:px-7">
          <div className="max-w-[680px]">
            <p className="micro-label text-accent">
              {series.selectedLabel} · {active.number}
            </p>
            <h2 className="display-sm mt-2 text-white">{active.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              {active.description}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="micro-label text-white/45">{active.duration}</p>
            <a
              href={`https://www.youtube.com/watch?v=${active.id}&list=${PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="micro-label decoration-accent text-white/70 underline decoration-2 underline-offset-4 transition-colors hover:text-white"
            >
              {series.watchOnYouTube} ↗
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="micro-label text-muted">{series.listLabel}</p>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="micro-label text-ink decoration-accent underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {series.openPlaylist} ↗
          </a>
        </div>

        <ol className="border-line mt-4 border-t">
          {series.videos.map((video, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={video.id} className="border-line border-b">
                <button
                  type="button"
                  onClick={() => selectVideo(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group focus-visible:outline-accent flex w-full items-center gap-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                    isActive ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
                  }`}
                >
                  <span
                    className={`micro-label w-8 shrink-0 ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {video.number}
                  </span>
                  <span className="border-line relative hidden aspect-video w-32 shrink-0 overflow-hidden border bg-black sm:block">
                    <Image
                      src={video.thumbnail}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="border-accent absolute inset-0 border-2"
                      />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block text-sm leading-snug font-semibold">
                      {video.title}
                    </span>
                    <span className="text-muted mt-1 hidden text-xs leading-relaxed sm:block">
                      {video.description}
                    </span>
                  </span>
                  <span className="micro-label text-muted shrink-0">
                    {video.duration}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-line text-ink group-hover:border-ink"
                    }`}
                  >
                    <svg
                      width="9"
                      height="11"
                      viewBox="0 0 10 12"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-0.5"
                    >
                      <path d="M0 .9C0 .2.8-.2 1.4.2l8 5.1c.6.4.6 1.2 0 1.6l-8 5.1c-.6.4-1.4 0-1.4-.7V.9Z" />
                    </svg>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
