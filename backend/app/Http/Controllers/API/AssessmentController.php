<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Assessment;

class AssessmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Assessment::query();
        
        if ($request->has('class_id')) {
            $query->where('class_id', $request->class_id);
        }
        
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'type' => 'required|in:Quiz,Class Test,Unit Test,Assignment,Practical,Project,Midterm,Final',
            'class_id' => 'required|string',
            'subject' => 'required|string',
            'max_marks' => 'required|integer',
            'exam_date' => 'required|date',
        ]);

        $assessment = Assessment::create($validated);
        return response()->json($assessment, 201);
    }

    public function show($id)
    {
        $assessment = Assessment::with('marks.student')->findOrFail($id);
        return response()->json($assessment);
    }

    public function update(Request $request, $id)
    {
        $assessment = Assessment::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:Quiz,Class Test,Unit Test,Assignment,Practical,Project,Midterm,Final',
            'class_id' => 'sometimes|required|string',
            'subject' => 'sometimes|required|string',
            'max_marks' => 'sometimes|required|integer',
            'exam_date' => 'sometimes|required|date',
        ]);

        $assessment->update($validated);
        return response()->json($assessment);
    }

    public function destroy($id)
    {
        Assessment::destroy($id);
        return response()->json(['message' => 'Assessment deleted successfully']);
    }
}
