import { Dictionary } from "@/i18n";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "../Features/SingleFeature";
import servicesData from "./servicesData";

const Services = ({ dict }: { dict: Dictionary }) => {
  const { services } = dict.home;
  return (
    <section className="dark:bg-dark pt-20 pb-8 lg:pt-[120px] lg:pb-[70px]">
      <div className="container">
        <SectionTitle
          subtitle={services.subtitle}
          title={services.title}
          paragraph={services.paragraph}
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
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
