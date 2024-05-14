const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    productionBrowserSourceMaps: true,
    env: {
        NEXT_APP_URL: process.env.NEXT_APP_URL,
        NEXT_APP_ENVIRONMENT: process.env.NEXT_APP_ENVIRONMENT,
        NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
        NEXT_API_HEADER_TOKEN: process.env.NEXT_API_HEADER_TOKEN,
        NEXT_APP_MAPS_API_KEY: process.env.NEXT_APP_MAPS_API_KEY,
        NEXT_APP_DEPLOYING: process.env.NEXT_APP_DEPLOYING,
        NEXT_APP_TITLE_PREFIX: process.env.NEXT_APP_TITLE_PREFIX ?? '',
        NEXT_APP_NAME: process.env.NEXT_APP_NAME ?? 'APP_NAME',

        
        NEXT_API_HOST: process.env.NEXT_API_HOST,
        NEXT_APP_PASSWD: process.env.NEXT_APP_PASSWD
    }
};
module.exports = withNextIntl(nextConfig);
