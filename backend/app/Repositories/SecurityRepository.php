<?php

namespace App\Repositories;

use App\Models\LoginHistory;
use App\Models\AuditLog;

class SecurityRepository
{
    /**
     * Get login history for a user.
     */
    public function getLoginHistoryForUser($userId)
    {
        return LoginHistory::where('user_id', $userId)
            ->orderByDesc('logged_at')
            ->get();
    }

    /**
     * Log user authentication.
     */
    public function logLogin($userId, $ip, $userAgent, $status = 'success')
    {
        return LoginHistory::create([
            'user_id' => $userId,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'status' => $status,
            'logged_at' => now(),
        ]);
    }

    /**
     * Get audit logs for a user.
     */
    public function getAuditLogsForUser($userId)
    {
        return AuditLog::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Log administrative action.
     */
    public function logAction($userId, $action, $ip, $userAgent, $details = null)
    {
        return AuditLog::create([
            'user_id' => $userId,
            'action' => $action,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'details' => $details,
        ]);
    }
}
