/* global require, __dirname, process */

var path = require('path');
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var node_modules_dir = path.join(__dirname, 'node_modules');
var app_dir          = path.join(__dirname, 'src');
var test_dr          = path.join(__dirname, 'test');

// Helper functions
function root(args) {
    "use strict";
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

var metadata = {
    title: 'Ayso KS',
    description: 'Scheduling app for Wichita-area AYSO regions',
    //Dev server settings
    host: 'localhost',
    port: '1080'
};

var plugins = {
    testProvide: new ProvidePlugin({
        '__metadata': 'ts-helper/metadata',
        '__decorate': 'ts-helper/decorate',
        '__awaiter': 'ts-helper/awaiter',
        '__extends': 'ts-helper/extends',
        '__param': 'ts-helper/param',
        'Reflect': 'es7-reflect-metadata/dist/browser',

        '__phantomjs': 'phantomjs-polyfill',
        '__es6promise': 'es6-promise',
        '__es6shim': 'es6-shim',
        //
        '__zoneMicro': 'zone.js/lib/browser/zone-microtask.js',
        '__zoneStack': 'zone.js/lib/browser/long-stack-trace-zone.js',
        '__zoneJasmine': 'zone.js/dist/jasmine-patch.js',
        'ng2testing':'angular2/testing',
        'ng2browser': 'angular2/platform/testing/browser'
    }),

    defaultProvide: new ProvidePlugin({
        '__metadata': 'ts-helper/metadata',
        '__decorate': 'ts-helper/decorate',
        '__awaiter': 'ts-helper/awaiter',
        '__extends': 'ts-helper/extends',
        '__param': 'ts-helper/param',
        'jQuery': 'jquery',
        'Zone.longStackTraceZone': 'zone.js/lib/zones/long-stack-trace.js',
        'Error.stackTraceLimit': Infinity
        //'Reflect': 'es7-reflect-metadata/dist/browser'
    }),

    copy: new CopyWebpackPlugin([
        { from: 'src/img', to: 'img' },
        { from: 'res/img', to: 'img' },
        { from: 'test/data-2016-02-08.json', to: 'data.json' }
    ]),

    copyIcons: new CopyWebpackPlugin([
        { from: 'icons', to: 'icons' }
    ]),

    ordering: new webpack.optimize.OccurenceOrderPlugin(true),

    commons:  new webpack.optimize.CommonsChunkPlugin({
        names: 'lib',
        filename: 'lib.wp.js',
        minChunks: function(module, count) {
            "use strict";
            return module.resource && module.resource.indexOf(app_dir) === -1;
        }
    }),

    extractCss: new ExtractTextPlugin('style.css'),

    htmlTemplate: new HtmlWebpackPlugin({
        template: 'src/app.html',
        title: metadata.title,
        inject: true
    }),

    noErr: new webpack.NoErrorsPlugin(),

    cordovaAndroid: new CordovaPlugin({
        config: 'config.xml',
        src: 'index.html',
        platform: 'android',
        version: 'true'
    }),

    uglify: new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: false,
        compress : { screw_ie8 : true},
        comments: false
    })
};

var cfg = {
    test: { //Karma, ENV
        devtool: 'cheap-module-inline-sourcemap',
        debug: false,
        resolveCache: false,
        tsLoaderQuery: {
            // remove TypeScript helpers to be injected below by DefinePlugin
            'compilerOptions': {
                'removeComments': true,
                'noEmitHelpers': true
            }
        },
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: root('src'),
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /\.e2e\.ts$/,
                    /node_modules/
                ]
            }
        ],
        plugins: [
            plugins.testProvide, plugins.copy, plugins.noErr
        ]
    },

    development: { //ENV
        devtool: 'inline-source-map',
        debug: false,
        plugins: [
            plugins.ordering, plugins.commons, plugins.extractCss, plugins.copy,
            plugins.htmlTemplate, plugins.defaultProvide, plugins.noErr
        ]
    },

    production: { //ENV
        devtool: 'source-map',
        debug: false,
        plugins: [
            plugins.ordering, plugins.commons, plugins.extractCss, plugins.copy,
            plugins.htmlTemplate, plugins.defaultProvide, plugins.noErr,
            plugins.uglify
        ]
    },

    browser: { //PLATFORM
        baseUrl: '/',
        includeCordova: false,
        plugins: []
    },

    android: { //PLATFORM
        baseUrl: 'file:///android_asset/www/',
        includeCordova: true,
        plugins: [
            plugins.cordovaAndroid, plugins.copyIcons
        ]
    }
};

module.exports = function(env, target) {
    "use strict";

    console.log('Running webpack for ' + env + ' and ' + target);

    var definePlugin = new webpack.DefinePlugin({
        'process.env': {
            'ENV': JSON.stringify(metadata.ENV),
            'NODE_ENV': JSON.stringify(metadata.ENV),
            'TARGET': JSON.stringify(target),
            'BASE_URL': JSON.stringify(cfg[target].baseUrl),
            'CORDOVA': JSON.stringify(cfg[target].includeCordova)
        }
    });

    metadata.baseUrl = cfg[target].baseUrl;
    metadata.includeCordova = cfg[target].includeCordova;
    metadata.ENV = env;

    var cfgPlugins = [definePlugin];

    cfg[env].plugins.forEach(function(plugin) { cfgPlugins.push(plugin); });
    cfg[target].plugins.forEach(function(plugin) { cfgPlugins.push(plugin); });

    return {
        root: root,
        devtool: cfg[env].devtool,
        debug: cfg[env].debug,
        resolveCache: cfg[env].resolveCache,
        tsLoaderQuery: cfg[env].tsLoaderQuery,
        postLoaders: cfg[env].postLoaders,
        metadata: metadata,
        plugins: cfgPlugins
    };
};
