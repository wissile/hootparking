module.exports = {
  options: {
    force: true
  },
  www: {
    files: [
      {
        dot: true,
        src: [
          '<%= config.tmp %>',
          '<%= config.www %>/*',
          '!<%= config.www %>/.git*'
        ]
      }
    ]
  },
  dist: {
    files: [{
      dot: true,
      src: [
        '<%= config.tmp %>',
        '<%= config.dist %>/*',
        '!<%= config.dist %>/.git*',
        '!<%= config.dist %>/.openshift',
        '!<%= config.dist %>/Procfile'
      ]
    }]
  },
  server: '<%= config.tmp %>'
};
