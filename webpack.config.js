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
            './src/app/lib.ts',
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
            { test: /\.ts$/, loader: 'ts-loader', query: cfg.tsLoaderQuery, exclude: [ root('node_modules')] },
            { test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/app.html'), root('node_modules')] },
            { test: /\.png$/, loader: 'file' },
            { test: /\.svg$/, loades: ['file-loader', 'svgo-loader?useConfig=svgoConfig' ]},

            //Bootstrap
            { test: /\.css$/, loader: ExtractTextPlugin.extract([ 'css', 'postcss' ]) },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract([ 'css', 'postcss', 'sass' ]) },
            { test: /\.(woff2?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=./fonts/[name]-[hash:6].[ext]' }
        ],
        // A RegExp or an array of RegExps. Don’t parse files matching.
        // With noParse you can exclude big libraries from parsing, but this can break stuff.
        //
        // See: http://webpack.github.io/docs/configuration.html#module-noparse
        noParse: [
            root('zone.js', 'dist'),
            root('angular2', 'bundles')
        ]
    },

    svgoConfig: {
        plugins: [
            { removeTitle: true },
            { convertColors: { shorthex: true }},
            { convertPathData: false }
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
