/* global require, __dirname, process, ENV, PLATFORM */

var multiCfg = require('./cfg/webpack.configurations.js');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var environment = (typeof ENV !== 'undefined') ? ENV : 'development';
var platform = (typeof PLATFORM !== 'undefined') ? PLATFORM : 'browser';

function root(args) {
    "use strict";
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

process.argv.forEach(function(arg) {
    "use strict";
    if(arg === '--android') {
        platform = 'android';
    }
    if(arg === '--browser') {
        platform = 'browser';
    }
    if(arg === '--karma' || arg === '--test') {
        environment = 'test';
    }
    if(arg === '--devo' || arg === '--development') {
        environment = 'development';
    }
    if(arg === '--prod' || arg === '--production') {
        environment = 'production';
    }
});

var cfg = multiCfg(environment, platform);

module.exports = {
    metadata: cfg.metadata,
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
        extensions: ['', '.ts', '.js', '.html', '.css', '.scss', '.png'],
        cache: cfg.resolveCache
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/, /typings/] }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader', query: cfg.tsLoaderQuery },
            { test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/app.html'), root('node_modules')] },
            { test: /\.png$/, loader: 'file' },

            //Bootstrap
            { test: /\.css$/, loader: ExtractTextPlugin.extract([ 'css', 'postcss' ]) },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract([ 'css', 'postcss', 'sass' ]) },
            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' }
        ]
    },

    //Development settings
    stats: { colors: true, reasons: true },
    devtool: 'source-map',
    debug: true,

    plugins: cfg.plugins,

    tslint: {
        emitErrors: false,
        failOnHint: false
    },

    noParse: [
        /zone\.js\/dist\/.+/,
        /angular2\/bundles\/.+/
    ],

    devServer: {
        port: cfg.metadata.port,
        host: cfg.metadata.host,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    // we need this due to problems with es6-shim
    node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
