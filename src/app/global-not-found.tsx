import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/i18n/site";
import { fontVariables } from "./fonts";
import "../styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "404 - Không tìm thấy trang | Page Not Found",
  description: "Trang bạn tìm kiếm không tồn tại. | The page does not exist.",
  robots: { index: false, follow: false },
};

/**
 * Global 404 for unmatched routes across both locales. It renders its own
 * html/body because it bypasses the root layouts.
 */
export default function GlobalNotFound() {
  return (
    <html lang="vi" className={fontVariables}>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Error 404
          </span>
          <h1 className="display-xl">404</h1>
          <div className="max-w-md space-y-2">
            <p className="text-lg font-medium text-ink">
              Không tìm thấy trang bạn đang tìm.
            </p>
            <p className="text-base text-muted">
              We can&apos;t seem to find the page you&apos;re looking for.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-editorial">
              Trang chủ (Tiếng Việt)
            </Link>
            <Link href="/en" className="btn-editorial btn-editorial-ghost">
              Home (English)
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
