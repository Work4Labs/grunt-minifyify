var fs = require('fs'),
    async = require('async'),
    minifyify = require('minifyify');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'minifyify',
    'Uglifies and generates sourcemaps from the files generated with browserify.',
    function() {
      var done = this.async();
      async.eachSeries(this.files, function (file, next) {
        var src = file.src,
            dest = file.dest,
            readStream = fs.createReadStream(src.toString());

        var options = file.options || {};
        if(dest.mapFile) {
          if(dest.mapName)
            options['map'] = dest.mapName;
          readStream.pipe(
            minifyify(
              options,
              function(err, source, sourceMap) {
                if (err) {
                  grunt.log.error(err);
                  done(false);
                } else {
                  grunt.file.write(dest.buildFile, source)
                  grunt.file.write(dest.mapFile, sourceMap)
                  grunt.log.ok('Minifyified ' + dest.buildFile + ', ' + dest.mapFile);
                  next();
                }
              }
            )
          );
        } else {
          var writeStream = fs.createWriteStream(dest.buildFile);

          readStream
          .on('open', function(){
            readStream.pipe(minifyify(options)).pipe(writeStream);
          })
          .on('error', function(err){
            grunt.log.error(err);
            done(false);
          });

          writeStream.on('finish', function(){
            grunt.log.ok('Minifyified ' + dest.buildFile);
            next();
          });
        }

      }, done);
    }
  );
};
