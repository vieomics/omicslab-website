/** Renders `**bold**` markers in an FAQ answer as <strong>. */
const renderAnswer = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const SingleFaq = (props: { question: string; answer: string }) => {
  const { question, answer } = props;

  return (
    <div className="flex gap-6 border-t border-line py-9">
      <span className="mt-2.5 h-2.5 w-2.5 shrink-0 bg-ink" aria-hidden="true" />
      <div>
        <h3 className="display-md mb-4 text-ink">{question}</h3>
        <p className="text-base leading-relaxed text-muted">
          {renderAnswer(answer)}
        </p>
      </div>
    </div>
  );
};

export default SingleFaq;
