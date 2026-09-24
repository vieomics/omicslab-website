import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

const HomeBlogSection = ({
  posts,
  dict,
  locale,
}: {
  posts: any;
  dict: Dictionary;
  locale: Locale;
}) => {
  return (
    <section className="section-pad">
      <div className="page-width">
        <div className="mb-14 lg:mb-20">
          <SectionTitle
            subtitle={dict.home.blog.subtitle}
            title={dict.home.blog.title}
            paragraph={dict.home.blog.paragraph}
            width="640px"
            center
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((blog: any, i: number) => (
            <SingleBlog key={i} blog={blog} dict={dict} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
