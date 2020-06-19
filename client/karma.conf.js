//@ts-nocheck
module.exports = function(config) {
  config.set({
    
    basePath: './',
    frameworks: ['jasmine'],

    files: [
      { pattern: 'spec/**/*.spec.js', type:'module' },
      { pattern: 'src/**/*.js', type:'module', included: false},
      { pattern: 'spec/**/*.moc.js', type:'module', included: false},
      { pattern: 'node_modules/**/*.js', type:'module', included:false}
    ],

    preprocessors: {
      'src/**/*.js': ['coverage']
    },

    coverageReporter: {
      dir: 'coverage',
      includeAllSources: true,
      reporters: [
          { type: 'html' },
          { type: 'json', file: 'coverage.json' },
      ],
    },

    plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-spec-reporter'),
        require('karma-jasmine-html-reporter'),
        require("karma-coverage")
    ],
    
    reporters: ['spec','kjhtml', 'coverage'],

    port: 9876,

    colors: true,
    
    logLevel: config.LOG_DISABLE,

    autoWatch: true,

    browsers: ['Chrome'],

    client: {
       clearContext: false
    },
    
    singleRun: false,

    concurrency: Infinity,
  })
}