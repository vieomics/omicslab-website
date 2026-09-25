import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "../Features/SingleFeature";
import servicesData from "./servicesData";

const Services = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
  const { services } = dict.home;
  return (
    <section className="section-pad">
      <div className="page-width">
        <SectionTitle
          subtitle={services.subtitle}
          title={services.title}
          paragraph={services.paragraph}
        />

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {servicesData.map((service, i) => {
            const item = services.items[i];
            const isInternal = service.btnLink.startsWith("/");
            return (
              <SingleFeature
                key={i}
                feature={{
                  ...service,
                  title: item?.title ?? service.title,
                  paragraph: item?.paragraph ?? service.paragraph,
                  btn: item?.cta ?? service.btn,
                  btnLink: isInternal
                    ? localizeHref(service.btnLink, locale)
                    : service.btnLink,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
