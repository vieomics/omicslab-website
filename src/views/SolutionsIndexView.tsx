import { Dictionary } from "@/i18n";

export default function SolutionsIndexView({ dict }: { dict: Dictionary }) {
  const { index } = dict.solutions;
  return (
    <div className="container mt-16 py-20">
      <h1 className="mb-8 text-4xl font-bold">{index.title}</h1>
      <p className="mb-12 text-xl text-gray-600 dark:text-gray-400">
        {index.subtitle}
      </p>
      <p className="text-gray-600 dark:text-gray-400">{index.paragraph}</p>
    </div>
  );
}
