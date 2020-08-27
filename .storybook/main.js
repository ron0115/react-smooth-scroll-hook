const path = require('path');
const basePath = path.resolve(__dirname, '../', 'src');

module.exports = {
  stories: ['../@(stories|example)/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.alias = {
      'react-smooth-scroll-hook': basePath,
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
