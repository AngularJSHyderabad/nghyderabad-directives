'use strict';

module.exports = {
    build: {
        files: [
            { '.build/index.html': 'src/index.html',
              '.build/json/tumblr-feeds.json': 'src/json/tumblr-feeds.json'
            }
        ]
    },
    temptobuild: {
        files: [
            {
                cwd     : '.tmp/concat/',
                src     : '**/*',
                dest    : '.build/',
                flatten : false,
                expand  : true
            }
        ]
    },
    templates: {
        files: [
            {
                cwd     : 'src/tpl/',
                src     : '**/*.html',
                dest    : '.build/tpl/',
                flatten : false,
                expand  : true
            }
        ]
    },
    images: {
        files: [
            {
                cwd     : 'src/img/dest/',
                src     : '**/*',
                dest    : '.build/img/',
                flatten : false,
                expand  : true
            }
        ]
    }
};