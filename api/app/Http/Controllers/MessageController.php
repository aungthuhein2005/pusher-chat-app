<?php
namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'role' => $request->role,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }

    public function fetchMessages(Request $request)
    {
        return Message::where(function($query) use ($request) {
            $query->where('sender_id', $request->receiver_id)
                  ->where('receiver_id', auth()->id());
        })->orWhere(function($query) use ($request) {
            $query->where('sender_id', auth()->id())
                  ->where('receiver_id', $request->receiver_id);
        })
        ->with('sender', 'receiver')
        ->get();
    }
}
