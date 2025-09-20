// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'netband-react.vercel.app',
        port: '',
        pathname: '/assets/img/feature/**',
      },
    ],
  },
};

module.exports = nextConfig;
