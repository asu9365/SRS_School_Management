<?php

namespace App\Http\Controllers;

use App\Repositories\AssessmentRepository;
use App\Models\Mark;
use App\Models\Assessment;
use App\Models\StudentClassAssignment;
use Illuminate\Http\Request;

class TeacherAssessmentController extends Controller
{
    protected $assessmentRepository;

    public function __construct(AssessmentRepository $assessmentRepository)
    {
        $this->assessmentRepository = $assessmentRepository;
    }

    /**
     * List assessments.
     * GET /api/teacher/assessments
     */
    public function index(Request $request)
    {
        $filters = $request->only(['class_room_id', 'section_id', 'subject_id', 'status']);
        $assessments = $this->assessmentRepository->getFilteredAssessments($filters);

        return response()->json([
            'success' => true,
            'data' => $assessments,
        ]);
    }

    /**
     * Create assessment.
     * POST /api/teacher/assessments
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:Quiz,Class Test,Unit Test,Assignment,Practical,Project,Midterm,Final',
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'subject_id' => 'required|exists:subjects,id',
            'max_marks' => 'required|integer|min:1',
            'exam_date' => 'required|date',
            'status' => 'nullable|in:draft,published',
        ]);

        $data = $request->all();
        $data['status'] = $data['status'] ?? 'published';
        $data['school_id'] = auth()->user()->school_id ?? null;
        
        // Populate legacy string fields
        $classRoom = \App\Models\ClassRoom::find($request->class_room_id);
        $section = \App\Models\Section::find($request->section_id);
        $subject = \App\Models\Subject::find($request->subject_id);

        $data['class_id'] = $classRoom->class_name . '-' . $section->section_name;
        $data['subject'] = $subject->name;

        $assessment = $this->assessmentRepository->create($data);

        return response()->json([
            'success' => true,
            'data' => $assessment,
            'message' => 'Assessment created successfully.',
        ], 201);
    }

    /**
     * Submit marks for assessment.
     * POST /api/teacher/marks
     */
    public function submitMarks(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
            'marks' => 'required|array',
            'marks.*.user_id' => 'required|exists:users,id',
            'marks.*.marks_obtained' => 'required|numeric|min:0',
            'marks.*.teacher_feedback' => 'nullable|string',
        ]);

        $assessment = Assessment::findOrFail($request->assessment_id);
        $results = [];

        foreach ($request->marks as $markData) {
            if ($markData['marks_obtained'] > $assessment->max_marks) {
                return response()->json([
                    'success' => false,
                    'message' => "Marks obtained cannot exceed max marks of {$assessment->max_marks}.",
                ], 400);
            }

            $mark = Mark::updateOrCreate(
                [
                    'assessment_id' => $request->assessment_id,
                    'user_id' => $markData['user_id'],
                ],
                [
                    'marks_obtained' => $markData['marks_obtained'],
                    'teacher_feedback' => $markData['teacher_feedback'] ?? null,
                ]
            );

            $results[] = $mark;
        }

        return response()->json([
            'success' => true,
            'message' => 'Marks submitted successfully.',
            'data' => $results,
        ]);
    }

    /**
     * Publish results.
     * POST /api/teacher/results/publish
     */
    public function publishResults(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
        ]);

        $assessment = Assessment::findOrFail($request->assessment_id);
        $assessment->update(['status' => 'published']);

        return response()->json([
            'success' => true,
            'message' => 'Assessment results published successfully.',
            'data' => $assessment,
        ]);
    }

    /**
     * Collate Gradebook ranking lists.
     * GET /api/teacher/gradebook
     */
    public function gradebook(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $students = StudentClassAssignment::with('student.user')
            ->where('class_room_id', $request->class_room_id)
            ->where('section_id', $request->section_id)
            ->get();

        $assessments = Assessment::where('class_room_id', $request->class_room_id)
            ->where('section_id', $request->section_id)
            ->where('subject_id', $request->subject_id)
            ->where('status', 'published')
            ->get();

        $gradebookRecords = [];

        foreach ($students as $assign) {
            if (!$assign->student) continue;

            $studentUser = $assign->student->user;
            if (!$studentUser) continue;

            $studentMarks = Mark::whereIn('assessment_id', $assessments->pluck('id'))
                ->where('user_id', $studentUser->id)
                ->get();

            $totalObtained = $studentMarks->sum('marks_obtained');
            $totalPossible = 0;

            foreach ($studentMarks as $m) {
                $assessment = $assessments->firstWhere('id', $m->assessment_id);
                if ($assessment) {
                    $totalPossible += $assessment->max_marks;
                }
            }

            $percentage = $totalPossible > 0 ? ($totalObtained / $totalPossible) * 100 : 0;

            $gradebookRecords[] = [
                'student_id' => $assign->student->id,
                'name' => $studentUser->name,
                'roll_number' => $assign->roll_number,
                'total_obtained' => $totalObtained,
                'total_possible' => $totalPossible,
                'percentage' => round($percentage, 2),
            ];
        }

        // Sort descending by percentage
        usort($gradebookRecords, function ($a, $b) {
            return $b['percentage'] <=> $a['percentage'];
        });

        // Add Rank index
        foreach ($gradebookRecords as $idx => &$record) {
            $record['rank'] = $idx + 1;
        }

        return response()->json([
            'success' => true,
            'data' => [
                'class_room_id' => $request->class_room_id,
                'section_id' => $request->section_id,
                'subject_id' => $request->subject_id,
                'records' => $gradebookRecords,
            ]
        ]);
    }
}
