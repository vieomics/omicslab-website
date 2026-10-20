import Link from "next/link";
import { Dictionary } from "@/i18n";
import SectionTitle from "../Common/SectionTitle";

const Customers = ({ dict }: { dict: Dictionary }) => {
  const { customers } = dict.home;
  const { members } = customers;

  return (
    <section id="customers" className="section-pad rule-top">
      <div className="page-width">
        <SectionTitle
          subtitle={customers.subtitle}
          title={customers.title}
          paragraph={customers.paragraph}
          center
        />

        <div
          className={`border-line bg-line mt-14 grid gap-px border lg:mt-20 ${
            members.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {members.map((member) => (
            <article
              key={member.name}
              className="bg-paper-light grid gap-8 p-8 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-12"
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="bg-ink text-paper-light font-display flex h-16 w-16 shrink-0 items-center justify-center text-2xl leading-none font-extrabold tracking-[0.02em]"
                >
                  {member.initials}
                </span>
                <div>
                  <h3 className="display-md text-ink">{member.name}</h3>
                  <p className="micro-label mt-3 max-w-[560px] leading-relaxed text-muted">
                    {member.affiliation}
                  </p>
                  <p className="micro-label mt-1 text-muted">
                    {member.location}
                  </p>
                </div>
              </div>

              <div>
                <p className="max-w-[680px] text-base leading-relaxed text-muted">
                  {member.focus}
                </p>

                <Link
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial mt-8 inline-flex"
                >
                  {customers.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Customers;
