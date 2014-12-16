module.exports = {
  options: {
    jshintrc: '<%= config.client %>/.jshintrc',
    reporter: require('jshint-stylish')
  },
  server: {
    options: {
      jshintrc: '<%= config.server %>/.jshintrc'
    },
    src: [
      '<%= config.server %>/**/*.js',
      '!<%= config.server %>/**/*.spec.js'
    ]
  },
  serverTest: {
    options: {
      jshintrc: '<%= config.server %>/.jshintrc-spec'
    },
    src: ['<%= config.server %>/**/*.spec.js']
  },
  all: [
    'Gruntfile.js',
    '<%= config.client %>/**/*.js',
    '!<%= config.client %>/scripts/config.js',
    '!<%= config.client %>/**/*.spec.js',
    '!<%= config.client %>/**/*.mock.js',
    '!<%= config.client %>/bower_components/**/*.js'
  ],
  test: {
    src: [
      '<%= config.client %>/**/*.spec.js',
      '<%= config.client %>/**/*.mock.js'
    ]
  }
};
