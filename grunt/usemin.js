module.exports = {
  html: ['<%= config.www %>/{,*/}*.html'],
  css: ['<%= config.www %>/styles/{,*/}*.css'],
  js: ['<%= config.www %>/scripts/{,*/}*.js'],
  options: {
    assetsDirs: ['<%= config.www %>', '<%= config.www %>/images'],
    // This is so we update image references in our ng-templates
    patterns: {
      js: [
        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
      ]
    }
  }
};
