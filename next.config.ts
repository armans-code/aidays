import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/api/user/",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // TODO: set to watsonx origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
