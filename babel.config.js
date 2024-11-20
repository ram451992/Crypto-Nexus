module.exports = function (api) {
  api.cache(true);
  const plugins = ['react-native-reanimated/plugin'];

  plugins.push([
    '@tamagui/babel-plugin',
    {
      components: ['tamagui'],
      config: './tamagui.config.ts',
    },
  ]);

  // Add this plugin for path aliasing
  plugins.push([
    'module-resolver',
    {
      root: ['.'],
      alias: {
        '@': '.',
      },
    },
  ]);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};