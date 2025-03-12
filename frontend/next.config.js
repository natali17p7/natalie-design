 // @ts-check
 const withNextIntl = require('next-intl/plugin')();
 const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
 });

 /** @type {import('next').NextConfig} */
 const config = {
   webpack: config => {
     config.resolve.fallback = {...config.resolve.fallback, fs: false};
     return config;
   },
   // output: 'standalone'
 };

 module.exports = withBundleAnalyzer(
   withNextIntl(config)
 );
