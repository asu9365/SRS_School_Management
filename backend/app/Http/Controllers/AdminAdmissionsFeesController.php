<?php

namespace App\Http\Controllers;

use App\Services\AdminAdmissionsFeesService;
use Illuminate\Http\Request;

class AdminAdmissionsFeesController extends Controller
{
    protected $admissionsFeesService;

    public function __construct(AdminAdmissionsFeesService $admissionsFeesService)
    {
        $this->admissionsFeesService = $admissionsFeesService;
    }

    /**
     * Get admissions general pipeline stats.
     * GET /api/admin/admissions
     */
    public function admissionsSummary(Request $request)
    {
        $result = $this->admissionsFeesService->getAdmissionsSummary();
        return response()->json($result);
    }

    /**
     * Get admission enquiries applications lists.
     * GET /api/admin/admissions/applications
     */
    public function applicationsList(Request $request)
    {
        $result = $this->admissionsFeesService->getApplicationsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get document verifications.
     * GET /api/admin/admissions/verification
     */
    public function documentVerifications(Request $request)
    {
        $result = $this->admissionsFeesService->getVerifications();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get merit scoring rank indexes.
     * GET /api/admin/admissions/merit
     */
    public function meritList(Request $request)
    {
        $result = $this->admissionsFeesService->getMeritList();
        return response()->json($result);
    }

    /**
     * Allocate classroom seats.
     * POST /api/admin/admissions/allocate-seats
     */
    public function allocateSeats(Request $request)
    {
        $result = $this->admissionsFeesService->allocateSeats($request->all());
        return response()->json($result);
    }

    /**
     * Complete enrollment setup.
     * POST /api/admin/admissions/enroll
     */
    public function enrollStudent(Request $request)
    {
        $result = $this->admissionsFeesService->enrollStudent($request->all());
        return response()->json($result);
    }

    /**
     * Get admissions waiting lists registry.
     * GET /api/admin/admissions/waitlist
     */
    public function waitlist(Request $request)
    {
        $result = $this->admissionsFeesService->getWaitlist();
        return response()->json($result);
    }

    /**
     * Get fee structures.
     * GET /api/admin/fees
     */
    public function feesSummary(Request $request)
    {
        $result = $this->admissionsFeesService->getFeesSummary();
        return response()->json($result);
    }

    /**
     * Get invoice listings details.
     * GET /api/admin/fees/invoices
     */
    public function invoicesList(Request $request)
    {
        $result = $this->admissionsFeesService->getInvoices();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get payments transactions logs list.
     * GET /api/admin/fees/payments
     */
    public function paymentsList(Request $request)
    {
        $result = $this->admissionsFeesService->getPayments();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Create invoice bills.
     * POST /api/admin/fees/invoices
     */
    public function createInvoice(Request $request)
    {
        $result = $this->admissionsFeesService->createInvoice($request->all());
        return response()->json($result);
    }

    /**
     * Record fee payment receipt transaction.
     * POST /api/admin/fees/payments
     */
    public function recordPayment(Request $request)
    {
        $result = $this->admissionsFeesService->recordPayment($request->all());
        return response()->json($result);
    }

    /**
     * Get fee reliefs list.
     * GET /api/admin/fees/scholarships
     */
    public function scholarshipsList(Request $request)
    {
        $result = $this->admissionsFeesService->getFeesScholarships();
        return response()->json($result);
    }

    /**
     * Get issued billing refund entries logs.
     * GET /api/admin/fees/refunds
     */
    public function refundsList(Request $request)
    {
        $result = $this->admissionsFeesService->getRefunds();
        return response()->json($result);
    }

    /**
     * Get unpaid bills balances totals.
     * GET /api/admin/fees/outstanding
     */
    public function outstandingFees(Request $request)
    {
        $result = $this->admissionsFeesService->getOutstandingFees();
        return response()->json($result);
    }

    /**
     * Get timetables schedules settings.
     * GET /api/admin/timetable
     */
    public function timetable(Request $request)
    {
        $result = $this->admissionsFeesService->getTimetable();
        return response()->json($result);
    }

    /**
     * Generate class timetables schedules.
     * POST /api/admin/timetable/generate
     */
    public function generateTimetable(Request $request)
    {
        $result = $this->admissionsFeesService->generateTimetable();
        return response()->json($result);
    }

    /**
     * Get class timetable schedule details.
     * GET /api/admin/timetable/classes/{id}
     */
    public function classTimetable($id)
    {
        $result = $this->admissionsFeesService->getClassTimetable($id);
        return response()->json($result);
    }

    /**
     * Get teacher timetable roster.
     * GET /api/admin/timetable/teachers/{id}
     */
    public function teacherTimetable($id)
    {
        $result = $this->admissionsFeesService->getTeacherTimetable($id);
        return response()->json($result);
    }

    /**
     * Get substitute teacher rosters.
     * GET /api/admin/timetable/substitutions
     */
    public function substitutions(Request $request)
    {
        $result = $this->admissionsFeesService->getSubstitutions();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get scheduling conflict checks warnings.
     * GET /api/admin/timetable/conflicts
     */
    public function conflicts(Request $request)
    {
        $result = $this->admissionsFeesService->getConflicts();
        return response()->json($result);
    }

    /**
     * Publish master scheduling templates lists.
     * POST /api/admin/timetable/publish
     */
    public function publishTimetable(Request $request)
    {
        $result = $this->admissionsFeesService->publishTimetable();
        return response()->json($result);
    }
}
