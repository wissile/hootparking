// Generated on 2014-09-03 using
// generator-webapp 0.5.0
'use strict';


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }
  var cordova = require('cordova');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    client: require('./bower.json').appPath || 'client',
    server: 'server',
    tmp: '.tmp',
    www: 'www',
    dist:'dist'
  };

  // Define the configuration for all the tasks
  var cordovaConfig = {
    platform: grunt.option('platform')
  };

  grunt.initConfig({

    // Project settings
    config: config,

    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: '<%= config.server %>/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: '<%= config.dist %>/server/app.js'
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      cordova: {
        files: [
          '<%= config.client %>/*.html',
          '<%= config.tmp %>/styles/{,*/}*.css',
          '{<%= config.tmp %>,<%= config.client %>}/scripts/{,*/}*.js',
          '<%= config.client %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['copy:auto', 'cordova-prepare']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.client %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'notify:js']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.client %>/styles/{,*/}*.css', '<%= config.client %>/stylus/{,*/}*.styl'],
        tasks: ['stylus', 'newer:copy:styles', 'autoprefixer', 'notify:css']
      },
      livereload: {
        files: [
          '{<%= config.tmp %>,<%= config.client %>}/**/*.css',
          '{<%= config.tmp %>,<%= config.client %>}/**/*.html',
          '{<%= config.tmp %>,<%= config.client %>}/**/*.js',
          '!{<%= config.tmp %>,<%= config.client %>}/**/*.spec.js',
          '!{<%= config.tmp %>,<%= config.client %>}/**/*.mock.js',
          '<%= config.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        },
        tasks: ['notify:livereload']
      },
      express: {
        files: [
          '<%= config.server %>/**/*.{js,json}'
        ],
        tasks: ['newer:jshint:server', 'express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= config.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: '<%= config.server %>/.jshintrc'
        },
        src: [
          '<%= config.server %>/**/*.js',
          '!<%= config.server %>/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: '<%= config.server %>/.jshintrc-spec'
        },
        src: ['<%= config.server %>/**/*.spec.js']
      },
      all: [
        'Gruntfile.js',
        '<%= config.client %>/**/*.js',
        '!<%= config.client %>/scripts/config.js',
        '!<%= config.client %>/**/*.spec.js',
        '!<%= config.client %>/**/*.mock.js',
        '!<%= config.client %>/bower_components/**/*.js'
      ],
      test: {
        src: [
          '<%= config.client %>/**/*.spec.js',
          '<%= config.client %>/**/*.mock.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {
        force: true
      },
      www: {
        files: [
          {
            dot: true,
            src: [
              '<%= config.tmp %>',
              '<%= config.www %>/*',
              '!<%= config.www %>/.git*'
            ]
          }
        ]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.tmp %>',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*',
            '!<%= config.dist %>/.openshift',
            '!<%= config.dist %>/Procfile'
          ]
        }]
      },
      server: '<%= config.tmp %>'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      www: {
        files: [
          {
            expand: true,
            cwd: '<%= config.tmp %>/styles/',
            src: '{,*/}*.css',
            dest: '<%= config.tmp %>/styles/'
          }
        ]
      }
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: '<%= config.server %>/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },


    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= config.client %>/index.html',
        ignorePath: '<%= config.client %>/',
        exclude: []
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.www %>/scripts/{,*/}*.js',
          '<%= config.www %>/styles/{,*/}*.css',
          '<%= config.www %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.www %>/styles/fonts/*'
        ]
      }
    },

    processhtml: {
      www: {
        files: {
          '<%= config.www %>/index.html': ['<%= config.www %>/index.html']
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= config.client %>/index.html',
      options: {
        dest: '<%= config.www %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= config.www %>/{,*/}*.html'],
      css: ['<%= config.www %>/styles/{,*/}*.css'],
      js: ['<%= config.www %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: ['<%= config.www %>', '<%= config.www %>/images'],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the www folder
    imagemin: {
      www: {
        files: [
          {
            expand: true,
            cwd: '<%= config.client %>/images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.www %>/images'
          }
        ]
      }
    },

    svgmin: {
      www: {
        files: [
          {
            expand: true,
            cwd: '<%= config.client %>/images',
            src: '{,*/}*.svg',
            dest: '<%= config.www %>/images'
          }
        ]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      www: {
        files: [
          {
            expand: true,
            cwd: '<%= config.tmp %>/concat/scripts',
            src: '*.js',
            dest: '<%= config.tmp %>/concat/scripts'
          }
        ]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'easyparkangularApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        usemin: 'scripts/scripts.js'
      },
      main: {
        cwd: '<%= config.client %>',
        src: ['views/{,*/}*.html'],
        dest: '<%= config.tmp %>/templates.js'
      }
    },

    htmlmin: {
      www:{
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true

        },
        files: [
          {
            expand: true,
            cwd: '<%= config.www %>',
            src: ['*.html'],
            dest: '<%= config.www %>'
          }
        ]
      }
    },

    // Replace Google CDN references
    cdnify: {
      www: {
        html: ['<%= config.www %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      auto: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.client %>',
            dest: '<%= config.www %>',
            src: [
              '{,*/}*.*'
            ]
          }
        ]
      },
      www: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.client %>',
            dest: '<%= config.www %>',
            src: [
              '*.{ico,png,txt,xml}',
              'images/{,*/}*.webp',
              '{,*/}*.html',
              'styles/fonts/{,*/}*.*',
              'fonts/*',
              'res/{,*/}*.*',
              '!views/*'
            ]
          },
          {
            expand: true,
            cwd: '<%= config.tmp %>/images',
            dest: '<%= config.www %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= config.www %>'
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.www %>',
          dest: '<%= config.dist %>/public',
          src: '**/*'
        },{
          expand: true,
          dest: '<%= config.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.client %>/styles',
        dest: '<%= config.tmp %>/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      www: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.www %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.www %>/scripts/{,*/}*.js',
            '<%= config.www %>/styles/{,*/}*.css',
            '!<%= config.www %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      www: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    stylus: {
      compile: {
        options: {
          linenos: true,
          compress: false,
          'resolve url': true
        },
        files: {
          '<%= config.client %>/styles/main.css': '<%= config.client %>/stylus/main.styl' // 1:1 compile
        }
      }
    },

    uncss: {
      www: {
        options: {
          media: ['media screen and (max-width: 422px)', 'media (max-width: 767px) ']
        },
        files: {
          '<%= config.www %>/styles/main.css': ['<%= config.www %>/index.html', '<%= config.www %>/views/main.html',
            '<%= config.www %>/views/search.html']
        }
      }
    },

    notify: {
      js: {
        options: {
          title: 'JS Hint',  // optional
          message: 'JS files Linted: No errors'//required
        }
      },
      css: {
        options: {
          title: 'Styles Compilation',  // optional
          message: 'Stylus Compiled and prefixed'//required
        }
      },
      livereload: {
        options: {
          title: 'Build complete',  // optional
          message: 'build complete, server ready and watching for changes'//required
        }
      }
    },

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config'
      },
      // Environment targets
      local: {
        options: {
          dest: '<%= config.client %>/scripts/config.js'
        },
        constants: {
          ENV: {
            name: 'local',
            apiEndpoint: 'http://localhost:9000'
          }
        }
      },
      development: {
        options: {
          dest: '<%= config.client %>/scripts/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://your-development.api.endpoint:3000'
          }
        }
      },
      production: {
        options: {
          dest: '<%= config.client %>/scripts/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://easyparkapp.herokuapp.com'
          }
        }
      }
    }

  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', 'start the server and preview your app', function (target) {

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
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      //'connect:test'
//      'mocha'
    ]);
  });

  grunt.registerTask('buildweb', [
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
  ]);

  grunt.registerTask('cordova-prepare', 'Prepare the native application', function () {
    var done = this.async();

    if (cordovaConfig.platform === null) {
      // Build all platforms
      cordova.prepare(done);
    } else {
      cordova.prepare(cordovaConfig.platform, done);
    }
  });

  grunt.registerTask('cordova-build', 'Build the native application', function () {
    var done = this.async();

    if (cordovaConfig.platform === null) {
      // Build all platforms
      cordova.build(done);
    } else {
      cordova.build(cordovaConfig.platform, done);
    }
  });

  grunt.registerTask('cordova-emulate', 'Emulate the application', function () {
    var done = this.async();

    if (cordovaConfig.platform === null) {
      // Build all platforms
      cordova.emulate(done);
    } else {
      cordova.emulate(cordovaConfig.platform, done);
    }
  });

  grunt.registerTask('build', [
    'buildweb',
    'cordova-build'
  ]);

  grunt.registerTask('emulate', [
    'build',
    'cordova-emulate'
  ]);

  grunt.registerTask('cordova-run', 'Run the application on a device', function () {
    var done = this.async();

    if (cordovaConfig.platform === null) {
      // Build all platforms
      cordova.run(done);
    } else {
      cordova.run(cordovaConfig.platform, done);
    }
  });

  grunt.registerTask('run', [
    'build',
    'cordova-run'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
