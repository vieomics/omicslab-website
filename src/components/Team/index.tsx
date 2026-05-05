import { TeamType } from "@/types/team";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Giang Nguyen",
    designation: "Founder",
    image: "/images/team/giangnguyen.png",
    facebookLink: "https://www.facebook.com/nttg8100",
    twitterLink: "/#",
    instagramLink: "/#",
    linkedinLink: "https://www.linkedin.com/in/giang-nguyen-761b28190/",
    bio: "Bioinformatics professional with hands-on experience since 2019, specializing in end-to-end solutions across computational biology, high-throughput sequencing (NGS) analysis, and scalable infrastructure. His work spans the full stack of bioinformatics systems, from designing reproducible pipelines with Nextflow, Snakemake, and Galaxy to deploying production-grade platforms with CI/CD integration for automation and scalability.\n\n As the pace of innovation in life sciences accelerates, he founded OmicsLab with a clear vision: to build a strong, foundational ecosystem that supports the entire omics journey—from core infrastructure and data generation to advanced downstream analysis and AI-driven applications. This includes developing robust HPC and cloud-based environments, managing Slurm-based compute systems, and architecting storage and workflow solutions capable of handling large-scale genomics and multi-omics data.\n\nWith a solid background in genomics, epigenetics, transcriptomics, and machine learning, he focuses on transforming complex biological data into actionable insights. He is committed to building systems that are not only scalable and reproducible, but also accessible and impactful for both research and industry. Through OmicsLab, his goal is to bridge the gap between infrastructure and innovation, enabling the next generation of bioinformatics and precision medicine solutions.",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="bg-gray-1 dark:bg-dark-2 overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
    >
      <div className="container">
        <div className="w-full">
          <div className="mb-10 text-left">
            <h2 className="text-dark mb-4 text-3xl leading-tight font-bold sm:text-[40px] sm:leading-[1.2] dark:text-white">
              Meet Our Team
            </h2>
          </div>
          {teamData.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center gap-8 md:flex-row"
            >
              <div className="w-full md:w-1/3">
                <div className="mx-auto w-[150px]">
                  <SingleTeam team={member} />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-4">
                  <h2 className="text-dark text-2xl font-bold dark:text-white">
                    {member.name}
                  </h2>
                  <p className="text-primary font-medium">
                    {member.designation}
                  </p>
                </div>
                <p className="text-body-color dark:text-dark-6 text-base leading-relaxed whitespace-pre-wrap">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
