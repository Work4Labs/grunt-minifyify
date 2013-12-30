var grunt = require('grunt');

exports.minifyify_tests = {
  test: function(test) {
    files = [
      'build.in.min.js',
      'build.sep.min.js',
      'build.sep.min.map'
    ];

    test.expect(files.length);

    files.forEach(function(file){
      var actual = grunt.file.read('tmp/' + file);
      var expected = grunt.file.read('test/fixtures/expected/' + file);
      test.equal(actual, expected, 'The file produced and the file expected should be equal; file: ' + file);
    });

    test.done();
  },
};
