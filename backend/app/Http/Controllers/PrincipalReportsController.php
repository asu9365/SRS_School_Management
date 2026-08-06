<?php

namespace App\Http\Controllers;

use App\Services\PrincipalReportsService;
use Illuminate\Http\Request;

class PrincipalReportsController extends Controller
{
    protected $reportsService;

    public function __construct(PrincipalReportsService $reportsService)
    {
        $this->reportsService = $reportsService;
    }

    /**
     * Get generated reports list.
     * GET /api/principal/reports
     */
    public function reportsList(Request $request)
    {
        $result = $this->reportsService->getReportsList();
        return response()->json($result);
    }

    /**
     * Get interactive business analytics totals.
     * GET /api/principal/analytics
     */
    public function analyticsSummary(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'evaluated_classes_count' => 12,
                'students_passing_rate' => 98.2,
            ]
        ]);
    }

    /**
     * Generate custom reports.
     * POST /api/principal/reports/custom
     */
    public function customReport(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
        ]);

        $userId = auth()->id() ?? 1; // Fallback to 1 for simulated requests
        $result = $this->reportsService->createCustomReport($request->all(), $userId);
        return response()->json($result);
    }

    /**
     * Get scheduled reports.
     * GET /api/principal/reports/scheduled
     */
    public function scheduledReports(Request $request)
    {
        $result = $this->reportsService->getScheduledReports();
        return response()->json($result);
    }

    /**
     * Get executive KPIs list.
     * GET /api/principal/kpis
     */
    public function kpis(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'target_gpa' => 3.5,
                'current_gpa' => 3.2,
                'attendance_target' => 95.0,
                'current_attendance' => 94.8,
            ]
        ]);
    }

    /**
     * Get benchmark statistics metrics.
     * GET /api/principal/benchmark
     */
    public function benchmark(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'national_gpa_average' => 3.1,
                'school_gpa_average' => 3.2,
            ]
        ]);
    }

    /**
     * Get data warehouse jobs.
     * GET /api/principal/datawarehouse
     */
    public function datawarehouse(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'last_warehouse_sync' => now()->subHours(2)->toDateTimeString(),
                'status' => 'Synced',
            ]
        ]);
    }

    /**
     * Get system status checks logs.
     * GET /api/system/health
     */
    public function systemHealth(Request $request)
    {
        $result = $this->reportsService->getSystemStatus();
        return response()->json($result);
    }

    /**
     * Get system administration general stats.
     * GET /api/system/status
     */
    public function systemStatus(Request $request)
    {
        $result = $this->reportsService->getSystemStatus();
        return response()->json($result);
    }

    /**
     * Get registered webhooks.
     * GET /api/system/webhooks
     */
    public function webhooks(Request $request)
    {
        $result = $this->reportsService->getWebhooks();
        return response()->json($result);
    }

    /**
     * Get server performance metrics.
     * GET /api/system/metrics
     */
    public function systemMetrics(Request $request)
    {
        $result = $this->reportsService->getMetrics();
        return response()->json($result);
    }

    /**
     * Get API swagger/documentations.
     * GET /api/docs
     */
    public function docs(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'api_documentation_url' => 'https://docs.schoolos.edu/api/v1',
            ]
        ]);
    }
}
