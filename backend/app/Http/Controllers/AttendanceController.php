<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    protected $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * Mark daily student attendance.
     * FR-04: Student Attendance Mark
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'status' => 'required|in:P,A,L,HD,ML,AL,OD,H,W',
            'date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        $result = $this->attendanceService->markStudentAttendance($request->all());

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Attendance recorded successfully.',
            'data' => $result['data'],
        ]);
    }

    /**
     * Get student attendance logs with filters.
     */
    public function index(Request $request)
    {
        $request->validate([
            'class_room_id' => 'nullable|exists:class_rooms,id',
            'section_id' => 'nullable|exists:sections,id',
            'date' => 'nullable|date',
        ]);

        $filters = $request->only(['class_room_id', 'section_id', 'date']);
        $records = $this->attendanceService->getStudentAttendanceList($filters);

        return response()->json([
            'success' => true,
            'data' => $records,
        ]);
    }

    /**
     * Mark teacher attendance.
     * FR-04: Teacher Attendance Mark
     */
    public function storeTeacherAttendance(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id',
            'status' => 'required|in:Present,Absent,Leave,Half-Day,Official-Duty,Training,Holiday',
            'date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        $result = $this->attendanceService->markTeacherAttendance($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Teacher attendance recorded successfully.',
            'data' => $result['data'],
        ]);
    }
}
