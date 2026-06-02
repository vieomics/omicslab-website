import { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import OfferList from "@/components/Pricing/OfferList";
import BlogListWithFilter, {
  BlogPost,
} from "@/components/Blog/BlogListWithFilter";
import { getAllPosts } from "@/utils/markdown";
import { getAuthorByKey } from "@/utils/authors";

export const metadata: Metadata = {
  title: "Infrastructure as a Service | GiangLabs",
  description:
    "Setup infrastructure to run Nextflow pipelines on-premises HPC or cloud (AWS, GCP).",
};

export default function InfrastructurePage() {
  const allPosts = getAllPosts([
    "title",
    "slug",
    "date",
    "description",
    "coverImage",
    "tags",
    "author",
  ]);
  const infraPosts = allPosts.filter(
    (post) =>
      (post.tags as string[])?.includes("HPC") ||
      (post.tags as string[])?.includes("infrastructure"),
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
      <h1 className="mb-8 text-4xl font-bold">Infrastructure as a Service</h1>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
        Setup infrastructure to run Nextflow pipelines on-premises or in the
        cloud.
      </p>

      <div className="border-primary mb-12 border-l-4 bg-gray-50 p-6 dark:bg-gray-800">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Run Nextflow pipelines at scale on your preferred infrastructure. We
          provide automated deployment for on-premises HPC clusters (Slurm) or
          cloud environments (AWS, GCP). Focus on your research while we handle
          the infrastructure.
        </p>
      </div>

      {/* Related HPC Blog Posts */}
      {infraPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">Infrastructure Guides</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Technical guides for setting up and managing HPC infrastructure.
            Each guide can be customized to your specific requirements.
          </p>
          <BlogListWithFilter
            posts={infraPosts.map((post) => {
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
            layout="grid"
            searchPlaceholder="Search infrastructure blogs..."
            className="grid gap-6 md:grid-cols-3"
          />
        </section>
      )}

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">
          Available Infrastructure
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill="var(--ci-primary-color, #000000)"
                      d="M16,48V464H496V48ZM464,432H48V336H464Zm0-128H48V208H464ZM48,176V80H464v96Z"
                    ></path>{" "}
                    <rect
                      width="32"
                      height="32"
                      x="80"
                      y="112"
                      fill="var(--ci-primary-color, #000000)"
                    ></rect>{" "}
                    <rect
                      width="32"
                      height="32"
                      x="80"
                      y="240"
                      fill="var(--ci-primary-color, #000000)"
                    ></rect>{" "}
                    <rect
                      width="32"
                      height="32"
                      x="80"
                      y="368"
                      fill="var(--ci-primary-color, #000000)"
                    ></rect>{" "}
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">On-Premises HPC</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Deploy Nextflow on your local HPC cluster with Slurm, PBS, or LSF
              scheduler.
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">AWS Cloud</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Run Nextflow on AWS Batch with EC2, Fargate, or Spot instances.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">GCP Cloud</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Deploy on Google Cloud Batch with Compute Engine or preemptible
              VMs.
            </p>
          </div>
        </div>
      </section>

      {/* On-Premises HPC Details */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">On-Premises HPC</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Deploy a complete Slurm HPC cluster on your local infrastructure. We
          provide the setup and configuration, you provide the hardware.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Mini-HPC */}
          <div className="rounded-xl border-2 border-blue-500 bg-white p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                Setup
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-semibold">Mini-HPC</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Small cluster for individual researchers or small labs
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">$250</span>
              <span className="text-gray-500"> one-time</span>
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">Configuration:</p>
              <OfferList text="1 Controller/Login Node" />
              <OfferList text="1 Compute Node" />
              <OfferList text="Slurm Scheduler" />
              <OfferList text="NFS Shared Storage" />
              <OfferList text="Basic Monitoring" />
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">Includes:</p>
              <OfferList text="Ansible automation setup" />
              <OfferList text="Slurm configuration" />
              <OfferList text="Nextflow integration" />
              <OfferList text="Basic training session" />
              <OfferList text="30-day support" />
            </div>
            <p className="mb-4 text-sm text-gray-500">
              * Hardware not included.
            </p>
          </div>

          {/* Maintenance Service */}
          <div className="rounded-xl border-2 border-green-500 bg-white p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                Service
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-semibold">HPC Maintenance</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Ongoing maintenance service for any HPC cluster
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">$100</span>
              <span className="text-gray-500">/month</span>
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">What's Included:</p>
              <OfferList text="System updates and patches" />
              <OfferList text="Slurm version upgrades" />
              <OfferList text="Software package updates" />
              <OfferList text="24/7 monitoring" />
              <OfferList text="Priority support" />
            </div>
            <p className="mb-4 text-sm text-gray-500">
              * Works for any HPC cluster, including ones not set up by us.
            </p>
          </div>
          {/* Multi-nodes */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block rounded bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                Setup
              </span>
            </div>
            <h3 className="mb-2 text-2xl font-semibold">Multi-Node HPC</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Scalable cluster for research groups and production workloads
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-600">Contact</span>
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">Configuration:</p>
              <OfferList text="Multiple Controller Nodes (HA)" />
              <OfferList text="Multiple Compute Nodes" />
              <OfferList text="GPU Support (Optional)" />
              <OfferList text="High-Performance Storage" />
              <OfferList text="Advanced Monitoring" />
            </div>
            <div className="mb-6">
              <p className="mb-3 font-semibold">Includes:</p>
              <OfferList text="Custom Ansible automation" />
              <OfferList text="High availability setup" />
              <OfferList text="LDAP/Active Directory | NIS" />
              <OfferList text="Full training sessions" />
              <OfferList text="1-year support" />
            </div>
            <p className="mb-4 text-sm text-gray-500">* Requirements vary.</p>
          </div>
        </div>
      </section>

      {/* Cloud Features */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">
          Cloud Infrastructure Features
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-cyan-50 p-6 dark:bg-cyan-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Auto-Scaling</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically scale compute resources based on workload.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Cost Optimization</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Use spot/preemptible instances for batch jobs. Save up to 90%.
            </p>
          </div>
          <div className="rounded-lg bg-pink-50 p-6 dark:bg-pink-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Job Monitoring</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time monitoring of pipeline execution.
            </p>
          </div>
          <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-900/20">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                <svg
                  fill="#000000"
                  viewBox="0 0 36 36"
                  version="1.1"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>storage-line</title>{" "}
                    <path d="M33,6.69h0c-.18-3.41-9.47-4.33-15-4.33S3,3.29,3,6.78V29.37c0,3.49,9.43,4.43,15,4.43s15-.93,15-4.43V6.78s0,0,0,0S33,6.7,33,6.69Zm-2,7.56c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,15.34v2.08A43.32,43.32,0,0,0,18,18.7c4,0,9.93-.48,13-2v5.17c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,22.92V25a43.32,43.32,0,0,0,11,1.28c4,0,9.93-.48,13-2v5.1c-.35.86-5.08,2.45-13,2.45S5.3,30.2,5,29.37V6.82C5.3,6,10,4.36,18,4.36c7.77,0,12.46,1.53,13,2.37-.52.87-5.21,2.39-13,2.39A37.6,37.6,0,0,1,7,7.76V9.85a43.53,43.53,0,0,0,11,1.27c4,0,9.93-.48,13-2Z"></path>{" "}
                    <rect
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                      fillOpacity="0"
                    ></rect>{" "}
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Storage Integration</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Connect to S3, GCS, or local NFS storage.
            </p>
          </div>
        </div>
      </section>

      <Contact fullHeight={false} />
    </div>
  );
}
