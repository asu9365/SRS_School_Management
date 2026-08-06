<?php

namespace App\Http\Controllers;

use App\Services\Student360Service;
use App\Models\Student;
use App\Models\StudentCompetency;
use App\Models\BehaviorRecord;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;

class Student360Controller extends Controller
{
    protected $student360Service;

    public function __construct(Student360Service $student360Service)
    {
        $this->student360Service = $student360Service;
    }

    /**
     * Get holistic Student360 profile summary.
     */
    public function show($studentId)
    {
        $result = $this->student360Service->getStudent360Summary($studentId);

        return response()->json($result);
    }

    /**
     * Save extracurricular student achievement.
     */
    public function storeAchievement(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:academic,sports,cultural,technical',
            'event_date' => 'required|date',
            'file' => 'nullable|file|max:10240', // 10MB max certificate
        ]);

        $data = $request->all();
        if ($request->hasFile('file')) {
            $data['certificate_path'] = $request->file('file')->store('achievements', 'public');
        }

        $result = $this->student360Service->addAchievement($data);

        return response()->json([
            'success' => true,
            'message' => 'Achievement recorded successfully.',
            'data' => $result['data'],
        ], 201);
    }

    /**
     * Create counselor intervention.
     */
    public function storeIntervention(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'goal' => 'required|string|max:255',
            'assigned_to' => 'nullable|exists:users,id',
            'start_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $result = $this->student360Service->createIntervention($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Intervention goal scheduled successfully.',
            'data' => $result['data'],
        ], 201);
    }

    /**
     * Update counselor intervention.
     */
    public function updateIntervention(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,active,completed',
            'notes' => 'nullable|string',
        ]);

        $result = $this->student360Service->updateIntervention($id, $request->all());

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Intervention updated successfully.',
            'data' => $result['data'],
        ]);
    }

    // --- Legacy / Compatibility actions ---

    public function addPortfolio(Request $request, $studentId)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $validated['student_id'] = $studentId;
        $item = PortfolioItem::create($validated);

        return response()->json(['success' => true, 'data' => $item]);
    }

    public function addCompetencyScore(Request $request, $studentId)
    {
        $validated = $request->validate([
            'competency_id' => 'required|exists:competencies,id',
            'score' => 'required|integer|min:1|max:5',
        ]);

        $validated['student_id'] = $studentId;
        $validated['teacher_id'] = $request->user()->id;

        $record = StudentCompetency::updateOrCreate(
            ['student_id' => $studentId, 'competency_id' => $validated['competency_id']],
            ['score' => $validated['score'], 'teacher_id' => $validated['teacher_id']]
        );

        return response()->json(['success' => true, 'data' => $record]);
    }

    public function addBehaviorRecord(Request $request, $studentId)
    {
        $validated = $request->validate([
            'type' => 'required|in:Positive,Needs Improvement',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        $validated['student_id'] = $studentId;
        $validated['teacher_id'] = $request->user()->id;

        $record = BehaviorRecord::create($validated);

        return response()->json(['success' => true, 'data' => $record]);
    }
}
