// next.config.ts - Enhanced version with compression and security
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Enable compression (gzip/brotli)
  compress: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,
  transpilePackages: [
    "next-sanity",
    "sanity",
    "styled-components",
    "@sanity/vision",
    "sanity/structure",
  ],
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  serverExternalPackages: ["jsdom"],

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    qualities: [75],

    dangerouslyAllowSVG: false,
  },

  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-aspect-ratio",
      "lucide-react",
    ],
  },

  // Security Headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // Prevents clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevents MIME sniffing
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // XSS protection for older browsers
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()", // Disable unnecessary browser features
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
