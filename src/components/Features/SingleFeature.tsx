import { Feature } from "@/types/feature";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph, btn, btnLink } = feature;
  const isExternal = /^https?:\/\//.test(btnLink);
  return (
    <div className="flex h-full flex-col bg-paper-light p-8">
      <div className="mb-8 flex h-14 w-14 items-center justify-center border border-ink bg-ink text-paper-light">
        {icon}
      </div>
      <h3 className="display-md mb-4 text-ink">{title}</h3>
      <p className="mb-8 flex-1 text-sm leading-relaxed text-muted">
        {paragraph}
      </p>
      <Link
        href={btnLink}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="micro-label inline-flex items-center gap-2 text-ink transition-colors hover:text-muted"
      >
        {btn} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default SingleFeature;
