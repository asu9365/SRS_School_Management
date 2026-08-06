<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    protected $subjectService;

    public function __construct(SubjectService $subjectService)
    {
        $this->subjectService = $subjectService;
    }

    /**
     * List all subjects, optionally filtered by class.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['class_room_id', 'type']);
        $subjects = $this->subjectService->listSubjects($filters);

        return response()->json([
            'success' => true,
            'data' => $subjects,
        ]);
    }

    /**
     * Create a new subject.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'code' => 'nullable|string|max:20',
            'class_room_id' => 'required|exists:class_rooms,id',
            'type' => 'nullable|in:core,elective,optional',
            'description' => 'nullable|string',
        ]);

        $subject = $this->subjectService->createSubject($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Subject created successfully.',
            'data' => $subject->load('classRoom'),
        ], 201);
    }

    /**
     * Show a specific subject.
     */
    public function show(Subject $subject)
    {
        $detail = $this->subjectService->getSubject($subject->id);

        return response()->json([
            'success' => true,
            'data' => $detail,
        ]);
    }

    /**
     * Update a subject.
     */
    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name' => 'sometimes|string|max:100',
            'code' => 'nullable|string|max:20',
            'class_room_id' => 'sometimes|exists:class_rooms,id',
            'type' => 'nullable|in:core,elective,optional',
            'description' => 'nullable|string',
        ]);

        $updated = $this->subjectService->updateSubject($subject->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Subject updated successfully.',
            'data' => $updated->load('classRoom'),
        ]);
    }

    /**
     * Delete a subject.
     */
    public function destroy(Subject $subject)
    {
        $this->subjectService->deleteSubject($subject->id);

        return response()->json([
            'success' => true,
            'message' => 'Subject deleted successfully.',
        ]);
    }

    /**
     * Assign a teacher to a subject for a class/section.
     */
    public function assignTeacher(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'teacher_id' => 'required|exists:users,id',
            'academic_session_id' => 'required|exists:academic_sessions,id',
        ]);

        $assignment = $this->subjectService->assignTeacher($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Teacher assigned to subject successfully.',
            'data' => $assignment->load(['subject', 'teacher', 'section']),
        ]);
    }

    /**
     * Get all subject-teacher assignments for a session.
     */
    public function getAssignments(Request $request)
    {
        $request->validate([
            'academic_session_id' => 'required|exists:academic_sessions,id',
        ]);

        $assignments = $this->subjectService->getAssignments($request->academic_session_id);

        return response()->json([
            'success' => true,
            'data' => $assignments,
        ]);
    }
}

