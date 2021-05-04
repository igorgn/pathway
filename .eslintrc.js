module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['detox'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
  },
};
