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
            paragraph="The Data Platform is currently under trial. Contact us to get 2 free genomics assembly sample runs on the platform."
            center
          />
        </div>

        <div className="text-center">
          <p className="text-body-color dark:text-dark-6 text-base">
            <strong>Platform subscription:</strong> 1,000,000 VND/month for 10
            users — fixed until end of July 2026.
          </p>
          <p className="text-body-color dark:text-dark-6 mt-2 text-base">
            <strong>Storage (S3):</strong> 1,000 VND/GB/month.
          </p>
          <p className="text-body-color dark:text-dark-6 mt-2 text-base">
            <strong>HPC compute:</strong> 20,000 VND/hour (max 16 CPUs / 32 GB
            RAM, ratio 1:2). nf-core pipelines free, OmicsLab pipelines
            adjusted, metagenomics assembly 100,000 VND/sample.
          </p>
          <p className="text-body-color dark:text-dark-6 mt-2 text-base">
            <strong>Fully local deployment</strong> of platform &amp; HPC also
            available — contact us for details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
