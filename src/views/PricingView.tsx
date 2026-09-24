import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

export default function PricingView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <>
      <Breadcrumb
        dict={dict}
        locale={locale}
        pageName={dict.pricingPage.title}
        pageDescription={dict.pricingPage.description}
      />
      <Pricing dict={dict} locale={locale} />
    </>
  );
}
