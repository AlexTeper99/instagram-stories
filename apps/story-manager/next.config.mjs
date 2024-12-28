/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
