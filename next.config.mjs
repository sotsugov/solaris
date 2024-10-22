/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.FAST_API_URL}/api/:path*`
            : '/api/',
      },
      {
        source: '/docs',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.FAST_API_URL}/api/docs`
            : '/api/docs',
      },
      {
        source: '/openapi.json',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.FAST_API_URL}/api/openapi.json`
            : '/api/openapi.json',
      },
    ];
  },
};

export default nextConfig;
