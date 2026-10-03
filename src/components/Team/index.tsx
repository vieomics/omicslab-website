import { TeamType } from "@/types/team";
import { Dictionary } from "@/i18n";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Giang Nguyen",
    designation:
      "Founder @ Vieomics | Ex-DNAnexus | Scaling Multi-Omics Infrastructure & AI",
    image: "/images/team/giangnguyen.png",
    facebookLink: "https://www.facebook.com/nttg8100",
    twitterLink: "/#",
    instagramLink: "/#",
    linkedinLink: "https://www.linkedin.com/in/giang-nguyen-761b28190/",
    scholarLink: "https://scholar.google.com/citations?hl=en&user=23JI1U8AAAAJ",
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
                <p className="micro-label text-muted mt-3 max-w-[760px] leading-relaxed">
                  {team.members[index]?.designation ?? member.designation}
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
