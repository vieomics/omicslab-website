const OfferList = ({
  text,
  inverse = false,
}: {
  text: string;
  inverse?: boolean;
}) => {
  return (
    <p
      className={`flex items-baseline gap-3 border-b py-2.5 text-sm leading-relaxed last:border-b-0 ${
        inverse ? "border-white/15 text-[#c9c9c9]" : "border-line text-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-[6px] w-[6px] shrink-0 ${
          inverse ? "bg-accent" : "bg-ink"
        }`}
      />
      {text}
    </p>
  );
};

export default OfferList;
