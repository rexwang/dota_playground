var elixir = require('laravel-elixir');

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

var lessPaths = [
  bowerDir + 'bootstrap/less',
  bowerDir + 'font-awesome/less',
  bowerDir + 'bootstrap-select/less'
];

elixir(function(mix) {
  mix

    // Compile the app.less file by using the paths provided
    // inside the lessPaths array and place the final compiled
    // CSS file ( app.css ) inside the L5App/public/css directory.
    .less('app.less', 'public/css', { paths: lessPaths })

    // Combine all the script files in vendor and save it
    // to public/js/vendor.js
    .scripts([
       'jquery/dist/jquery.min.js',
       'bootstrap/dist/js/bootstrap.min.js',
       'bootstrap-select/dist/js/bootstrap-select.min.js'
    ], 'public/js/vendor.js', bowerDir)

    // Combine all the app script files and save it
    // to public/js/all.js
    .scripts([
       'app.js',
       'test.js'
    ])

    .copy(bowerDir + 'font-awesome/fonts', 'public/fonts');
});
