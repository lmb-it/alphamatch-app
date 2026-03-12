/**
 * Metro configuration
 */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const { withSentryConfig } = require('@sentry/react-native/metro');

const projectRoot = __dirname;
const base = getDefaultConfig(__dirname);

const shimObj = path.resolve(__dirname, 'react-dom-shim.js');

const config = mergeConfig(base, {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      const originPath = context.originModulePath || '';
      const isWebDep =
        moduleName === 'react-dom' ||
        moduleName.startsWith('react-router-dom') ||
        moduleName.startsWith('primereact') ||
        moduleName.startsWith('primeicons') ||
        moduleName.startsWith('styled-components') ||
        moduleName.startsWith('@emotion/') ||
        moduleName.startsWith('chart.js') ||
        moduleName.startsWith('jspdf') ||
        moduleName.startsWith('react-pro-sidebar') ||
        moduleName.startsWith('file-saver') ||
        moduleName.startsWith('xlsx') ||
        moduleName.startsWith('framer-motion') ||
        moduleName.startsWith('react-spinners') ||
        moduleName.startsWith('react-icons') ||
        moduleName.startsWith('quill') ||
        moduleName.startsWith('react-dnd') ||
        moduleName.startsWith('react-json-view') ||
        moduleName.startsWith('@textea/') ||
        moduleName.startsWith('@pusher/') ||
        moduleName.startsWith('pusher-js') ||
        moduleName.startsWith('react-responsive') ||
        moduleName.startsWith('@react-hook/') ||
        ((originPath.includes('@lmb-it/kitsconcerto') ||
          originPath.includes('dist/web')) &&
          moduleName.endsWith('.css')) ||
        (moduleName.includes('@lmb-it/kitsconcerto') &&
          moduleName.endsWith('.css'));

      if (isWebDep) {
        return {
          filePath: shimObj,
          type: 'sourceFile',
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
    extraNodeModules: {
      '@lmb-it/kitsconcerto': path.resolve(
        projectRoot,
        'node_modules/@lmb-it/kitsconcerto',
      ),
      'lucide-react': require.resolve('lucide-react-native'),
    },
    sourceExts: [
      ...base.resolver.sourceExts,
      'native.ts',
      'native.tsx',
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
    ],
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
  },
});

module.exports = withSentryConfig(
  withNativeWind(config, { input: './global.css' }),
);
