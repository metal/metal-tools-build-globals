'use strict';

const defaultOptions = require('../options');
const merge = require('merge');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const fileEntry = path.resolve('./' + require(path.resolve('./package.json'))['jsnext:main']) || [];

module.exports = function(options) {
	options = merge({}, defaultOptions, options);
	return webpackStream({
		devtool: options.sourceMaps ? 'source-map' : false,
		entry: fileEntry,
		module: {
			rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					compact: false,
					presets: options.babelPresets,
				}
			}]
		},
		output: {
			library: options.globalName,
			libraryTarget: 'this',
			filename: options.bundleFileName,
		},
	}, webpack);
};
