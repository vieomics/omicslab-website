import { Dictionary } from "@/i18n";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "../Features/SingleFeature";
import servicesData from "./servicesData";

const Services = ({ dict }: { dict: Dictionary }) => {
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
          {servicesData.map((service, i) => (
            <SingleFeature
              key={i}
              feature={{
                ...service,
                title: services.items[i]?.title ?? service.title,
                paragraph: services.items[i]?.paragraph ?? service.paragraph,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
