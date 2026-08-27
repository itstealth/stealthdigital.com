import path from "node:path";
import { fileURLToPath } from "node:url";

// The repo is a pnpm workspace (pnpm-workspace.yaml). Turbopack's automatic
// workspace-root inference fails to locate `next` from the app directory on
// `next build` ("We couldn't find the Next.js package ... set turbopack.root
// in your Next.js config"), so pin the root explicitly to this directory.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;