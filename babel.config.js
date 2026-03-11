module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
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
