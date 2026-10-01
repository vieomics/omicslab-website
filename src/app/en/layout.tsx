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
    default: "Omicslab",
    template: "%s | Omicslab",
  },
  description: dict.metadata.siteDescription,
  icons: {
    icon: [
      { url: "/images/logo/omicslab-ico.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
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
        <link
          rel="icon"
          href="/images/logo/omicslab-ico.svg"
          type="image/svg+xml"
        />
        <meta
          name="dmca-site-verification"
          content="Uy9ZaFRpeTRBanRMcUtudE92eUlwZz090"
        />
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
