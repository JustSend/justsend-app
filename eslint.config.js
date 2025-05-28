// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const pluginImport = require('eslint-plugin-import');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
    },
    ignores: ['dist/*'],
  },
]);
