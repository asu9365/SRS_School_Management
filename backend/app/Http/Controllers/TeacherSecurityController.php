<?php

namespace App\Http\Controllers;

use App\Services\TeacherSecurityService;
use Illuminate\Http\Request;

class TeacherSecurityController extends Controller
{
    protected $securityService;

    public function __construct(TeacherSecurityService $securityService)
    {
        $this->securityService = $securityService;
    }

    /**
     * Get current active session details.
     * GET /api/teacher/security/session
     */
    public function sessionDetails(Request $request)
    {
        $result = $this->securityService->getActiveSession(
            auth()->id(),
            $request->ip(),
            $request->userAgent()
        );
        return response()->json($result);
    }

    /**
     * Get active devices listings.
     * GET /api/teacher/security/devices
     */
    public function activeDevices(Request $request)
    {
        $result = $this->securityService->getActiveDevices(
            auth()->id(),
            $request->ip(),
            $request->userAgent()
        );
        return response()->json($result);
    }

    /**
     * Get logins history timelines.
     * GET /api/teacher/security/logins
     */
    public function loginHistory(Request $request)
    {
        $result = $this->securityService->getLoginHistory(
            auth()->id(),
            $request->ip(),
            $request->userAgent()
        );
        return response()->json($result);
    }

    /**
     * Get operation audits logs.
     * GET /api/teacher/security/audit
     */
    public function auditLogs(Request $request)
    {
        $result = $this->securityService->getAuditLogs(
            auth()->id(),
            $request->ip(),
            $request->userAgent()
        );
        return response()->json($result);
    }

    /**
     * Configure Multi-factor authentication settings.
     * POST /api/teacher/security/mfa
     */
    public function toggleMfa(Request $request)
    {
        $result = $this->securityService->toggleMfa(auth()->id());
        
        $this->securityService->logOperation(
            auth()->id(),
            'configure_mfa',
            $request->ip(),
            $request->userAgent(),
            'Teacher enabled Multi-factor Authentication.'
        );

        return response()->json($result);
    }
}
