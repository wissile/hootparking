// Generated on 2014-09-03 using
// generator-webapp 0.5.0
'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  var path = require('path');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'grunt'),

    // auto grunt.initConfig
    init: true,

    // data passed into config.  Can use with <%= test %>
    data: {
      config:{
        client: require('./bower.json').appPath || 'client',
        server: 'server',
        tmp: '.tmp',
        www: 'www',
        dist: 'dist'
      },
      localConfig : require('./server/config/local.env')
    },

    // can optionally pass options to load-grunt-tasks.
    // If you set to false, it will disable auto loading tasks.
    loadGruntTasks: {

      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    }

  });
};
