/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'pl', 'uk'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  },
}

export default nextConfig;
