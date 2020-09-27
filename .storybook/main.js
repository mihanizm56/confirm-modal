/* eslint-disable no-param-reassign */

const path = require('path');

module.exports = {
  stories: ['../lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /(module)?\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, '../lib/'),
      },
    };

    return config;
  },
};
