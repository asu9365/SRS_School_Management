<?php

namespace App\Http\Controllers;

use App\Services\TeacherProductivityService;
use Illuminate\Http\Request;

class TeacherProductivityController extends Controller
{
    protected $productivityService;

    public function __construct(TeacherProductivityService $productivityService)
    {
        $this->productivityService = $productivityService;
    }

    /**
     * Get productivity summary.
     * GET /api/teacher/productivity
     */
    public function productivity(Request $request)
    {
        $result = $this->productivityService->getProductivitySummary(auth()->id());
        return response()->json($result);
    }

    /**
     * Get teaching effectiveness.
     * GET /api/teacher/effectiveness
     */
    public function effectiveness(Request $request)
    {
        $result = $this->productivityService->getTeachingEffectiveness(auth()->id());
        return response()->json($result);
    }

    /**
     * Get lesson planning analytics.
     * GET /api/teacher/lesson-analytics
     */
    public function lessonAnalytics(Request $request)
    {
        $result = $this->productivityService->getLessonPlanAnalytics(auth()->id());
        return response()->json($result);
    }

    /**
     * Get communication/PTM analytics.
     * GET /api/teacher/communication-analytics
     */
    public function communicationAnalytics(Request $request)
    {
        $result = $this->productivityService->getCommunicationAnalytics(auth()->id());
        return response()->json($result);
    }

    /**
     * Get institutional KPIs compared to targets.
     * GET /api/teacher/institutional-kpis
     */
    public function institutionalKpis(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'target_gpa' => '8.0',
                'actual_class_gpa' => '8.2',
                'target_attendance_rate' => '90%',
                'actual_attendance_rate' => '94%',
                'kpi_status' => 'On Track',
            ]
        ]);
    }

    /**
     * Get AI feedback advisory comments on productivity.
     * GET /api/teacher/productivity/ai
     */
    public function aiAdvisory(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'insight' => 'Excellent communication response time (3.5 hours average). Lesson plan completion rate is at 100%. Keep up the regular homework assignments pacing.',
            ]
        ]);
    }
}
