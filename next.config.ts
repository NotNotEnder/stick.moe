import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Ensure better-sqlite3 is treated as an external package (not bundled)
  serverExternalPackages: ["better-sqlite3"], 
  turbopack: {
    // Turbopack options
    resolveAlias: {
      // Example aliases if needed, currently empty as standard setup works
    },
  },
};

export default nextConfig;
