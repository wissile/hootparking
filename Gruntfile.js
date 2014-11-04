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

  // Configurable paths
  var config = {
    client: require('./bower.json').appPath || 'client',
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

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      cordova: {
        files: [
          '<%= config.client %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= config.client %>}/scripts/{,*/}*.js',
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
          '{.tmp,<%= config.client %>}/**/*.css',
          '{.tmp,<%= config.client %>}/**/*.html',
          '{.tmp,<%= config.client %>}/**/*.js',
          '!{.tmp,<%= config.client %>}/**/*.spec.js',
          '!{.tmp,<%= config.client %>}/**/*.mock.js',
          '<%= config.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
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
              '.tmp',
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
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*',
            '!<%= config.dist %>/.openshift',
            '!<%= config.dist %>/Procfile'
          ]
        }]
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
          '<%= config.client %>/scripts/{,*/}*.js'
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
    //mocha: {
    //  all: {
    //    options: {
    //      run: true,
    //      urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
    //    }
    //  }
    //},

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      www: {
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
//        src: ['<%= config.client %>/index.html'],
//        exclude: ['bower_components/bootstrap/www/js/bootstrap.js']
//      }
//    },
//    wiredep: {
//      options: {
//        cwd: '<%= config.client %>'
//      },
//      app: {
//        src: ['<%= config.client %>/index.html'],
//        ignorePath: /\.\.\//
//      }
//    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= config.client %>/index.html',
        ignorePath: '<%= config.client %>/',
        exclude: []
      }
    },

    //TODO remove if not used
    // Renames files for browser caching purposes
    rev: {
      www: {
        files: {
          src: [
            '<%= config.www %>/scripts/{,*/}*.js',
            '<%= config.www %>/styles/{,*/}*.css',
            '<%= config.www %>/images/{,*/}*.*',
            '<%= config.www %>/styles/fonts/{,*/}*.*',
            '<%= config.www %>/*.{ico,png}'
          ]
        }
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
      options: {
        assetsDirs: ['<%= config.www %>', '<%= config.www %>/images']
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

    htmlmin: {
      www: {
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
            cwd: '<%= config.www %>',
            src: ['*.html', 'views/{,*/}*.html'],
            dest: '<%= config.www %>'
          }
        ]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   www: {
    //     files: {
    //       '<%= config.www %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.client %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   www: {
    //     files: {
    //       '<%= config.www %>/scripts/scripts.js': [
    //         '<%= config.www %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   www: {}
    // },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      www: {
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
              'fonts/*'
            ]
          },
          {
            src: 'node_modules/apache-server-configs/dist/.htaccess',
            dest: '<%= config.www %>/.htaccess'
          },
          {
            expand: true,
            cwd: '.tmp/images',
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
        dest: '.tmp/styles/',
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

    stylus: {
      compile: {
        options: {
          linenos: true,
          compress: false,
          'resolve url': true
        },
        files: {
          'client/styles/main.css': 'client/stylus/main.styl' // 1:1 compile
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

    if (target === 'www') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:dev', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'dist') {
      return grunt.task.run(['build', 'clean:dist', 'copy:dist', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
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
    'clean:www',
    'wiredep',
    'useminPrepare',
    'concurrent:www',
    'stylus',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:www',
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
