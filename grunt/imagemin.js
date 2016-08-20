module.exports = {
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
};
