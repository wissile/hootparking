module.exports = {
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
};
