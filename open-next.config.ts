import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext configuration for Cloudflare Workers.
 * Defaults are sane for a Next.js App Router app — no ISR/caching layers
 * wired yet. Add `incrementalCache` / `queue` here later if needed.
 */
export default defineCloudflareConfig();
