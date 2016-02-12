/*global module, require */

/**
 * Intellij requires 'coverage' to be specified in
 * the preprocessors. For the main run, that includes
 * the 'karma-webpack.js' testing configuration
 * which dilutes the coverage numbers with the
 * dependencies.
 *
 * Adding this file so that IntelliJ can have 'coverage'
 * preprocessor while the main commandline can omit it.
 */


var main = require('./karma.conf');
module.exports = function (config) {
    "use strict";
    main(config);
    config.set({
        preprocessors: {
            'karma-webpack.js': ['webpack', 'sourcemap', 'coverage']
        },

        coverageReporter: {
            dir: 'build/coverage',
            subdir: function(browser) {
                return browser.toLowerCase().split(/ /)[0];
            },
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        }
    });
};
