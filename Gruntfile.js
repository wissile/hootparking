// Generated on 2014-09-03 using
// generator-webapp 0.5.0
'use strict';
var cordova = require('cordova');

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

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // Configurable paths
  var config = {
    app: require('./bower.json').appPath || 'app',
    dist: 'www'
  };

  // Define the configuration for all the tasks
  var cordovaConfig = {
    platform: grunt.option('platform')
  };

  grunt.initConfig({

    // Project settings
    config: config,
    yeoman: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      cordova: {
        files: [
          '<%= yeoman.app %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['copy:auto', 'cordova-prepare']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
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
        files: ['<%= yeoman.app %>/styles/{,*/}*.css', '<%= yeoman.app %>/stylus/{,*/}*.styl'],
        tasks: ['stylus', 'newer:copy:styles', 'autoprefixer', 'notify:css']
      },
      livereload: {
        files: [
          '{.tmp,<%= yeoman.app %>}/**/*.css',
          '{.tmp,<%= yeoman.app %>}/**/*.html',
          '{.tmp,<%= yeoman.app %>}/**/*.js',
          '!{.tmp,<%= yeoman.app %>}/**/*.spec.js',
          '!{.tmp,<%= yeoman.app %>}/**/*.mock.js',
          '<%= yeoman.app %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        },
        tasks: ['notify:livereload']
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    // The actual grunt server settings
    connect: {
      server: {
        proxies: [
          {
            context: '/sfpark',
            host: 'api.sfpark.org',
            port: 80,
            https: false,
            changeOrigin: true
          }
        ]
      },
      options: {
        port: 9001,
        open: true,
        livereload: 35728,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app),
              proxySnippet
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        proxies: [
          {
            context: '/sfpark',
            host: 'api.sfpark.org',
            port: 80,
            https: false,
            changeOrigin: true
          }
        ],
        options: {
          open: true,
          base: '<%= config.dist %>',
          middleware: function (connect) {
            return [
              connect.static(config.dist),
              proxySnippet
            ];
          }
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {
        force: true
      },
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= config.dist %>/*',
              '!<%= config.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        globals: {
          google: true
        }
      },

      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    //TODO remove if not going to be used
    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },

    // Automatically inject Bower components into the HTML file
//    wiredep: {
//      app: {
//        ignorePath: /^\/|\.\.\//,
//        src: ['<%= config.app %>/index.html'],
//        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
//      }
//    },
//    wiredep: {
//      options: {
//        cwd: '<%= yeoman.app %>'
//      },
//      app: {
//        src: ['<%= yeoman.app %>/index.html'],
//        ignorePath: /\.\.\//
//      }
//    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/',
        exclude: []
      }
    },

    //TODO remove if not used
    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
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
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: ['*.html', 'views/{,*/}*.html'],
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: '*.js',
            dest: '.tmp/concat/scripts'
          }
        ]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      auto: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '{,*/}*.*'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              '*.{ico,png,txt,xml}',
              'images/{,*/}*.webp',
              '{,*/}*.html',
              'styles/fonts/{,*/}*.*',
              'fonts/*'
            ]
          },
          {
            src: 'node_modules/apache-server-configs/dist/.htaccess',
            dest: '<%= config.dist %>/.htaccess'
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          }
        ]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
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
      dist: [
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

    stylus: {
      compile: {
        options: {
          linenos: true,
          compress: false,
          'resolve url': true
        },
        files: {
          'app/styles/main.css': 'app/stylus/main.styl' // 1:1 compile
        }
      }
    },

    uncss: {
      dist: {
        options: {
          media: ['media screen and (max-width: 422px)', 'media (max-width: 767px) ']
        },
        files: {
          '<%= yeoman.dist %>/styles/main.css': ['<%= yeoman.dist %>/index.html', '<%= yeoman.dist %>/views/main.html',
            '<%= yeoman.dist %>/views/search.html']
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

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
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

    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:dev', 'wait', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
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
      'connect:test'
//      'mocha'
    ]);
  });

  grunt.registerTask('buildweb', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'stylus',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
//    'modernizr',
    'usemin',
    'htmlmin'
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
