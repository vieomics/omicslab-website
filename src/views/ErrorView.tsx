import Breadcrumb from "@/components/Common/Breadcrumb";
import NotFound from "@/components/NotFound";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

export default function ErrorView({
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
        pageName={dict.errorPage.title}
        pageDescription={dict.errorPage.description}
      />
      <NotFound dict={dict} locale={locale} />
    </>
  );
}
