/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  staticPageGenerationTimeout: 100,
  images: {
    domains: [
      "next-stripradar.s3.eu-west-2.amazonaws.com",
      "d31fr2pwly4c4s.cloudfront.net",
    ],
    formats: ["image/avif", "image/webp"],
  },
};
// next-stripradar.s3.eu-west-2.amazonaws.com

module.exports = nextConfig;
