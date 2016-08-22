module.exports = {
  compile: {
    options: {
      linenos: true,
      compress: false,
      'resolve url': true
    },
    files: {
      '<%= config.client %>/styles/main.css': '<%= config.client %>/stylus/main.styl' // 1:1 compile
    }
  }
};
