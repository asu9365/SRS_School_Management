<?php

namespace App\Http\Controllers;

use App\Services\PrincipalGovernanceService;
use Illuminate\Http\Request;

class PrincipalGovernanceController extends Controller
{
    protected $governanceService;

    public function __construct(PrincipalGovernanceService $governanceService)
    {
        $this->governanceService = $governanceService;
    }

    /**
     * Get syllabus coverages, passing rates, and active classrooms.
     * GET /api/principal/academic/dashboard
     */
    public function academicDashboard(Request $request)
    {
        $result = $this->governanceService->getAcademicDashboard();
        return response()->json($result);
    }

    /**
     * Get curriculum subjects listings.
     * GET /api/principal/curriculum
     */
    public function curriculum(Request $request)
    {
        $result = $this->governanceService->getCurriculumList();
        return response()->json($result);
    }

    /**
     * Get departments counts, HOd, and average GPAs.
     * GET /api/principal/departments
     */
    public function departments(Request $request)
    {
        $result = $this->governanceService->getDepartmentsSummary();
        return response()->json($result);
    }

    /**
     * Get syllabus outcomes coverage counts.
     * GET /api/principal/outcomes
     */
    public function outcomes(Request $request)
    {
        $result = $this->governanceService->getLearningOutcomes();
        return response()->json($result);
    }

    /**
     * Get competencies mastery rates.
     * GET /api/principal/competencies
     */
    public function competencies(Request $request)
    {
        $result = $this->governanceService->getCompetenciesSummary();
        return response()->json($result);
    }

    /**
     * Get passing standards and attendance thresholds.
     * GET /api/principal/policies
     */
    public function policies(Request $request)
    {
        $result = $this->governanceService->getAcademicPolicies();
        return response()->json($result);
    }

    /**
     * Get AI syllabus advice.
     * GET /api/principal/academic-ai
     */
    public function academicAi(Request $request)
    {
        $result = $this->governanceService->getAcademicAiInsights();
        return response()->json($result);
    }

    /**
     * Get overall faculty attendance rate and active observations.
     * GET /api/principal/faculty/dashboard
     */
    public function facultyDashboard(Request $request)
    {
        $result = $this->governanceService->getFacultyDashboard();
        return response()->json($result);
    }

    /**
     * Get teacher performance ratings list.
     * GET /api/principal/faculty/performance
     */
    public function facultyPerformance(Request $request)
    {
        $result = $this->governanceService->getFacultyPerformance();
        return response()->json($result);
    }

    /**
     * Get classroom observations logs list.
     * GET /api/principal/faculty/observations
     */
    public function facultyObservations(Request $request)
    {
        $result = $this->governanceService->getFacultyObservations();
        return response()->json($result);
    }

    /**
     * Get faculty development certification details.
     * GET /api/principal/faculty/development
     */
    public function facultyDevelopment(Request $request)
    {
        $result = $this->governanceService->getFacultyDevelopment();
        return response()->json($result);
    }

    /**
     * Get awards recognition lists.
     * GET /api/principal/faculty/recognition
     */
    public function facultyRecognition(Request $request)
    {
        $result = $this->governanceService->getFacultyRecognition();
        return response()->json($result);
    }

    /**
     * Get promotions list.
     * GET /api/principal/faculty/promotions
     */
    public function facultyPromotions(Request $request)
    {
        $result = $this->governanceService->getFacultyPromotions();
        return response()->json($result);
    }

    /**
     * Get AI faculty insights.
     * GET /api/principal/faculty/ai
     */
    public function facultyAi(Request $request)
    {
        $result = $this->governanceService->getFacultyAiInsights();
        return response()->json($result);
    }
}
