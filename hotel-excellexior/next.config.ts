import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Cache Components (PPR) disabled: this app is DB-backed (admin dashboard,
  // reservations, auth cookies) and relies on the classic dynamic-by-default
  // rendering model instead of per-component "use cache" + Suspense wiring.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
