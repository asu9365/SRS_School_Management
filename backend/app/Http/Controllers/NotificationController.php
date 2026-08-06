<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    public function store(Request $request)
    {
        // Internal/admin use
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string',
            'data' => 'required|array',
        ]);

        $notification = Notification::create($validated);

        return response()->json([
            'success' => true,
            'data' => $notification
        ], 201);
    }
    
    public function markAsRead(Request $request, Notification $notification)
    {
        if ($notification->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }
        
        $notification->update(['read_at' => now()]);
        
        return response()->json([
            'success' => true,
            'data' => $notification
        ]);
    }
}
