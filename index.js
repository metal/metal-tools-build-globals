'use strict';

var buildGlobals = require('./lib/pipelines/buildGlobals');
var consume = require('stream-consume');
var vfs = require('vinyl-fs');

module.exports = function (options) {
	options  = options || {};
	var stream = vfs.src(options.src || 'src/**/*.js')
		.pipe(buildGlobals(options))
		.pipe(vfs.dest(options.dest || 'build/globals'));
	consume(stream);
	return stream;
};
