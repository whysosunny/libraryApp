var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsFiles = ['*.js', 'src/**/*.js'];
var nodemon = require('gulp-nodemon');

gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter('jscs-stylish', {
            verbose: true
        }));
});

//Wiredep means wire dependencies bro! XD

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;

    var gulpInject = require('gulp-inject');

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var injectSource = gulp.src(['public/css/*.css',
                                'public/js/*.js'], {read: false});

    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(gulpInject(injectSource, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve',['style','inject'], function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env : {
            'PORT' : 3000
        },
        watch: jsFiles
    };

    return nodemon(options).on('restart', function() {
        console.log('Restarting...');
    });
});