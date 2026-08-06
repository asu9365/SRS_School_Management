<?php

namespace App\Http\Controllers;

use App\Services\PrincipalWorkspaceService;
use Illuminate\Http\Request;

class PrincipalWorkspaceController extends Controller
{
    protected $principalService;

    public function __construct(PrincipalWorkspaceService $principalService)
    {
        $this->principalService = $principalService;
    }

    /**
     * Get school executive dashboard details.
     * GET /api/principal/dashboard
     */
    public function dashboard(Request $request)
    {
        $result = $this->principalService->getDashboardSummary();
        return response()->json($result);
    }

    /**
     * Get overall school composite health rating.
     * GET /api/principal/school-health
     */
    public function schoolHealth(Request $request)
    {
        $result = $this->principalService->getSchoolHealthScore();
        return response()->json($result);
    }

    /**
     * Get executive advisory summary details.
     * GET /api/principal/executive-summary
     */
    public function executiveSummary(Request $request)
    {
        $result = $this->principalService->getExecutiveSummary();
        return response()->json($result);
    }

    /**
     * Get approvals alerts list.
     * GET /api/principal/alerts
     */
    public function alerts(Request $request)
    {
        $result = $this->principalService->getDashboardAlerts();
        return response()->json($result);
    }

    /**
     * Get pending task action lists.
     * GET /api/principal/actions
     */
    public function actions(Request $request)
    {
        $result = $this->principalService->getDashboardAlerts();
        return response()->json([
            'success' => true,
            'data' => [
                'pending_tasks_count' => count($result['data']),
                'tasks' => $result['data'],
            ]
        ]);
    }

    /**
     * Update dashboard settings.
     * PUT /api/principal/dashboard/settings
     */
    public function updateSettings(Request $request)
    {
        $request->validate([
            'theme' => 'string|in:light,dark',
            'widgets_enabled' => 'array',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Dashboard settings updated successfully.',
            'data' => [
                'theme' => $request->input('theme', 'light'),
                'widgets_enabled' => $request->input('widgets_enabled', []),
            ]
        ]);
    }
}
