// Karma configuration
// Generated on Tue Apr 16 2013 10:04:20 GMT+1200 (NZST)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    '${karma.common_javascript}/common/js/base/jquery-1.9.1.min.js',
    '${karma.common_javascript}/common/js/**/*.js',
    '${karma.common_angular}/angular/uoa/*.js',
    '${karma.common_angular}/angular/uoa/**/*.js',
    '${karma.common_angular_tests}/angular/angular-mocks.js',
    '${karma.common_angular_tests}/angular/directive-test.js',

    // load shared resources
    '../src/main/webapp/angular/shared/*.js',
    '../src/main/webapp/angular/shared/**/*.js',

    // load apps
    '../src/main/webapp/angular/search/app.js',
    '../src/main/webapp/angular/admin/app.js',
    '../src/main/webapp/angular/editors/app.js',

    // load all related javascript apps files
    '../src/main/webapp/angular/search/**/*.js',
    '../src/main/webapp/angular/admin/**/*.js',
    '../src/main/webapp/angular/editors/**/*.js',


    // load all tests
    '../src/test/js/angular/shared/**/*.js',
    '../src/test/js/angular/search/**/*.js',
    '../src/test/js/angular/admin/**/*.js',
    '../src/test/js/angular/editors/**/*.js'
];


// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;
