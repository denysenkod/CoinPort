/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  extends: ['next/core-web-vitals', 'turbo', 'prettier'],
  ignorePatterns: ['node_modules', 'dist'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  images: {
    domains: ['assets.coingecko.com'],
  },
};

cache:
  enable: true
