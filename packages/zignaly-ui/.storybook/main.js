module.exports = {
  stories: ["../src/**/stories.mdx", "../src/**/stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-jest"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
