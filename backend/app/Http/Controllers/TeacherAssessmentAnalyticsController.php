<?php

namespace App\Http\Controllers;

use App\Services\TeacherAssessmentAnalyticsService;
use Illuminate\Http\Request;

class TeacherAssessmentAnalyticsController extends Controller
{
    protected $analyticsService;

    public function __construct(TeacherAssessmentAnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    /**
     * Get assessment statistics summary.
     * GET /api/teacher/analytics/assessments
     */
    public function assessments(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
        ]);

        $result = $this->analyticsService->getAssessmentStats($request->assessment_id);
        return response()->json($result);
    }

    /**
     * Get question difficulty analytics.
     * GET /api/teacher/analytics/questions
     */
    public function questions(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
        ]);

        $result = $this->analyticsService->getQuestionAnalytics($request->assessment_id);
        return response()->json($result);
    }

    /**
     * Get competency achievement analytics.
     * GET /api/teacher/analytics/competencies
     */
    public function competencies(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                ['competency' => 'Numeric Operations', 'achievement_percentage' => 84],
                ['competency' => 'Analytical Interpretation', 'achievement_percentage' => 76],
            ]
        ]);
    }

    /**
     * Get Bloom's Taxonomy distribution.
     * GET /api/teacher/analytics/bloom
     */
    public function bloom(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
        ]);

        $result = $this->analyticsService->getBloomTaxonomyAnalysis($request->assessment_id);
        return response()->json($result);
    }

    /**
     * Get learning outcomes achieved count.
     * GET /api/teacher/analytics/outcomes
     */
    public function outcomes(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_outcomes_defined' => 6,
                'outcomes_achieved' => 5,
                'achievement_rate' => '83.3%',
            ]
        ]);
    }

    /**
     * Get overall assessment health.
     * GET /api/teacher/analytics/health
     */
    public function health(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
        ]);

        $result = $this->analyticsService->getAssessmentHealth($request->assessment_id);
        return response()->json($result);
    }

    /**
     * Get AI assessment observations comment.
     * GET /api/teacher/analytics/assessment-ai
     */
    public function assessmentAi(Request $request)
    {
        $request->validate([
            'assessment_id' => 'required|exists:assessments,id',
        ]);

        $result = $this->analyticsService->getAssessmentAiInsights($request->assessment_id);
        return response()->json($result);
    }
}
