module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
