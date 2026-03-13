module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './',
          '@src': './src',
          '@lmb-it/kitsconcerto': '@lmb-it/kitsconcerto-native',
          'tailwind.config': './tailwind.config.js',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
