module.exports = {
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
};
