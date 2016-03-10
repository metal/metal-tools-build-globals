'use strict';

var babelPresetMetal = require('babel-preset-metal');

module.exports = {
  babelPresets: [babelPresetMetal],
  bundleFileName: 'metal.js',
  cacheNamespace: 'metal-globals',
  dest: 'build/globals',
  globalName: 'metal',
  src: 'src/**/*.js'
};
