'use strict';

var babelGlobals = require('gulp-babel-globals');
var babelPresetMetal = require('babel-preset-metal');

module.exports = function(options) {
  options = options || {};
  options.babelPresets = options.babelPresets || [babelPresetMetal];
  options.bundleFileName = options.bundleFileName || 'metal.js';
  options.globalName = options.globalName || 'metal';
  
	return babelGlobals({
		babel: {
			compact: false,
			presets: options.babelPresets,
			sourceMaps: true
		},
		bundleFileName: options.bundleFileName,
		globalName: options.globalName
	});
};
