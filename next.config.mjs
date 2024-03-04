/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_URL:process.env.API_URL,
    API_SOCKET_URL:process.env.API_SOCKET_URL
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
