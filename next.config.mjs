import { hostname } from "os";

// next.config.js or next.config.mjs for ESM syntax
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'media.licdn.com',
      '*'
    ],
  },
};

export default nextConfig;
