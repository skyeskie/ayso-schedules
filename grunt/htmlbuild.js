/* global module, require */

function makeTarget(dest, srcView) {
    "use strict";
    var target = {
        src: "src/app.html",
        dest: dest,
        options: {
            beautify: true,
            relative: true,
            scripts: {
                bundle: [
                    "www/js/lib.js",
                    "www/js/ayso.js"
                ]
            },

            styles: {
                bundle: [
                    "www/css/lib.css",
                    "www/css/ayso.css"
                ]
            }
        }
    };

    if(srcView !== null) {
        target.options.sections = {
            views: srcView
        };
    }

    return target;
}

module.exports = function (grunt) {
    "use strict";

    var targets = {
        "prod": makeTarget("www/index.html", "src/views/*.html")
    };

    var path = require('path');
    var src = "src/views";
    var dest = "build/pages";

    grunt.file.expand({cwd: src}, "*.html").forEach(function(filename) {
        targets[filename] = makeTarget(
            path.join(dest, filename),
            path.join(src, filename)
        );
    });

    return targets;
};
