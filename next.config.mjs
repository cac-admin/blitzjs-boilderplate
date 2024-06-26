import { withBlitz } from '@blitzjs/next';

/** @type {import('next').NextConfig} */
const nextConfig = withBlitz({
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, "child_process": false };
      return config;
    },
    blitz: {
      resolverPath: "queries|mutations",
    },
})

export default nextConfig;
