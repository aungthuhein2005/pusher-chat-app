<?php

use App\Events\MessageSent;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users', function(){
    return User::where('id', '!=', auth()->id())->get();
})->middleware("auth:sanctum");

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/send-message', [MessageController::class, 'sendMessage'])->middleware("auth:sanctum");
Route::get('/fetch-messages', [MessageController::class, 'fetchMessages'])->middleware("auth:sanctum"); 

Route::get('/test', function(){
    $message = New \App\Models\Message();
    $message->sender_id = 1;
    $message->receiver_id = 1;
    $message->message = 'Hello World';
    $message->save();
    broadcast(new MessageSent($message));
    return response()->json(['message' => 'Message Sent','data' => $message]);
});

