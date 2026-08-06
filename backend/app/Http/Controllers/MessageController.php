<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        // Fetch conversations (messages where user is sender or receiver)
        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content']
        ]);

        broadcast(new \App\Events\MessageSent($message));

        return response()->json([
            'success' => true,
            'data' => $message->load(['sender', 'receiver'])
        ], 201);
    }
}
