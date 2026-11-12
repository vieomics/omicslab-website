import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import JsonLd from "@/components/Seo/JsonLd";
import { getDictionary } from "@/i18n";
import { siteName, siteUrl } from "@/i18n/site";
import { getTranslatedSlugs } from "@/utils/markdown";
import { organizationJsonLd, websiteJsonLd } from "@/utils/structuredData";
import { fontVariables } from "../fonts";
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";

const dict = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: dict.metadata.siteDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd("en")} />
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
