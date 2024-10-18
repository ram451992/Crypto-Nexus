const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'mjs'],
  },
  watchFolders: [
    ...config.watchFolders,
    // Add any additional folders you want Metro to watch
  ],
};