module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            'app/assets/javascripts/angular.js',
            'tests/angular-mocks.js',
            'app/assets/javascripts/app/**/*.js',
            'tests/*.spec.js'
        ],
        exclude: [],
        plugins: [
            require("karma-chrome-launcher"),
            require("karma-jasmine"),
            require("karma-spec-reporter")
        ],
        preprocessors: {},
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
}
