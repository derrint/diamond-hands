/* eslint-disable import/no-extraneous-dependencies */
const withImages = require('next-images');
const withVideos = require('next-videos');
const withPlugins = require('next-compose-plugins');
// const path = require('path');
const redirects = {
  async redirects() {
    return [
      process.env.MAINTENANCE_MODE === '1'
        ? {source: '/((?!maintenance).*)', destination: '/maintenance', permanent: false}
        : null,
    ].filter(Boolean);
  },
};
module.exports = withPlugins(
  [
    // withImages({
    //   fileExtensions: ["jpg", "jpeg", "png", "gif"],
    //   webpack(config, options) {
    //     return config
    //   }
    // })
    withImages(withVideos()),
    [redirects],
  ],
  {
    images: {
      disableStaticImages: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  },
  {
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
      localeDetection: false,
    },
  },
);
