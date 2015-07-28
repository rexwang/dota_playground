<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/hello', function() {
    return 'hello world';
});

// Route::get('user/{id?}', function ($id = null) {
//     return 'User '.$id;
// });

Route::get('user/{name}', function($name) {
    return $name;
})
->where('name', '[A-Za-z]+');

Route::resource('api/teams', 'TeamsController');
