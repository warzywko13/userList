<?php

use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(UsersController::class)->group(function() {
    Route::post('/add_edit', 'add_edit_user');
    Route::post('/delete', 'delete_user');
    Route::get('/list', 'list_users');
    Route::get('/user', 'get_user');
});
