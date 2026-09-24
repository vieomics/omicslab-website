import Image from "next/image";
import Link from "next/link";
import { Client } from "@/types/client";

const SingleClient = ({ client }: { client: Client }) => {
  const { title, link, logo } = client;
  return (
    <div className="bg-paper-light flex items-center justify-center p-8">
      <Link
        href={link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="opacity-70 transition-opacity hover:opacity-100"
      >
        <Image
          src={logo}
          alt={title}
          width={120}
          height={40}
          className="h-10 w-auto object-contain"
        />
      </Link>
    </div>
  );
};

export default SingleClient;
