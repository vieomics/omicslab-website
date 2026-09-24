interface AdmonitionProps {
  type?:
    | "note"
    | "tip"
    | "info"
    | "warning"
    | "danger"
    | "caution"
    | "important";
  title?: string;
  children: React.ReactNode;
}

export default function Admonition({
  type = "note",
  title,
  children,
}: AdmonitionProps) {
  const typeLabels: Record<string, string> = {
    note: "Note",
    tip: "Tip",
    info: "Info",
    warning: "Warning",
    danger: "Danger",
    caution: "Caution",
    important: "Important",
  };

  return (
    <div
      className={`admonition admonition-${type} my-4 border border-line border-l-[3px] border-l-ink bg-paper-light p-5`}
      data-admonition-type={type}
      data-admonition-title={title || typeLabels[type] || typeLabels.note}
    >
      <div className="admonition-content">{children}</div>
    </div>
  );
}
