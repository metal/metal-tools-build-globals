'use strict';

var combiner = require('stream-combiner');
var sourcemaps = require('gulp-sourcemaps');
var buildGlobalsNoSourceMaps = require('./buildGlobalsNoSourceMaps');

module.exports = function(options) {
	return combiner(
		sourcemaps.init(),
		buildGlobalsNoSourceMaps(options),
		sourcemaps.write('./')
	);
};
