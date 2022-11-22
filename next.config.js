/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    pusher_client_key: process.env.PUSHER_CLIENT_KEY,
    pusher_client_cluster: process.env.PUSHER_CLIENT_CLUSTER,
    pusher_client_tls: process.env.PUSHER_CLIENT_TLS,
  },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};
