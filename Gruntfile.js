'use strict';

module.exports = function(grunt){
    // Time how long taks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

    //Define the configuration for all the taks
    grunt.initConfig({
        less:{
            development:{
                files:{
                    "css/style.css": "css/styles.less" //destination file and source file
                }
            }
        },
        watch:{
            files: 'css/*.less',
            tasks:['less']
        },
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options:{
                    watchTask: true,
                    server:{
                        baseDir:"./"
                    }
                }
            }
        }
    });

    grunt.registerTask('css', ['less']);
    grunt.registerTask('default',['browserSync', 'watch']);
};