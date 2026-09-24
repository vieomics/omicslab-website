import { TeamType } from "@/types/team";
import { Dictionary } from "@/i18n";
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

const Team = ({ dict }: { dict: Dictionary }) => {
  const { team } = dict.aboutPage;
  return (
    <section id="team" className="section-pad rule-top">
      <div className="page-width">
        <h2 className="display-lg text-ink">{team.title}</h2>

        <div className="mt-16 space-y-20">
          {teamData.map((member, index) => (
            <article
              key={member.id}
              className="border-line grid gap-10 border-t pt-10 md:grid-cols-[minmax(220px,280px)_1fr] md:gap-16"
            >
              <SingleTeam team={member} />

              <div>
                <h3 className="display-md text-ink">{member.name}</h3>
                <p className="micro-label text-muted mt-3">
                  {team.members[index]?.designation ?? member.designation}
                </p>
                <p className="text-muted mt-8 max-w-[760px] text-base leading-relaxed whitespace-pre-wrap">
                  {team.members[index]?.bio ?? member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
