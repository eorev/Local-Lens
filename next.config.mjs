import { hostname } from "os";

// next.config.js or next.config.mjs for ESM syntax
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      '*'
    ],
  },
};

export default nextConfig;
