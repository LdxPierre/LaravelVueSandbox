<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\ContextAddUser;
use App\Http\Controllers\TestController;
use Illuminate\Http\JsonResponse;

Route::get('/test', [TestController::class, 'hello']);

/**
 * Authenticate
 */
Route::middleware(['auth:sanctum', ContextAddUser::class])->group(function () {
    Route::get('/user', function (Request $request) {
        return new JsonResponse($request->user());
    });
});
