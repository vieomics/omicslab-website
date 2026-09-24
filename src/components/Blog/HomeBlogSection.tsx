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
    <section className="dark:bg-dark bg-white pt-20 pb-10 lg:pt-[120px] lg:pb-20">
      <div className="container mx-auto">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle={dict.home.blog.subtitle}
            title={dict.home.blog.title}
            paragraph={dict.home.blog.paragraph}
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap">
          {posts.slice(0, 3).map((blog: any, i: number) => (
            <div key={i} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <SingleBlog blog={blog} dict={dict} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
