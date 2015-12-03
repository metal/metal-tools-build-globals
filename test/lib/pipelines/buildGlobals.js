'use strict';

var assert = require('assert');
var buildGlobals = require('../../../lib/pipelines/buildGlobals');
var consume = require('stream-consume');
var vfs = require('vinyl-fs');

describe('Pipeline - Build to globals', function() {
	it('should build js files to a globals bundle and its source map', function(done) {
		var stream = vfs.src('test/fixtures/js/foo.js')
      .pipe(buildGlobals());

		var files = [];
    stream.on('data', function(file) {
			files.push(file.relative);
		});
		stream.on('end', function() {
			assert.strictEqual(2, files.length);
			assert.deepEqual(['metal.js', 'metal.js.map'], files.sort());
			done();
		});
		consume(stream);
	});
});
