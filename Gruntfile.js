module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    clean: ['tmp'],
    browserify: {
      options: {
        debug: true // needed to generate the initial sourcemap
      },
      app: {
        dest: "tmp/build.js",
        src: ["test/fixtures/src/foo.js"]
      },
    },
    minifyify: {
      builtin: {
        files: [{
          src: "tmp/build.js",
          dest: {
            buildFile: "tmp/build.in.min.js",
          }
        }]
      },
      separate: {
        files: [{
          src: "tmp/build.js",
          dest: {
            buildFile: "tmp/build.sep.min.js",
            mapFile: "tmp/build.sep.min.map",
            mapName: "build.sep.min.map"
          }
        }]
      }
    },
    nodeunit: {
      tests: ['test/minifyify_tests.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadTasks("tasks");

  grunt.registerTask("test", ["clean", "browserify", "minifyify:builtin", "minifyify:separate", "nodeunit"]);
};
