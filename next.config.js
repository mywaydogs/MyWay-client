module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
};
