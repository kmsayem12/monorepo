/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const extraNodeModules = {
  common: path.resolve(__dirname + '/../common'),
};
const watchFolders = [path.resolve(__dirname + '/../common')];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        // redirects dependencies referenced from shared/ to local node_modules
        return name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name.toString()}`);
      },
    }),
  },
  watchFolders,
};
