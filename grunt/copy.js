module.exports = {
  auto: {
    files: [
      {
        expand: true,
        dot: true,
        cwd: '<%= config.client %>',
        dest: '<%= config.www %>',
        src: [
          '{,*/}*.*'
        ]
      }
    ]
  },
  www: {
    files: [
      {
        expand: true,
        dot: true,
        cwd: '<%= config.client %>',
        dest: '<%= config.www %>',
        src: [
          '*.{ico,png,txt,xml}',
          'images/{,*/}*.webp',
          '{,*/}*.html',
          'styles/fonts/{,*/}*.*',
          'fonts/*',
          'res/{,*/}*.*',
          '!views/*'
        ]
      },
      {
        expand: true,
        cwd: '<%= config.tmp %>/images',
        dest: '<%= config.www %>/images',
        src: ['generated/*']
      },
      {
        expand: true,
        dot: true,
        cwd: 'bower_components/bootstrap/dist',
        src: 'fonts/*',
        dest: '<%= config.www %>'
      }
    ]
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.www %>',
      dest: '<%= config.dist %>/public',
      src: '**/*'
    },{
      expand: true,
      dest: '<%= config.dist %>',
      src: [
        'package.json',
        'server/**/*'
      ]
    }]
  },
  styles: {
    expand: true,
    dot: true,
    cwd: '<%= config.client %>/styles',
    dest: '<%= config.tmp %>/styles/',
    src: '{,*/}*.css'
  }
};
