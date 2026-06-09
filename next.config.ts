import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  // Hides the bottom-left dev indicator; reduces devtools RSC manifest glitches.
  devIndicators: false,
  experimental: {
    // Next 15.5+ enables segment explorer by default; it can trigger
    // "SegmentViewNode not in React Client Manifest" → __webpack_modules__ errors.
    devtoolSegmentExplorer: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
