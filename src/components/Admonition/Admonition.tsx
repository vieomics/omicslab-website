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
    <div className={`admonition-${type} my-4 mb-8 rounded-lg border-l-4 p-4`}>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
