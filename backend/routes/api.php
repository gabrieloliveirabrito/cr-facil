<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


Route::get("/", [HomeController::class, 'index']);
Route::controller(AuthController::class)->prefix("auth")->middleware('auth:api')->group(function () {
    Route::get("/", 'validateToken');
    Route::get("/{provider}", 'redirectToProvider');
    Route::get("/{provider}/callback", 'handleCallback');
    Route::get("/{provider}/check", 'checkToken');
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });