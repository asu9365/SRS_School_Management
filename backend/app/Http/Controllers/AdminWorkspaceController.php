<?php

namespace App\Http\Controllers;

use App\Services\AdminWorkspaceService;
use Illuminate\Http\Request;

class AdminWorkspaceController extends Controller
{
    protected $adminWorkspaceService;

    public function __construct(AdminWorkspaceService $adminWorkspaceService)
    {
        $this->adminWorkspaceService = $adminWorkspaceService;
    }

    /**
     * Get admin dashboard summary parameters.
     * GET /api/admin/dashboard
     */
    public function dashboard(Request $request)
    {
        $result = $this->adminWorkspaceService->getAdminDashboardSummary();
        return response()->json($result);
    }

    /**
     * Get admin dashboard summary parameters.
     * GET /api/admin/dashboard/summary
     */
    public function summary(Request $request)
    {
        $result = $this->adminWorkspaceService->getAdminDashboardSummary();
        return response()->json($result);
    }

    /**
     * Get approval queues list.
     * GET /api/admin/dashboard/approvals
     */
    public function approvals(Request $request)
    {
        $result = $this->adminWorkspaceService->getApprovalQueue();
        return response()->json($result);
    }

    /**
     * Get admin notifications.
     * GET /api/admin/dashboard/notifications
     */
    public function notifications(Request $request)
    {
        $result = $this->adminWorkspaceService->getAdminNotifications();
        return response()->json($result);
    }

    /**
     * Get admin recent activity history.
     * GET /api/admin/dashboard/activity
     */
    public function activity(Request $request)
    {
        $result = $this->adminWorkspaceService->getActivityLog();
        return response()->json($result);
    }

    /**
     * Get admin dashboard key performance indicators.
     * GET /api/admin/dashboard/kpis
     */
    public function kpis(Request $request)
    {
        $result = $this->adminWorkspaceService->getDashboardKpis();
        return response()->json($result);
    }

    /**
     * Get admin dashboard AI insights.
     * GET /api/admin/dashboard/ai
     */
    public function aiInsights(Request $request)
    {
        $result = $this->adminWorkspaceService->getDashboardAiInsights();
        return response()->json($result);
    }
}
