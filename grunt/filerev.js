module.exports = {
  dist: {
    src: [
      '<%= config.www %>/scripts/{,*/}*.js',
      '<%= config.www %>/styles/{,*/}*.css',
      '<%= config.www %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      '<%= config.www %>/styles/fonts/*'
    ]
  }
};
