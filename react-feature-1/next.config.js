/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "cdn.sanity.io",
      "cdn11.bigcommerce.com",
      "images5.alphacoders.com",
      "hyte-development.imgix.net",
      "content.ibuypower.com",
      "i.pinimg.com",
      "hyte.com",
      `store-${process.env.BIGCOMMERCE_STORE_HASH}.mybigcommerce.com`,
      "www.themoviedb.org",
      "hyte-geoip.vercel.app",
      "han.blob.core.windows.net",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
