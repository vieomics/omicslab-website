import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Customers from "@/components/Customers";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PlatformStrip from "@/components/PlatformStrip";
import JsonLd from "@/components/Seo/JsonLd";
import Services from "@/components/Services";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { faqJsonLd } from "@/utils/structuredData";

interface HomeViewProps {
  dict: Dictionary;
  locale: Locale;
  posts: any[];
}

export default function HomeView({ dict, locale, posts }: HomeViewProps) {
  return (
    <main>
      <JsonLd data={faqJsonLd(dict.home.faq.items)} />
      <ScrollUp />
      <Hero dict={dict} />
      <Services dict={dict} locale={locale} />
      <Customers dict={dict} />
      <HowItWorks dict={dict} />
      <PlatformStrip dict={dict} />
      <About dict={dict} />
      <CallToAction dict={dict} />
      <Faq dict={dict} />
      <HomeBlogSection posts={posts} dict={dict} locale={locale} />
      <Contact dict={dict} />
    </main>
  );
}
