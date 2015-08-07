var gulp = require('gulp');
var elixir = require('laravel-elixir');
var templateCache = require('gulp-angular-templatecache');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var bowerDir = './resources/assets/vendor/';
var templatesDir = './resources/views/templates/**/*.html';

var lessPaths = [
  bowerDir + 'bootstrap/less',
  bowerDir + 'font-awesome/less'
];

gulp.task('template', function () {
  return gulp.src(templatesDir)
    .pipe(templateCache())
    .pipe(gulp.dest('public/js'));
});


elixir(function(mix) {
  mix

    // Compile the app.less file by using the paths provided
    // inside the lessPaths array and place the final compiled
    // CSS file ( app.css ) inside the L5App/public/css directory.
    .less('app.less', 'public/css', { paths: lessPaths })

    .styles([
        'metisMenu/dist/metisMenu.min.css',
        'startbootstrap-sb-admin-2/dist/css/sb-admin-2.css',
        'datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css',
        'datatables-responsive/css/dataTables.responsive.css'
    ], 'public/css/theme.css', bowerDir)

    .scripts([
       'metisMenu/dist/metisMenu.min.js',
       'startbootstrap-sb-admin-2/dist/js/sb-admin-2.js',
       'datatables/media/js/jquery.dataTables.min.js',
       'datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js'
    ], 'public/js/theme.js', bowerDir)

    // Combine all the script files in vendor and save it
    // to public/js/vendor.js
    .scripts([
       'jquery/dist/jquery.min.js',
       'bootstrap/dist/js/bootstrap.min.js',
       'bootstrap-select/dist/js/bootstrap-select.min.js',
       'angular/angular.min.js',
       'ui-router/release/angular-ui-router.min.js',
       'angular-resource/angular-resource.min.js',
    ], 'public/js/vendor.js', bowerDir)

    // Combine all the app script files and save it
    // to public/js/all.js
    .scripts([
       'app.js',
       'directives/*.js',
       'services/*.js'
    ], 'public/js/app.js')

    .copy(bowerDir + 'font-awesome/fonts', 'public/fonts')

    .task('template', templatesDir)

    .phpUnit();
});
