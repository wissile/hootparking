module.exports = {
  options: {
    // This should be the name of your apps angular module
    module: 'easyparkangularApp',
    htmlmin: {
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
    usemin: 'scripts/scripts.js'
  },
  main: {
    cwd: '<%= config.client %>',
    src: ['views/{,*/}*.html'],
    dest: '<%= config.tmp %>/templates.js'
  }
};
