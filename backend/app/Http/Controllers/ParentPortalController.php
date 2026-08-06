<?php

namespace App\Http\Controllers;

use App\Services\ParentPortalService;
use Illuminate\Http\Request;

class ParentPortalController extends Controller
{
    protected $parentPortalService;

    public function __construct(ParentPortalService $parentPortalService)
    {
        $this->parentPortalService = $parentPortalService;
    }

    /**
     * Helper to retrieve validated student ID for parent user.
     */
    protected function getStudentId(Request $request)
    {
        $parentUserId = auth()->id();
        $requestedStudentId = $request->query('student_id');

        $studentId = $this->parentPortalService->getValidStudentId($parentUserId, $requestedStudentId);

        if (!$studentId) {
            abort(403, 'Unauthorized access or no child accounts associated with this parent user.');
        }

        return $studentId;
    }

    /**
     * Get attendance summary for dashboard widget.
     * GET /api/parent/attendance-summary
     */
    public function attendanceSummary(Request $request)
    {
        $studentId = $this->getStudentId($request);
        $result = $this->parentPortalService->getAttendanceSummary($studentId);

        return response()->json($result);
    }

    /**
     * Get assignment summary for dashboard widget.
     * GET /api/parent/assignment-summary
     */
    public function assignmentSummary(Request $request)
    {
        $studentId = $this->getStudentId($request);
        $result = $this->parentPortalService->getAssignmentSummary($studentId);

        return response()->json($result);
    }

    /**
     * Get assessment summary for dashboard widget.
     * GET /api/parent/assessment-summary
     */
    public function assessmentSummary(Request $request)
    {
        $studentId = $this->getStudentId($request);
        $result = $this->parentPortalService->getAssessmentSummary($studentId);

        return response()->json($result);
    }

    /**
     * Get Student360 summary for dashboard widget.
     * GET /api/parent/student360-summary
     */
    public function student360Summary(Request $request)
    {
        $studentId = $this->getStudentId($request);
        $result = $this->parentPortalService->getStudent360Summary($studentId);

        return response()->json($result);
    }

    /**
     * Get fees summary for dashboard widget.
     * GET /api/parent/fees-summary
     */
    public function feesSummary(Request $request)
    {
        $studentId = $this->getStudentId($request);
        $result = $this->parentPortalService->getFeesSummary($studentId);

        return response()->json($result);
    }
}
