import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "framer-motion"],
  },
};

export default nextConfig;

/**
 * Wire up Cloudflare context (env bindings, waitUntil, etc.) during `next dev`
 * when the OpenNext Cloudflare adapter is installed. Safe no-op otherwise —
 * the import is wrapped so a missing module does not break local dev.
 */
if (process.env.NODE_ENV === "development") {
  void (async () => {
    try {
      const mod = await import("@opennextjs/cloudflare").catch(() => null);
      if (mod && typeof mod.initOpenNextCloudflareForDev === "function") {
        await mod.initOpenNextCloudflareForDev();
      }
    } catch {
      /* adapter not installed — ignore */
    }
  })();
}
