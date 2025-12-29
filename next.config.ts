import type { NextConfig } from "next";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Ensure better-sqlite3 is treated as an external package (not bundled)
  serverExternalPackages: ["better-sqlite3"], 
};

export default nextConfig;

export default nextConfig;
