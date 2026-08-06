<?php

namespace App\Http\Controllers;

use App\Services\PrincipalOperationsService;
use Illuminate\Http\Request;

class PrincipalOperationsController extends Controller
{
    protected $operationsService;

    public function __construct(PrincipalOperationsService $operationsService)
    {
        $this->operationsService = $operationsService;
    }

    /**
     * Get student outstanding count.
     * GET /api/principal/student-success
     */
    public function studentSuccess(Request $request)
    {
        $result = $this->operationsService->getStudentSuccessSummary();
        return response()->json($result);
    }

    /**
     * Get high-risk student warnings.
     * GET /api/principal/student-risks
     */
    public function studentRisks(Request $request)
    {
        $result = $this->operationsService->getStudentRisks();
        return response()->json($result);
    }

    /**
     * Get active counseling interventions.
     * GET /api/principal/interventions
     */
    public function interventions(Request $request)
    {
        $result = $this->operationsService->getInterventions();
        return response()->json($result);
    }

    /**
     * Get Student360 metrics indexes.
     * GET /api/principal/student360
     */
    public function student360(Request $request)
    {
        $result = $this->operationsService->getStudent360Dashboard();
        return response()->json($result);
    }

    /**
     * Get social & happiness averages.
     * GET /api/principal/wellbeing
     */
    public function wellbeing(Request $request)
    {
        $result = $this->operationsService->getWellbeingSummary();
        return response()->json($result);
    }

    /**
     * Get AI warning predictions.
     * GET /api/principal/student-ai
     */
    public function studentAi(Request $request)
    {
        $result = $this->operationsService->getStudentAiInsights();
        return response()->json($result);
    }

    /**
     * Get operations compound stats.
     * GET /api/principal/operations
     */
    public function operations(Request $request)
    {
        $result = $this->operationsService->getOperationsSummary();
        return response()->json($result);
    }

    /**
     * Get infrastructure status.
     * GET /api/principal/infrastructure
     */
    public function infrastructure(Request $request)
    {
        $result = $this->operationsService->getInfrastructureList();
        return response()->json($result);
    }

    /**
     * Get bus routes drivers rosters.
     * GET /api/principal/transport
     */
    public function transport(Request $request)
    {
        $result = $this->operationsService->getTransportList();
        return response()->json($result);
    }

    /**
     * Get open maintenance logs.
     * GET /api/principal/maintenance
     */
    public function maintenance(Request $request)
    {
        $result = $this->operationsService->getMaintenanceList();
        return response()->json($result);
    }

    /**
     * Get library book audits.
     * GET /api/principal/library
     */
    public function library(Request $request)
    {
        $result = $this->operationsService->getLibrarySummary();
        return response()->json($result);
    }

    /**
     * Get hostel rooms availability.
     * GET /api/principal/hostel
     */
    public function hostel(Request $request)
    {
        $result = $this->operationsService->getHostelSummary();
        return response()->json($result);
    }

    /**
     * Get critical emergency incident reports.
     * GET /api/principal/emergency
     */
    public function emergency(Request $request)
    {
        $result = $this->operationsService->getEmergencyEvents();
        return response()->json($result);
    }

    /**
     * Get AI logistics suggestions.
     * GET /api/principal/operations-ai
     */
    public function operationsAi(Request $request)
    {
        $result = $this->operationsService->getOperationsAiInsights();
        return response()->json($result);
    }
}
