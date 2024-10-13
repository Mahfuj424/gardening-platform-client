/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/dashboard/user': { page: '/dashboard/user' },
      // You can selectively export paths that are static here
    }
  },
};

export default nextConfig;
