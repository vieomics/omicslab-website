const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "760px",
  center,
}: {
  subtitle?: string;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
}) => {
  return (
    <div
      className={center ? "mx-auto text-center" : ""}
      style={{ maxWidth: width }}
    >
      {subtitle && (
        <span
          className={`eyebrow text-muted ${center ? "justify-center" : ""}`}
        >
          <span className="eyebrow-line" />
          {subtitle}
        </span>
      )}
      <h2 className="display-lg mt-5 mb-6 text-ink">{title}</h2>
      <p
        className={`max-w-[640px] text-base leading-relaxed text-muted ${
          center ? "mx-auto" : ""
        }`}
      >
        {paragraph}
      </p>
    </div>
  );
};

export default SectionTitle;
