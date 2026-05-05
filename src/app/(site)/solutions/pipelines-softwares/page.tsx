import { Metadata } from "next";
import Link from "next/link";
import OfferList from "@/components/Pricing/OfferList";

export const metadata: Metadata = {
  title: "Pipelines & Softwares | GiangLabs",
  description: "Multiomics pipelines and software packages for analysis.",
};

export default function PipelinesPage() {
  return (
    <div className="container mt-16 py-20">
      <h1 className="mb-8 text-4xl font-bold">Pipelines & Softwares</h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
        Execute multiomics analysis pipelines from raw data to read-to-use
        exploration and AI/ML analysis
      </p>

      <div className="border-primary mb-12 border-l-4 bg-gray-50 p-6 dark:bg-gray-800">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Pipelines & Software provides ready-to-use Nextflow pipelines for
          multi-omics analysis and open-source packages for custom analysis.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Available Pipelines</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 text-xl font-semibold">Genomics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Whole genome sequencing, variant calling, SNP/INDEL analysis.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <h3 className="mb-2 text-xl font-semibold">Transcriptomics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              RNA-seq, differential expression, alternative splicing.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
            <h3 className="mb-2 text-xl font-semibold">Proteomics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Protein identification, quantification, PTM analysis.
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
            <h3 className="mb-2 text-xl font-semibold">Metabolomics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Metabolite profiling, pathway analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Python & R Packages</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">Python</h3>
            <ul className="space-y-2 text-gray-600">
              <OfferList text="pandas, numpy - Data manipulation" />
              <OfferList text="biopython, pysam - Bioinformatics" />
              <OfferList text="scanpy - Single-cell" />
            </ul>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">R (Bioconductor)</h3>
            <ul className="space-y-2 text-gray-600">
              <OfferList text="DESeq2, edgeR - RNA-seq" />
              <OfferList text="ggplot2 - Visualization" />
              <OfferList text="limma - Linear models" />
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Run Pipeline</h2>
        <p className="mb-4 text-gray-600">
          Select your data, choose a pipeline, and execute on HPC.
        </p>
        <Link
          href="/solutions/service-platform/run"
          className="bg-primary hover:bg-primary/90 inline-block rounded-lg px-6 py-3 text-white"
        >
          Launch Pipeline Runner
        </Link>
      </section>
    </div>
  );
}
