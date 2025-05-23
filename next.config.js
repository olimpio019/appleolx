/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/f/**',
      },
    ],
    domains: [
      'c2psaktfgy.ufs.sh',
    ],
  },
}

module.exports = nextConfig 