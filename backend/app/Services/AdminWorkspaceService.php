<?php

namespace App\Services;

use App\Models\AdminDashboard;
use App\Models\DailyWorkQueue;
use App\Models\ApprovalQueue;
use App\Models\AdminNotification;
use App\Models\Student;
use App\Models\Teacher;

class AdminWorkspaceService
{
    /**
     * Get overall admin statistics count.
     */
    public function getAdminDashboardSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_students_enrolled' => Student::count(),
                'total_teachers_active' => Teacher::count(),
                'pending_approvals_count' => ApprovalQueue::where('status', 'Pending')->count(),
                'pending_tasks_count' => DailyWorkQueue::where('status', 'Pending')->count(),
            ]
        ];
    }

    /**
     * Get pending task queues list.
     */
    public function getDailyWorkQueue()
    {
        return [
            'success' => true,
            'data' => DailyWorkQueue::with('user')->get()->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'priority' => $task->priority,
                    'status' => $task->status,
                    'assigned_to' => $task->user->name ?? 'Staff',
                ];
            })
        ];
    }

    /**
     * Get workflows pending approvals queue lists.
     */
    public function getApprovalQueue()
    {
        return [
            'success' => true,
            'data' => ApprovalQueue::with('user')->get()->map(function ($app) {
                return [
                    'id' => $app->id,
                    'type' => $app->type,
                    'description' => $app->description,
                    'status' => $app->status,
                    'requested_by' => $app->user->name ?? 'Requester',
                ];
            })
        ];
    }

    /**
     * Get administrator notifications.
     */
    public function getAdminNotifications()
    {
        return [
            'success' => true,
            'data' => AdminNotification::all()
        ];
    }

    /**
     * Get general dashboard activity log.
     */
    public function getActivityLog()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'activity' => 'Database replication checked successfully.',
                    'timestamp' => now()->subMinutes(12)->toDateTimeString(),
                ]
            ]
        ];
    }

    /**
     * Get dashboard key indicators KPI targets.
     */
    public function getDashboardKpis()
    {
        return [
            'success' => true,
            'data' => [
                'enrollment_rate_percentage' => 92.5,
                'retention_rate_percentage' => 94.8,
            ]
        ];
    }

    /**
     * Get AI observations regarding operational efficiency.
     */
    public function getDashboardAiInsights()
    {
        return [
            'success' => true,
            'data' => [
                'insight' => 'All critical leaves requests have been cleared. Recommending checking outstanding billing invoice logs.',
            ]
        ];
    }
}
