module.exports = {
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
};
