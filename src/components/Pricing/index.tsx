import SectionTitle from "../Common/SectionTitle";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="dark:bg-dark relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Pricing"
            title="Contact Us for Pricing"
            paragraph="We offer customized pricing based on your requirements. Reach out to discuss a plan that fits your needs."
            center
          />
        </div>

        <div className="text-center">
          <p className="text-body-color dark:text-dark-6 text-base">
            Our solutions are tailored to your specific bioinformatics needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
