'use strict';

var babelGlobals = require('gulp-babel-globals');
var defaultOptions = require('../options');
var merge = require('merge');

module.exports = function(options) {
	options = merge({}, defaultOptions, options);
	return babelGlobals({
		babel: {
			compact: false,
			presets: options.babelPresets,
			sourceMaps: true
		},
		bundleFileName: options.bundleFileName,
		cache: 'metal-globals',
		globalName: options.globalName
	});
};
