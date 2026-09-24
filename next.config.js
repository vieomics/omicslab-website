/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
};

module.exports = nextConfig;
