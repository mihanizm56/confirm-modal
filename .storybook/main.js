/* eslint-disable no-param-reassign */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  stories: ['../lib/**/*.stories.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /(module)?\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    if (configType === 'PRODUCTION') {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
        }),
      );
    }

    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, '../lib/'),
      },
    };

    return config;
  },
};
