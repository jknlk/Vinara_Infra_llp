import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // the hero frame sequences never change in place, so browsers may keep them for a year
  async headers() {
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/3d%20hero%20scroll/:file*", headers: immutable },
      { source: "/hero-frames-sm/:file*", headers: immutable },
    ];
  },
  async redirects() {
    return [{ source: "/quality-safety", destination: "/planning#quality", permanent: true }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
