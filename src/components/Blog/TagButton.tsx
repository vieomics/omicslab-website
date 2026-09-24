import Link from "next/link";

const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <Link
      href={href}
      className="micro-label mr-2 mb-2 inline-block border border-line bg-paper-light px-4 py-2 text-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper-light"
    >
      {text}
    </Link>
  );
};

export default TagButton;
