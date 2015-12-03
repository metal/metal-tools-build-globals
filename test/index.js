'use strict';

var assert = require('assert');
var del = require('del');
var fs = require('fs');
var metalToolsBuildGlobals = require('../index');
var sinon = require('sinon');
var vfs = require('vinyl-fs');

describe('Metal Tools - Build Globals', function() {
  describe('Default src/dest', function() {
    beforeEach(function() {
      var pipe = {
        pipe: function() {
          return pipe;
        }
      };
      sinon.stub(vfs, 'src').returns(pipe);
      sinon.stub(vfs, 'dest');
    });

    afterEach(function() {
      vfs.src.restore();
      vfs.dest.restore();
    });

  	it('should compile soy files from/to "src" folder by default', function() {
      metalToolsBuildGlobals();
      assert.strictEqual('src/**/*.js', vfs.src.args[0][0]);
      assert.strictEqual('build/globals', vfs.dest.args[0][0]);
  	});
  });

  describe('Integration', function() {
    beforeEach(function(done) {
      deleteBuiltFiles(done);
    });

  	after(function(done) {
      deleteBuiltFiles(done);
  	});

  	it('should compile specified soy files to js', function(done) {
      var stream = metalToolsBuildGlobals({
        src: 'test/fixtures/js/foo.js',
        dest: 'test/fixtures/build'
      });
      stream.on('end', function() {
        assert.ok(fs.existsSync('test/fixtures/build/metal.js'));
    		done();
      });
  	});
  });
});

function deleteBuiltFiles(done) {
  del('test/fixtures/build').then(function() {
    done();
  });
}
