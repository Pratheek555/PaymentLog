/** @type {import('next').NextConfig} */
const nextConfig = {
  //   headers: () => [
  //     {
  //       source: "/uuid",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "no-store",
  //         },
  //       ],
  //     },
  //   ],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
