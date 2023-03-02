/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  staticPageGenerationTimeout: 100,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "next-stripradar.s3.eu-west-2.amazonaws.com",
      },
    ],
    // domains: ["next-stripradar.s3.eu-west-2.amazonaws.com", "cloudfront.net"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
