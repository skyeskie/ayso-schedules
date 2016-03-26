/* global require, exports, process, __dirname */

var path = require('path');
var zlib = require('zlib');


// Helper functions

var _root = path.resolve(__dirname, '..');

console.log('root directory:', root());

function hasProcessFlag(flag) {
    "use strict";
    return process.argv.join('').indexOf(flag) > -1;
}

function gzipMaxLevel(buffer, callback) {
    "use strict";
    return zlib['gzip'](buffer, {level: 9}, callback);
}

function root(args) {
    "use strict";
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function rootNode(args) {
    "use strict";
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

function prependExt(extensions, args) {
    "use strict";
    args = args || [];
    if (!Array.isArray(args)) { args = [args] }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val;
        }));
    }, ['']);
}

exports.hasProcessFlag = hasProcessFlag;
exports.gzipMaxLevel = gzipMaxLevel;
exports.root = root;
exports.rootNode = rootNode;
exports.prependExt = prependExt;
exports.prepend = prependExt;
