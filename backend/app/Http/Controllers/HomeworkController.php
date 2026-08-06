<?php

namespace App\Http\Controllers;

use App\Services\LmsService;
use App\Repositories\HomeworkRepository;
use App\Repositories\HomeworkSubmissionRepository;
use Illuminate\Http\Request;

class HomeworkController extends Controller
{
    protected $lmsService;
    protected $homeworkRepository;
    protected $submissionRepository;

    public function __construct(
        LmsService $lmsService,
        HomeworkRepository $homeworkRepository,
        HomeworkSubmissionRepository $submissionRepository
    ) {
        $this->lmsService = $lmsService;
        $this->homeworkRepository = $homeworkRepository;
        $this->submissionRepository = $submissionRepository;
    }

    /**
     * List assignments/homework.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['class_room_id', 'section_id', 'subject_id', 'status']);
        $records = $this->homeworkRepository->getFilteredHomework($filters);

        return response()->json($records);
    }

    /**
     * Create an assignment/homework.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'class_room_id' => 'nullable|exists:class_rooms,id',
            'section_id' => 'nullable|exists:sections,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'due_date' => 'nullable|date',
            'max_marks' => 'nullable|integer',
            'category' => 'nullable|string',
            'submission_type' => 'nullable|in:online,offline,link',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $result = $this->lmsService->createHomework($request->all());

        return response()->json($result['data'], 201);
    }

    /**
     * Get specific assignment details.
     */
    public function show($id)
    {
        $homework = $this->homeworkRepository->find($id);
        if (!$homework) {
            return response()->json(['success' => false, 'message' => 'Homework not found.'], 404);
        }
        return response()->json($homework);
    }

    /**
     * Update assignment details.
     */
    public function update(Request $request, $id)
    {
        $homework = $this->homeworkRepository->find($id);
        if (!$homework) {
            return response()->json(['success' => false, 'message' => 'Homework not found.'], 404);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'class_room_id' => 'nullable|exists:class_rooms,id',
            'section_id' => 'nullable|exists:sections,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'due_date' => 'nullable|date',
            'max_marks' => 'nullable|integer',
            'category' => 'nullable|string',
            'submission_type' => 'nullable|in:online,offline,link',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $homework->update($request->all());

        return response()->json($homework);
    }

    /**
     * Delete assignment.
     */
    public function destroy($id)
    {
        $homework = $this->homeworkRepository->find($id);
        if (!$homework) {
            return response()->json(['success' => false, 'message' => 'Homework not found.'], 404);
        }

        $homework->delete();

        return response()->json(null, 204);
    }

    /**
     * Submit assignment solution.
     * FR-08: Student Solution Submission
     */
    public function submit(Request $request, $id)
    {
        $request->validate([
            'file' => 'nullable|file|max:10240', // 10MB max
            'external_link' => 'nullable|url',
        ]);

        $result = $this->lmsService->submitHomework($id, $request->only('external_link'), $request->file('file'));

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Solution submitted successfully.',
            'data' => $result['data'],
        ]);
    }

    /**
     * Grade a student submission.
     * FR-08: Evaluation / Grade Submission
     */
    public function grade(Request $request, $submissionId)
    {
        $request->validate([
            'marks_obtained' => 'required|numeric|min:0',
            'grade' => 'nullable|string|max:10',
            'feedback' => 'nullable|string',
        ]);

        $result = $this->lmsService->gradeSubmission($submissionId, $request->all());

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Submission graded successfully.',
            'data' => $result['data'],
        ]);
    }

    /**
     * List submissions for a homework task.
     */
    public function submissions($id)
    {
        $submissions = $this->submissionRepository->getSubmissionsForHomework($id);

        return response()->json([
            'success' => true,
            'data' => $submissions,
        ]);
    }
}
