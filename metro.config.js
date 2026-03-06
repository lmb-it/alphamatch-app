/**
 * Metro configuration
 */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const base = getDefaultConfig(__dirname);

const config = mergeConfig(base, {
  resolver: {
    extraNodeModules: {
      '@lmb/kitsconcerto': path.resolve(projectRoot, 'node_modules/@lmb/kitsconcerto'),
      'lucide-react': require.resolve('lucide-react-native'),
    },
    sourceExts: [
      ...base.resolver.sourceExts,
      'native.ts', 'native.tsx', 'ts', 'tsx', 'js', 'jsx', 'json',
    ],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
    ],
  },
});

module.exports = withNativeWind(config, { input: './global.css' });
