import { Dictionary } from "@/i18n";
import SectionTitle from "../Common/SectionTitle";
import SingleFaq from "./SingleFaq";

const Faq = ({ dict }: { dict: Dictionary }) => {
  const { faq } = dict.home;
  return (
    <section className="section-pad">
      <div className="page-width">
        <SectionTitle
          subtitle={faq.subtitle}
          title={faq.title}
          paragraph={faq.paragraph}
          width="720px"
          center
        />

        <div className="mx-auto mt-14 max-w-[880px] border-b border-line lg:mt-20">
          {faq.items.map((item, index) => (
            <SingleFaq
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
