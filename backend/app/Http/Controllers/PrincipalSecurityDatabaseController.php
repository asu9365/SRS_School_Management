<?php

namespace App\Http\Controllers;

use App\Services\PrincipalSecurityDatabaseService;
use Illuminate\Http\Request;

class PrincipalSecurityDatabaseController extends Controller
{
    protected $securityDbService;

    public function __construct(PrincipalSecurityDatabaseService $securityDbService)
    {
        $this->securityDbService = $securityDbService;
    }

    /**
     * Get database server connection latency.
     * GET /api/database/health
     */
    public function dbHealth(Request $request)
    {
        $result = $this->securityDbService->getDbHealth();
        return response()->json($result);
    }

    /**
     * Get row sizes and records counts.
     * GET /api/database/statistics
     */
    public function dbStatistics(Request $request)
    {
        $result = $this->securityDbService->getDbStatistics();
        return response()->json($result);
    }

    /**
     * Get database sql backups files list.
     * GET /api/database/backups
     */
    public function dbBackups(Request $request)
    {
        $result = $this->securityDbService->getDbBackups();
        return response()->json($result);
    }

    /**
     * Get replication sync latency lag seconds.
     * GET /api/database/replication
     */
    public function dbReplication(Request $request)
    {
        $result = $this->securityDbService->getDbReplication();
        return response()->json($result);
    }

    /**
     * Get average database queries execution latency.
     * GET /api/database/performance
     */
    public function dbPerformance(Request $request)
    {
        $result = $this->securityDbService->getDbPerformance();
        return response()->json($result);
    }

    /**
     * Get principal accounts security flags summary.
     * GET /api/principal/security
     */
    public function securitySummary(Request $request)
    {
        $result = $this->securityDbService->getSecuritySummary();
        return response()->json($result);
    }

    /**
     * Get administrative action transaction audit logs feed.
     * GET /api/principal/security/audit
     */
    public function securityAudit(Request $request)
    {
        $result = $this->securityDbService->getSecurityAudit();
        return response()->json($result);
    }

    /**
     * Get active device session connections list.
     * GET /api/principal/security/sessions
     */
    public function securitySessions(Request $request)
    {
        $result = $this->securityDbService->getSecuritySessions();
        return response()->json($result);
    }

    /**
     * Get safety alert events logs.
     * GET /api/principal/security/events
     */
    public function securityEvents(Request $request)
    {
        $result = $this->securityDbService->getSecurityEvents();
        return response()->json($result);
    }

    /**
     * Activate/deactivate MFA settings configuration.
     * POST /api/principal/security/mfa
     */
    public function securityMfa(Request $request)
    {
        $result = $this->securityDbService->setupMfa($request->all());
        return response()->json($result);
    }

    /**
     * Get list of trusted login devices.
     * GET /api/principal/security/devices
     */
    public function securityDevices(Request $request)
    {
        $result = $this->securityDbService->getTrustedDevices();
        return response()->json($result);
    }
}
