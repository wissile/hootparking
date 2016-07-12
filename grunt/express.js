module.exports = {
  options: {
    port: process.env.PORT || 9000
  },
  dev: {
    options: {
      script: '<%= config.server %>/app.js',
      debug: true
    }
  },
  prod: {
    options: {
      script: '<%= config.dist %>/server/app.js'
    }
  }
};
