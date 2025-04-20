/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
    ],
  },
  // output: "export",
  // basePath: '',
  // trailingSlash: true,
};

export default nextConfig;
