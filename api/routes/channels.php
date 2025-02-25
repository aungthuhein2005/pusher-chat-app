<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{receiver_id}', function ($user, $receiver_id) {
    return (int) $user->id === (int) $receiver_id;
},['guards' => ['web', 'sanctum']]);

Broadcast::channel('role.{role}', function ($user, $role) {
    return $user->role === $role;
},['guards' => ['web', 'sanctum']]);