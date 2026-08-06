<?php

namespace App\Http\Controllers;

use App\Services\TeacherWorkspaceService;
use App\Services\AttendanceService;
use Illuminate\Http\Request;

class TeacherWorkspaceController extends Controller
{
    protected $workspaceService;
    protected $attendanceService;

    public function __construct(
        TeacherWorkspaceService $workspaceService,
        AttendanceService $attendanceService
    ) {
        $this->workspaceService = $workspaceService;
        $this->attendanceService = $attendanceService;
    }

    /**
     * Get dashboard summary for teacher workspace widgets.
     * GET /api/teacher/dashboard
     */
    public function dashboard(Request $request)
    {
        $result = $this->workspaceService->getDashboardSummary(auth()->id());
        return response()->json($result);
    }

    /**
     * Get classes scheduled for today.
     * GET /api/teacher/classes/today
     */
    public function classesToday(Request $request)
    {
        $schedule = $this->workspaceService->getTodaySchedule(auth()->id());
        return response()->json([
            'success' => true,
            'data' => $schedule,
        ]);
    }

    /**
     * Get alerts/tasks pending teacher review.
     * GET /api/teacher/tasks
     */
    public function tasks(Request $request)
    {
        $summary = $this->workspaceService->getDashboardSummary(auth()->id());
        return response()->json([
            'success' => true,
            'data' => $summary['data']['alerts'],
        ]);
    }

    /**
     * Get timetable schedule for today.
     * GET /api/teacher/schedule/today
     */
    public function scheduleToday(Request $request)
    {
        $schedule = $this->workspaceService->getTodaySchedule(auth()->id());
        return response()->json([
            'success' => true,
            'data' => $schedule,
        ]);
    }

    /**
     * Get weekly schedule.
     * GET /api/teacher/schedule/week
     */
    public function scheduleWeek(Request $request)
    {
        $schedule = $this->workspaceService->getWeekSchedule(auth()->id());
        return response()->json([
            'success' => true,
            'data' => $schedule,
        ]);
    }

    /**
     * Get lesson plans.
     * GET /api/teacher/lesson-plans
     */
    public function indexLessonPlans(Request $request)
    {
        $filters = $request->only(['class_room_id', 'subject_id', 'status']);
        $plans = $this->workspaceService->getLessonPlans(auth()->id(), $filters);

        return response()->json([
            'success' => true,
            'data' => $plans,
        ]);
    }

    /**
     * Create lesson plan.
     * POST /api/teacher/lesson-plans
     */
    public function storeLessonPlan(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'subject_id' => 'required|exists:subjects,id',
            'topic' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'status' => 'nullable|in:planned,ongoing,completed',
        ]);

        $result = $this->workspaceService->createLessonPlan($request->all());

        return response()->json($result, 201);
    }

    /**
     * Update lesson plan status/info.
     * PUT /api/teacher/lesson-plans/{id}
     */
    public function updateLessonPlan(Request $request, $id)
    {
        $request->validate([
            'topic' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:planned,ongoing,completed',
        ]);

        $result = $this->workspaceService->updateLessonPlan($id, $request->all());

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        return response()->json($result);
    }

    /**
     * Fetch daily class attendance grid (students checklist).
     * GET /api/teacher/attendance/today
     */
    public function attendanceToday(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->workspaceService->getAttendanceGrid($request->class_room_id, $request->section_id);

        return response()->json($result);
    }

    /**
     * Bulk log class student attendance register.
     * POST /api/teacher/attendance
     */
    public function markAttendance(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'date' => 'nullable|date',
            'records' => 'required|array',
            'records.*.user_id' => 'required|exists:users,id',
            'records.*.status' => 'required|in:P,A,L,HD,ML,AL,OD,H,W',
            'records.*.remarks' => 'nullable|string',
        ]);

        $date = $request->date ?? now()->toDateString();
        $results = [];

        foreach ($request->records as $record) {
            $data = [
                'user_id' => $record['user_id'],
                'class_room_id' => $request->class_room_id,
                'section_id' => $request->section_id,
                'status' => $record['status'],
                'date' => $date,
                'remarks' => $record['remarks'] ?? null,
            ];

            $res = $this->attendanceService->markStudentAttendance($data);
            $results[] = [
                'user_id' => $record['user_id'],
                'success' => $res['success'],
                'message' => $res['message'] ?? 'Recorded successfully.',
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Class daily attendance processed successfully.',
            'results' => $results,
        ]);
    }
}
