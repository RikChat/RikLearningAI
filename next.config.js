/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Hapus experimental.appDir karena Next 14 sudah otomatis memakai app router
  experimental: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
