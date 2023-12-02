const path = require('path');

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-addon-react-router-v6'
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // viteFinal: async (config) => {
    
  //   config.build.emptyOutDir = false;
  //   config.build.outDir = path.resolve(__dirname, 'dist');

  //   return config;
  // },
};
