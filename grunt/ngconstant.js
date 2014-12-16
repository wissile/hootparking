module.exports = {
  // Options for all targets
  options: {
    space: '  ',
    wrap: '"use strict";\n\n {%= __ngModule %}',
    name: 'config'
  },
  // Environment targets
  local: {
    options: {
      dest: '<%= config.client %>/scripts/config.js'
    },
    constants: {
      ENV: {
        name: 'local',
        apiEndpoint: 'http://localhost:9000'
      }
    }
  },
  development: {
    options: {
      dest: '<%= config.client %>/scripts/config.js'
    },
    constants: {
      ENV: {
        name: 'development',
        apiEndpoint: 'http://your-development.api.endpoint:3000'
      }
    }
  },
  production: {
    options: {
      dest: '<%= config.client %>/scripts/config.js'
    },
    constants: {
      ENV: {
        name: 'production',
        apiEndpoint: 'http://easyparkapp.herokuapp.com'
      }
    }
  }
};
