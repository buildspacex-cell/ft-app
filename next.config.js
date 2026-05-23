/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Capacitor native builds: `npm run build:native` uses output: 'export'
  // For Vercel web deployment: remove output or set to undefined
  // Switch via NEXT_OUTPUT env var
  ...(process.env.NEXT_OUTPUT === 'export' ? { output: 'export' } : {}),

  images: {
    // Required for static export
    unoptimized: process.env.NEXT_OUTPUT === 'export',
  },

  // Required for Capacitor: relative paths
  ...(process.env.NEXT_OUTPUT === 'export' ? { basePath: '' } : {}),
}

module.exports = nextConfig
