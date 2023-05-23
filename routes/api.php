<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PatentController;
use App\Http\Controllers\Api\EmailController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/user/test', [UserController::class, 'test']);
    Route::put('/user/verify', [UserController::class, 'verifyUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users/create', [UserController::class, 'store']);
    Route::put('/users/{user}/update', [UserController::class, 'update']);
    Route::put('/users/{user}/update/admin', [UserController::class, 'updateAdminStatus']);
    Route::delete('/users/{user}/delete', [UserController::class, 'destroy']);


    Route::get('/patents', [PatentController::class, 'index']);
    Route::post('/patents', [PatentController::class, 'store']);
    Route::get('/patents/{patent_number}', [PatentController::class, 'showByPatentNumber']);
    Route::put('/patents/{patent_number}', [PatentController::class, 'update']);
    Route::delete('/patents/{patent_number}', [PatentController::class, 'destroy']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
