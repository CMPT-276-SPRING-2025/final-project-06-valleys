/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: process.env.NODE_ENV === 'production' 
      ? './' 
      : undefined
  }
};

export default nextConfig;
