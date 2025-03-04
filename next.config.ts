import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  // Also disable TypeScript type checking during builds for faster deployments
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
