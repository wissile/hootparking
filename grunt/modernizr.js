module.exports = {
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
};
