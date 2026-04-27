import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Giang Nguyen",
    designation: "Founder & Bioinformatics Engineer",
    image: "/images/team/giangnguyen_avatar.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="bg-gray-1 dark:bg-dark-2 overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Meet The Founder"
            title="About Giang Nguyen"
            paragraph="Bioinformatics professional with hands-on experience since 2019, delivering end-to-end solutions across computational biology, high-throughput sequencing (NGS) analysis, and scalable infrastructure."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>

        {/* Detailed Biography */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="dark:bg-dark-2 shadow-testimonial rounded-lg bg-white p-8 lg:p-12 dark:shadow-none">
            <h3 className="text-dark mb-6 text-2xl font-semibold dark:text-white">
              Professional Experience
            </h3>
            <p className="text-body-color dark:text-dark-6 mb-4 text-base leading-relaxed">
              Ex-Bioinformatics Engineer at DNAnexus with extensive hands-on
              experience on NGS analysis. Specialized in delivering end-to-end
              solutions across computational biology, high-throughput sequencing
              (NGS) analysis, and scalable infrastructure.
            </p>
            <p className="text-body-color dark:text-dark-6 mb-4 text-base leading-relaxed">
              Proven expertise in designing and implementing reproducible
              bioinformatics pipelines using Nextflow, Snakemake, and Galaxy,
              with CI/CD integration to support automation, scalability, and
              production-grade deployments.
            </p>
            <p className="text-body-color dark:text-dark-6 mb-4 text-base leading-relaxed">
              Experienced in deploying bioinformatics platforms on both AWS, GCP
              cloud environments and on-premise HPC clusters, including building
              and managing Slurm-based compute infrastructures. Skilled in
              configuring storage systems, job schedulers, and user environments
              to support large-scale genomics and multi-omics workflows.
            </p>
            <p className="text-body-color dark:text-dark-6 mb-4 text-base leading-relaxed">
              Strong foundation in genomics, epigenetics, transcriptomics, and
              machine learning, applying data-driven approaches to extract
              actionable insights from complex biological datasets.
            </p>
            <p className="text-body-color dark:text-dark-6 text-base leading-relaxed">
              Adept at cross-functional collaboration, mentoring teams, and
              leading the development of production-ready bioinformatics
              platforms in both academic and industry environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
