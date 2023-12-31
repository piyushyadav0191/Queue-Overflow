/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["static.vecteezy.com", "img.clerk.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
