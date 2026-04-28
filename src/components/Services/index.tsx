import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "../Features/SingleFeature";
import servicesData from "./servicesData";

const Services = () => {
  return (
    <section className="dark:bg-dark pt-20 pb-8 lg:pt-[120px] lg:pb-[70px]">
      <div className="container">
        <SectionTitle
          subtitle="Our Services"
          title="Comprehensive Bioinformatics Solutions"
          paragraph="From production-grade variant calling pipelines to cutting-edge data platforms, we provide complete tools and workflows for your bioinformatics research needs."
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {servicesData.map((service, i) => (
            <SingleFeature key={i} feature={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
