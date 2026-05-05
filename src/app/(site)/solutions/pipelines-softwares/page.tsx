import { Metadata } from "next";
import Link from "next/link";
import OfferList from "@/components/Pricing/OfferList";
import PipelineBlogList from "@/components/Pipelines/PipelineBlogList";
import Contact from "@/components/Contact";
import { getAllPosts } from "@/utils/markdown";
import { getAuthorByKey } from "@/utils/authors";

export const metadata: Metadata = {
  title: "Pipelines & Softwares | GiangLabs",
  description: "Multiomics pipelines and software packages for analysis.",
};

export default function PipelinesPage() {
  const allPosts = getAllPosts([
    "title",
    "slug",
    "date",
    "description",
    "coverImage",
    "tags",
    "author",
  ]);
  const pipelinePosts = allPosts.filter((post) =>
    (post.tags as string[])?.includes("pipeline"),
  );

  const getAuthorData = (authorKey: string | undefined) => {
    if (!authorKey) return null;
    const author = getAuthorByKey(authorKey);
    if (!author) return null;
    return {
      name: author.name,
      title: author.title,
      image_url: author.image_url,
    };
  };
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
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          At OmicsLab, we deliver end-to-end bioinformatics solutions spanning
          infrastructure, data platforms, pipelines, and software for
          comprehensive multi-omics data management and analysis. Our services
          are designed to support projects at any scale, from individual studies
          to biobank-level cohorts. Our solution will be published partially via
          technical blog posts as below.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 text-xl font-semibold">Genomics</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Short-read germline variant calling</li>
              <li>• Short-read somatic variant calling</li>
              <li>• Long-read variant calling</li>
            </ul>
          </div>
          <div className="rounded-lg bg-pink-50 p-6 dark:bg-pink-900/20">
            <h3 className="mb-2 text-xl font-semibold">Methylation</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Bisulfite sequencing analysis</li>
              <li>• TAPS-based methylation calling</li>
              <li>• M-bias analysis</li>
            </ul>
          </div>
          <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <h3 className="mb-2 text-xl font-semibold">Transcriptomics</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• RNA-seq differential expression</li>
              <li>• Single-cell transcriptomics</li>
              <li>• Spatial transcriptomics</li>
            </ul>
          </div>
          <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
            <h3 className="mb-2 text-xl font-semibold">Proteomics</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Protein identification</li>
              <li>• Quantification</li>
              <li>• PTM analysis</li>
            </ul>
          </div>
          <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
            <h3 className="mb-2 text-xl font-semibold">Metabolomics</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Metabolite profiling</li>
              <li>• Pathway analysis</li>
              <li>• Targeted & untargeted</li>
            </ul>
          </div>
          <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-900/20">
            <h3 className="mb-2 text-xl font-semibold">Metagenomics</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 16S amplicon sequencing</li>
              <li>• Whole-genome shotgun</li>
              <li>• De novo assembly</li>
            </ul>
          </div>
        </div>

        {pipelinePosts.length > 0 && (
          <PipelineBlogList
            posts={pipelinePosts.map((post) => {
              const authorKey = post.author as string | undefined;
              const authorData = getAuthorData(authorKey);
              return {
                title: post.title as string,
                slug: post.slug as string,
                date: post.date as string,
                description: post.description as string,
                coverImage: post.coverImage as string | null,
                tags: (post.tags as string[]) || [],
                author: post.author as string,
                authorData,
              };
            })}
          />
        )}
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">
          Scalable Software Solutions
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          We provide open-source software packages for multi-omics data
          harmonization and analysis at scale.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">omicslab-kit</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Comprehensive toolkit for integrating multiple bioinformatics
              tools to set up scalable analysis pipelines. Includes tutorials
              for performing bioinformatics at scale using different tool
              configurations.
            </p>
            <Link
              href="https://github.com/gianglabs/omicslab-kit"
              target="_blank"
              className="text-primary hover:underline"
            >
              View on GitHub →
            </Link>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">pyomicslab</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Python package for multi-omics data harmonization and analysis at
              scale. Integrates with multiple data sources including TCGA data
              (rewritten from TCGABiolinks) and provides Python-native solutions
              for analysis and visualization including heatmaps, survival
              analysis, oncoplots, and more.
            </p>
            <Link
              href="https://github.com/gianglabs/pyomicslab"
              target="_blank"
              className="text-primary hover:underline"
            >
              View on GitHub →
            </Link>
          </div>
        </div>
      </section>

      <Contact fullHeight={false} />
    </div>
  );
}
