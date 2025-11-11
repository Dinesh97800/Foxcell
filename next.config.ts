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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',      // frontend path
        destination: 'http://localhost:5000/uploads/:path*', // backend URL
      },
    ];
  },
};

module.exports = nextConfig;
