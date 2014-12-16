module.exports = {
  html: '<%= config.client %>/index.html',
  options: {
    dest: '<%= config.www %>',
    flow: {
      html: {
        steps: {
          js: ['concat', 'uglifyjs'],
          css: ['cssmin']
        },
        post: {}
      }
    }
  }
};
