module.exports = {
  www: {
    options: {
      media: ['media screen and (max-width: 422px)', 'media (max-width: 767px) ']
    },
    files: {
      '<%= config.www %>/styles/main.css': ['<%= config.www %>/index.html', '<%= config.www %>/views/main.html',
        '<%= config.www %>/views/search.html']
    }
  }
};
