/* global module, require */

function makeTarget(srcView, dest) {
    "use strict";
    return {
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
            },

            sections: {
                views: srcView
            }
        }
    };
}

module.exports = function (grunt) {
    "use strict";

    var targets = {
        "prod": makeTarget("src/views/*.html", "www/index.html")
    };

    var path = require('path');
    var src = "src/views";
    var dest = "www/views";

    grunt.file.expand({cwd: src}, "*.html").forEach(function(filename) {
        targets[filename] = makeTarget(
            path.join(src, filename),
            path.join(dest, filename)
        );
    });

    return targets;
};
