<?php

namespace App\Http\Controllers;

use App\Services\AdminWorkflowCommunicationService;
use Illuminate\Http\Request;

class AdminWorkflowCommunicationController extends Controller
{
    protected $workflowCommunicationService;

    public function __construct(AdminWorkflowCommunicationService $workflowCommunicationService)
    {
        $this->workflowCommunicationService = $workflowCommunicationService;
    }

    /**
     * Get workflows summary statistics.
     * GET /api/admin/workflows
     */
    public function workflowsSummary(Request $request)
    {
        $result = $this->workflowCommunicationService->getWorkflowsSummary();
        return response()->json($result);
    }

    /**
     * Get designer definitions.
     * GET /api/admin/workflows/designer
     */
    public function designer(Request $request)
    {
        $result = $this->workflowCommunicationService->getWorkflowsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Save new workflow definition.
     * POST /api/admin/workflows
     */
    public function createWorkflow(Request $request)
    {
        $result = $this->workflowCommunicationService->createWorkflow($request->all());
        return response()->json($result);
    }

    /**
     * Get active task checklists roster.
     * GET /api/admin/tasks
     */
    public function tasksList(Request $request)
    {
        $result = $this->workflowCommunicationService->getTasksList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get pending approvals details list.
     * GET /api/admin/approvals
     */
    public function approvalsList(Request $request)
    {
        $result = $this->workflowCommunicationService->getApprovalsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get trace execution logs details.
     * GET /api/admin/workflows/logs
     */
    public function workflowLogs(Request $request)
    {
        $result = $this->workflowCommunicationService->getWorkflowLogs();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get SLA countdown statuses.
     * GET /api/admin/workflows/sla
     */
    public function slaList(Request $request)
    {
        $result = $this->workflowCommunicationService->getSlaList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get communications summary statistics.
     * GET /api/admin/communications
     */
    public function communicationsSummary(Request $request)
    {
        $result = $this->workflowCommunicationService->getCommunicationsSummary();
        return response()->json($result);
    }

    /**
     * Get notifications alerts lists.
     * GET /api/admin/notifications
     */
    public function notificationsList(Request $request)
    {
        $result = $this->workflowCommunicationService->getNotificationsList();
        return response()->json($result);
    }

    /**
     * Store broadcast notice circular details.
     * POST /api/admin/communications/broadcast
     */
    public function broadcastMessage(Request $request)
    {
        $result = $this->workflowCommunicationService->broadcastMessage($request->all());
        return response()->json($result);
    }

    /**
     * Get templates notices outlines listings.
     * GET /api/admin/communications/templates
     */
    public function templatesList(Request $request)
    {
        $result = $this->workflowCommunicationService->getCommunicationsTemplates();
        return response()->json($result);
    }

    /**
     * Get school announcements list.
     * GET /api/admin/announcements
     */
    public function announcementsList(Request $request)
    {
        $result = $this->workflowCommunicationService->getAnnouncements();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get email notices delivery trace registers.
     * GET /api/admin/communications/delivery
     */
    public function deliveryLogs(Request $request)
    {
        $result = $this->workflowCommunicationService->getDeliveryLogs();
        return response()->json($result);
    }

    /**
     * Get click tracking communication analytics metrics.
     * GET /api/admin/communications/analytics
     */
    public function communicationsAnalytics(Request $request)
    {
        $result = $this->workflowCommunicationService->getCommunicationsAnalytics();
        return response()->json($result);
    }
}
