module.exports = function (grunt, options) {

  var cordova = require('cordova');
  // Define the configuration for all the tasks
  var cordovaConfig = {
    platform: grunt.option('platform')
  };

  return {
    'wait': function () {
      grunt.log.ok('Waiting for server reload...');

      var done = this.async();

      setTimeout(function () {
        grunt.log.writeln('Done waiting!');
        done();
      }, 1500);
    },

    'express-keepalive': function () {
      this.async();
    },

    'serve': function(target){
      if (target === 'www') {
        return grunt.task.run([
          'build',
          'processhtml:www',
          'htmlmin',
          'env:all',
          'env:prod',
          'express:prod',
          'wait',
          'open',
          'express-keepalive'
        ]);
      }

      if (target === 'dist') {
        return grunt.task.run([
          'build',
          'htmlmin',
          'clean:dist',
          'copy:dist',
          'env:all',
          'env:prod',
          'express:prod',
          'wait',
          'open',
          'express-keepalive'
        ]);
      }


      if (target === 'debug') {
        return grunt.task.run([
          'clean:server',
          'env:all',
          'ngconstant:local',
          'concurrent:server',
          'wiredep',
          'stylus',
          'autoprefixer',
          'concurrent:debug'
        ]);
      }

      grunt.task.run([
        'clean:server',
        'env:all',
        'ngconstant:local',
        'concurrent:server',
        'wiredep',
        'stylus',
        'autoprefixer',
        'express:dev',
        'wait',
        'open',
        'watch'
      ]);
    },

    'test': function (target) {

      if (target !== 'watch') {
        grunt.task.run([
          'clean:server',
          'concurrent:test',
          'autoprefixer'
        ]);
      }

      grunt.task.run([
        //'connect:test'
        //'mocha'
      ]);
    },

    'buildweb' : [
      'clean:www',
      'ngconstant:production',
      'wiredep',
      'useminPrepare',
      'concurrent:www',
      'stylus',
      'autoprefixer',
      'ngtemplates',
      'concat',
      'ngAnnotate',
      'copy:www',
      'cdnify',
      'cssmin',
      'uglify',
      'filerev',
  //    'modernizr',
      'usemin',
  //    'htmlmin'
      //   'uncss'
    ],

    'cordova-prepare':function () {
      var done = this.async();

      if (cordovaConfig.platform === null) {
        // Build all platforms
        cordova.prepare(done);
      } else {
        cordova.prepare(cordovaConfig.platform, done);
      }
    },

   'cordova-build': function () {
      var done = this.async();

      if (cordovaConfig.platform === null) {
        // Build all platforms
        cordova.build(done);
      } else {
        cordova.build(cordovaConfig.platform , done);
      }
    },

    'cordova-emulate': function () {
      var done = this.async();

      if (cordovaConfig.platform === null) {
        // Build all platforms
        cordova.emulate(done);
      } else {
        cordova.emulate(cordovaConfig.platform, done);
      }
    },

    'build':[
      'buildweb',
      'cordova-build'
    ],

    'emulate':[
      'build',
      'cordova-emulate'
    ],

    'cordova-run': function () {
      var done = this.async();

      if (cordovaConfig.platform === null) {
        // Build all platforms
        cordova.run(done);
      } else {
        cordova.run(cordovaConfig.platform, done);
      }
    },

    'run':[
      'build',
      'cordova-run'
    ],

    'default':[
      'newer:jshint',
      'test',
      'build'
    ]
  }
};
