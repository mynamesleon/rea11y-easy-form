module.exports = {
  stories: ['../src/Introduction.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  webpackFinal: async config => {
    const cssModel = config.module.rules.find(i => i.test.toString() === '/\\.css$/');
    const lessRule = {
      test: /\.less$/,
      sideEffects: true,
      use: [...cssModel.use, {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    };
    // if (handleLessRule) lessRule = handleLessRule(lessRule);
    config.module.rules.push(lessRule);

    // const includeLessConfig = useLessLoader(config);
    return config;
  },
  docs: {}
};