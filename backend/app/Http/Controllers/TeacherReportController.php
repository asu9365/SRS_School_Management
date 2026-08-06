<?php

namespace App\Http\Controllers;

use App\Services\TeacherReportService;
use Illuminate\Http\Request;

class TeacherReportController extends Controller
{
    protected $reportService;

    public function __construct(TeacherReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    /**
     * Get authorized students list.
     * GET /api/teacher/reports/students
     */
    public function indexStudents(Request $request)
    {
        $classRoomId = $request->query('class_room_id');
        $sectionId = $request->query('section_id');

        $students = $this->reportService->getStudentsListForTeacher(auth()->id(), $classRoomId, $sectionId);

        return response()->json([
            'success' => true,
            'data' => $students,
        ]);
    }

    /**
     * Get student details report.
     * GET /api/teacher/reports/students/{id}
     */
    public function showStudent(Request $request, $id)
    {
        $summary = $this->reportService->getStudentSummary($id);
        return response()->json($summary);
    }

    /**
     * Get student academic growth report.
     * GET /api/teacher/reports/students/{id}/growth
     */
    public function studentGrowth(Request $request, $id)
    {
        $growth = $this->reportService->getStudentGrowth($id);
        return response()->json($growth);
    }

    /**
     * Get student competency reports.
     * GET /api/teacher/reports/students/{id}/competencies
     */
    public function studentCompetencies(Request $request, $id)
    {
        $summary = $this->reportService->getStudentSummary($id);
        return response()->json([
            'success' => true,
            'data' => $summary['data']['metrics']['competency'] ?? [],
        ]);
    }

    /**
     * Get student timeline logs.
     * GET /api/teacher/reports/students/{id}/timeline
     */
    public function studentTimeline(Request $request, $id)
    {
        $summary = $this->reportService->getStudentSummary($id);
        return response()->json([
            'success' => true,
            'data' => $summary['data']['timeline'] ?? [],
        ]);
    }

    /**
     * Get classroom general dashboard metrics.
     * GET /api/teacher/reports/classroom
     */
    public function classroomOverview(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->reportService->getClassroomOverview($request->class_room_id, $request->section_id);

        return response()->json($result);
    }

    /**
     * Get classroom performance trends.
     * GET /api/teacher/reports/classroom/performance
     */
    public function classroomPerformance(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->reportService->getClassroomOverview($request->class_room_id, $request->section_id);

        return response()->json($result);
    }

    /**
     * Get classroom grade brackets distribution.
     * GET /api/teacher/reports/classroom/grades
     */
    public function classroomGrades(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->reportService->getClassroomGrades($request->class_room_id, $request->section_id);

        return response()->json($result);
    }

    /**
     * Get classroom competency masteries.
     * GET /api/teacher/reports/classroom/competencies
     */
    public function classroomCompetencies(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->reportService->getClassroomCompetencies($request->class_room_id, $request->section_id);

        return response()->json($result);
    }

    /**
     * Get classroom daily attendance trends.
     * GET /api/teacher/reports/classroom/attendance
     */
    public function classroomAttendance(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->reportService->getClassroomAttendanceAnalytics($request->class_room_id, $request->section_id);

        return response()->json($result);
    }

    /**
     * Get AI classroom advisory comments.
     * GET /api/teacher/reports/classroom/ai
     */
    public function classroomAi(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
        ]);

        $result = $this->reportService->getClassroomAiInsights($request->class_room_id, $request->section_id);

        return response()->json($result);
    }
}
