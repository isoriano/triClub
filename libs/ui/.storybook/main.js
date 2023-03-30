const rootMain = require('../../../.storybook/main');
const path = require('path');

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [...rootMain.stories, '../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [...rootMain.addons],
  features: {
    previewMdx2: true,
  },
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed

    return config;
  }
};
