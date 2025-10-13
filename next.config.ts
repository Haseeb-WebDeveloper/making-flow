import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  // Disable experimental features that cause Windows permission issues
  experimental: {
    // @ts-ignore
    disableOptimizedLoading: true,
  },
};

export default nextConfig;
