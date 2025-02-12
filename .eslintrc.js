module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'react-native/no-inline-styles': 0,
  },
};
