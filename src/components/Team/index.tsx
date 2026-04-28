import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Giang Nguyen",
    designation: "Founder",
    image: "/images/team/giangnguyen.png",
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
            paragraph="Ex-bioinformatics engineer at DNANexus. Bioinformatics professional with hands-on experience, delivering end-to-end solutions across computational biology, high-throughput sequencing (NGS) analysis, and scalable infrastructure for the biobank scale to accelerate the precision medicine."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
