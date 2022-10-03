/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s3.ap-northeast-3.amazonaws.com'],
  },
}

module.exports = nextConfig
