import Image from "next/image";
import Link from "next/link";

const PopularArticle = (props: {
  image: string;
  title: string;
  name: string;
}) => {
  const { image, title, name } = props;
  return (
    <div className="w-full">
      <div className="mb-5 flex w-full items-center gap-5 border-b border-line pb-5">
        <div className="overflow-hidden border border-line">
          <Image
            src={image}
            alt="image"
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
        <div className="w-full">
          <h4>
            <Link
              href="/#"
              className="font-display text-lg leading-tight font-bold tracking-[-0.01em] text-ink uppercase transition-colors hover:text-muted"
            >
              {title}
            </Link>
          </h4>
          <p className="micro-label mt-2 text-muted">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularArticle;
