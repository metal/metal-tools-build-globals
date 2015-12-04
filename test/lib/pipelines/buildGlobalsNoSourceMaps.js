'use strict';

var assert = require('assert');
var buildGlobalsNoSourceMaps = require('../../../lib/pipelines/buildGlobalsNoSourceMaps');
var consume = require('stream-consume');
var vfs = require('vinyl-fs');

describe('Pipeline - Build to globals with no source maps', function() {
	it('should build js files to a single bundle', function(done) {
		var stream = vfs.src('test/fixtures/js/foo.js')
      .pipe(buildGlobalsNoSourceMaps());

		var files = [];
    stream.on('data', function(file) {
			files.push(file.relative);
		});
		stream.on('end', function() {
			assert.strictEqual(1, files.length);
			assert.strictEqual('metal.js', files[0]);
			done();
		});
		consume(stream);
	});

	it('should build js files to single bundle with the specified filename', function(done) {
		var stream = vfs.src('test/fixtures/js/foo.js')
      .pipe(buildGlobalsNoSourceMaps({
				bundleFileName: 'foo.js'
			}));

    stream.on('data', function(file) {
			assert.strictEqual('foo.js', file.relative);
			done();
		});
	});

	it('should publish exported variables on global', function(done) {
		var stream = vfs.src('test/fixtures/js/foo.js')
      .pipe(buildGlobalsNoSourceMaps());

    stream.on('data', function(file) {
			var contents = file.contents.toString();
			assert.notStrictEqual(-1, contents.indexOf('this.metal.foo = Foo;'));
			done();
		});
	});

	it('should publish exported variables on specified global', function(done) {
		var stream = vfs.src('test/fixtures/js/foo.js')
      .pipe(buildGlobalsNoSourceMaps({
				globalName: 'bar'
			}));

    stream.on('data', function(file) {
			var contents = file.contents.toString();
			assert.notStrictEqual(-1, contents.indexOf('this.bar.foo = Foo;'));
			done();
		});
	});
});
