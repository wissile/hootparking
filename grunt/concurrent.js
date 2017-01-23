module.exports = {
  server: [
    'copy:styles'
  ],
  test: [
    'copy:styles'
  ],
  debug: {
    tasks: [
      'nodemon',
      'node-inspector'
    ],
    options: {
      logConcurrentOutput: true
    }
  },
  www: [
    'copy:styles',
    'imagemin',
    'svgmin'
  ]
};
