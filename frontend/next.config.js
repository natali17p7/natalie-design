// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  webpack: config => {
    config.resolve.fallback = {...config.resolve.fallback, fs: false}
    return config
  },
};

module.exports = withNextIntl(config);
