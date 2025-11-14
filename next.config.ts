import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**", // cubre todas las rutas Firebase Storage
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**", // cubre buckets públicos o alternativos
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
