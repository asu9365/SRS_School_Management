<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $query = Attendance::with('student');
        
        if ($request->has('class_id')) {
            $query->where('class_id', $request->class_id);
        }
        if ($request->has('date')) {
            $query->where('date', $request->date);
        }
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'class_id' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|in:Present,Absent,Late,Half-Day',
            'remarks' => 'nullable|string'
        ]);

        $attendance = Attendance::updateOrCreate(
            ['user_id' => $validated['user_id'], 'date' => $validated['date']],
            $validated
        );

        return response()->json($attendance, 201);
    }

    public function show($id)
    {
        $attendance = Attendance::with('student')->findOrFail($id);
        return response()->json($attendance);
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:Present,Absent,Late,Half-Day',
            'remarks' => 'nullable|string'
        ]);

        $attendance->update($validated);
        return response()->json($attendance);
    }

    public function destroy($id)
    {
        Attendance::destroy($id);
        return response()->json(['message' => 'Attendance deleted successfully']);
    }
}
