<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mark;

class MarkController extends Controller
{
    public function index(Request $request)
    {
        $query = Mark::with(['assessment', 'student']);
        
        if ($request->has('assessment_id')) {
            $query->where('assessment_id', $request->assessment_id);
        }
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
            'user_id' => 'required|exists:users,id',
            'marks_obtained' => 'required|numeric|min:0',
            'teacher_feedback' => 'nullable|string'
        ]);

        $mark = Mark::updateOrCreate(
            ['assessment_id' => $validated['assessment_id'], 'user_id' => $validated['user_id']],
            $validated
        );

        return response()->json($mark, 201);
    }

    public function show($id)
    {
        $mark = Mark::with(['assessment', 'student'])->findOrFail($id);
        return response()->json($mark);
    }

    public function update(Request $request, $id)
    {
        $mark = Mark::findOrFail($id);
        
        $validated = $request->validate([
            'marks_obtained' => 'sometimes|required|numeric|min:0',
            'teacher_feedback' => 'nullable|string'
        ]);

        $mark->update($validated);
        return response()->json($mark);
    }

    public function destroy($id)
    {
        Mark::destroy($id);
        return response()->json(['message' => 'Mark deleted successfully']);
    }
}
