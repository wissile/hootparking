module.exports = {
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
};
