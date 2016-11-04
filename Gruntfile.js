module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-traceur");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-sync");
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-scss-lint');

    grunt.initConfig({
        traceur: {
            options: {
                blockBinding: true,
                annotations : true,
                modules     : "commonjs",
                debug       : true,
                sourceMaps  : true
            },
            prod   : {
                files: [
                    {
                        expand: true,
                        cwd   : "app/sources/ES6/",
                        src   : ["**/*.js"],
                        dest  : "app/js/",
                        ext   : ".js"
                    }
                ]
            }
        },
        watch  : {
            prod: {
                files: ["app/sources/ES6/**/*.js"],
                tasks: ["newer:traceur:prod"]
            },
            sync: {
                files: ["app/sources/**/*.html", "app/sources/**/*.json"],
                tasks: ["sync:main", "sync:test"]
            },
            sass: {
                files: ["app/sources/scss/**/*.scss"],
                tasks: ["sass:dist"]
            }
        },
        sass   : {
            dist: {
                files: [{
                    expand: true,
                    cwd   : "app/sources/scss/",
                    src   : ["*.scss"],
                    dest  : "css/",
                    ext   : ".css"
                }]
            }
        },
        sync   : {
            main: {
                files  : [{
                    cwd : "app/sources/ES6/",
                    src : [
                        "**/*.html", /* Include only html files */
                        "**/*.json" /* and JSON files */
                    ],
                    dest: "app/js/"
                }],
                verbose: true // Display log messages when copying files
            },
            test: {
                files  : [{
                    cwd : "app/sources/test/",
                    src : [
                        "**/*.html", /* Include only html files */
                        "**/*.json" /* and JSON files */
                    ],
                    dest: "test/"
                }],
                verbose: true // Display log messages when copying files
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            js: ['app/sources/ES6/**/*.js']

        },
        scsslint: {
            allFiles: [
                'app/sources/**/*.scss'
            ],
            options: {
                colorizeOutput: true,
                maxBuffer: 1000 * 1024,
                config: '.scss-lint.yml'
            }
        }
    });
    grunt.registerTask("default", ["newer:sass", "newer:traceur", "sync", "watch"]);
};

