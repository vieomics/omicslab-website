import type { Metadata } from "next";
import Link from "next/link";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang | Page Not Found",
  description: "Trang bạn tìm kiếm không tồn tại. | The page does not exist.",
};

/**
 * Global 404 for unmatched routes across both locales. It renders its own
 * html/body because it bypasses the root layouts.
 */
export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
          <h1 className="text-dark text-5xl font-bold dark:text-white">404</h1>
          <div className="space-y-1">
            <p className="text-dark text-lg font-medium dark:text-white">
              Không tìm thấy trang bạn đang tìm.
            </p>
            <p className="text-base text-gray-500">
              We can&apos;t seem to find the page you&apos;re looking for.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary/90 rounded-md px-6 py-3 text-base font-medium text-white transition"
            >
              Trang chủ (Tiếng Việt)
            </Link>
            <Link
              href="/en"
              className="text-dark dark:border-dark-3 rounded-md border px-6 py-3 text-base font-medium transition dark:text-white"
            >
              Home (English)
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
