import Image from "next/image";
import Link from "next/link";
import { Client } from "@/types/client";

const SingleClient = ({ client }: { client: Client }) => {
  const { title, link, logo, logoWhite } = client;
  return (
    <div className="ud-single-logo mr-10 mb-5 max-w-[140px]">
      <Link href={link} target="_blank" rel="nofollow noopner">
        <Image
          src={logo}
          alt={title}
          className="dark:hidden"
          width={5}
          height={40}
        />
        <Image
          src={logoWhite}
          alt={title}
          className="hidden dark:block"
          width={5}
          height={40}
        />
      </Link>
    </div>
  );
};

export default SingleClient;
