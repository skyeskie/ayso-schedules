/* global require, __dirname, process */

var path = require('path');
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

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
    baseUrl: '/',
    description: 'Scheduling app for Wichita-area AYSO regions',
    ENV: ENV,
    //Dev server settings
    host: 'localhost',
    port: '1080'
};

module.exports = {
    metadata: metadata,
    entry: {
        main: [
            //Libraries. Commons chunk will export to lib
            'es6-shim',
            'es6-promise',
            'zone.js/lib/browser/zone-microtask',
            'es7-reflect-metadata/dist/browser',
            'bootstrap-loader',
            //Main app
            './src/app/boot.ts'
        ],
        styling: './src/scss/styles.scss'
    },
    output: {
        path: root('build'),
        filename: '[name].wp.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.html', '.css', '.scss', '.png']
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/, /typings/] }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.html$/,  loader: 'raw-loader' },
            { test: /\.png$/, loader: 'file' },

            //Bootstrap
            { test: /\.css$/, loaders: [ 'style', 'css', 'postcss' ] },
            { test: /\.scss$/, loaders: [ 'style', 'css', 'postcss', 'sass' ] },
            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' }
        ]
    },

    //Development settings
    stats: { colors: true, reasons: true },
    devtool: 'source-map',
    debug: true,

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'lib',
            filename: 'lib.wp.js',
            minChunks: function(module, count) {
                "use strict";
                return module.resource && module.resource.indexOf(app_dir) === -1;
            }}),
        new CopyWebpackPlugin([
            { from: 'src/img', to: 'img' },
            { from: 'test/data-2016-02-08.json', to: 'data.json' }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/app.html',
            title: metadata.title,
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),
        new ProvidePlugin({
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
        //new webpack.optimize.UglifyJsPlugin({
        //    beautify: false,
        //    mangle: false,
        //    compress : { screw_ie8 : true},
        //    comments: false
        //}),
        new webpack.NoErrorsPlugin(),
        new CordovaPlugin({
            config: 'config.xml',
            src: 'index.html',
            platform: 'android',
            version: 'true'
        })
        //Possible include:
        //var WebpackNotifierPlugin = require('webpack-notifier');
    ],

    tslint: {
        emitErrors: false,
        failOnHint: false
    },

    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    // we need this due to problems with es6-shim
    node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
