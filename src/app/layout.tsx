import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Omicslab - Omics Technology",
  description:
    "Innovative bioinformatics solutions for researchers. Production-ready variant calling pipelines, multiomics analysis tools, and data platforms.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="!scroll-smooth" lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <div className="isolate">
            <Header />

            {children}

            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
