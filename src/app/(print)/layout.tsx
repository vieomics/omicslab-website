import type { Metadata } from "next";
import { fontVariables } from "../fonts";
import "../../styles/index.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Chrome-free root layout for printable policy documents. These routes exist
 * only so each policy can be exported to PDF (see scripts/generate-policy-pdfs.js)
 * and are excluded from search and the sitemap.
 */
export default function PrintRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${fontVariables} print-root`}>
      <body className="bg-white">{children}</body>
    </html>
  );
}
