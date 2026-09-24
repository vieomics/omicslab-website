import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { getDictionary } from "@/i18n";
import { getTranslatedSlugs } from "@/utils/markdown";
import { fontVariables } from "../fonts";
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";

const dict = getDictionary("vi");

export const metadata: Metadata = {
  metadataBase: new URL("https://omicslab.io"),
  title: {
    default: "Omicslab - Công nghệ Omics",
    template: "%s | Omicslab",
  },
  description: dict.metadata.siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function VietnameseRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translatedSlugs = getTranslatedSlugs();

  return (
    <html
      suppressHydrationWarning
      className={`${fontVariables} !scroll-smooth`}
      lang="vi"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H4DR9KS6SL"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H4DR9KS6SL');
            `,
          }}
        />
      </head>
      <body>
        <SiteShell
          dict={dict}
          locale="vi"
          translatedSlugs={translatedSlugs}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
