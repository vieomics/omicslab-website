import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { getDictionary } from "@/i18n";
import { getTranslatedSlugs } from "@/utils/markdown";
import { fontVariables } from "../fonts";
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";

const dict = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL("https://omicslab.io"),
  title: {
    default: "Omicslab - Omics Technology",
    template: "%s | Omicslab",
  },
  description: dict.metadata.siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translatedSlugs = getTranslatedSlugs();

  return (
    <html
      suppressHydrationWarning
      className={`${fontVariables} !scroll-smooth`}
      lang="en"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SiteShell
          dict={dict}
          locale="en"
          translatedSlugs={translatedSlugs}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
