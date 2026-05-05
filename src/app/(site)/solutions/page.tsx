import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions | Omicslab",
  description:
    "Bioinformatics solutions for multiomics analysis, data management, and pipeline execution.",
};

export default function SolutionsPage() {
  return (
    <div className="container mt-16 py-20">
      <h1 className="mb-8 text-4xl font-bold">Solutions</h1>
      <p className="mb-12 text-xl text-gray-600 dark:text-gray-400">
        Bioinformatics solutions for multiomics research
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Use the navigation menu to access: Data Platform, Service Platform, or
        Software Platform.
      </p>
    </div>
  );
}
