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
    environment: {
        files: [{
            dot: true,
            src: [
                './www',
                './node_modules',
                './client/bower_components',
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
