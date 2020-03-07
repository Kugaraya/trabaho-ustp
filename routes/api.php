<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {

    return $request->user();
});

Route::apiResources(['admin' => 'API\AdminController']);
Route::get('profile','API\AdminController@profile');
Route::put('profile','API\AdminController@updateProfile');

Route::apiResources(['worker' => 'API\WorkersController']);
Route::post('login', 'API\WorkersController@login');
Route::post('register', 'API\WorkersController@register');
Route::get('logout', 'API\WorkersController@logout')->middleware('auth:api');
Route::post('dummy', 'API\WorkersController@dummy'); 




