/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/py/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.FAST_API_URL}/api/py/:path*`
            : '/api/',
      },
      {
        source: '/docs',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.FAST_API_URL}/api/py/docs`
            : '/api/py/docs',
      },
      {
        source: '/openapi.json',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.FAST_API_URL}/api/py/openapi.json`
            : '/api/py/openapi.json',
      },
    ];
  },
};

export default nextConfig;
