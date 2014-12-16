module.exports = {
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
};
