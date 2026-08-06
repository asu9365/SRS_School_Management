<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    protected $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * Submit a new leave application.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:medical,casual,sick,personal,other',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
        ]);

        $result = $this->attendanceService->submitLeave($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Leave application submitted successfully.',
            'data' => $result['data'],
        ], 201);
    }

    /**
     * Get leaves list.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['user_id', 'status']);
        $leaves = $this->attendanceService->getLeaves($filters);

        return response()->json([
            'success' => true,
            'data' => $leaves,
        ]);
    }

    /**
     * Approve a leave application.
     */
    public function approve(Request $request, $id)
    {
        $request->validate(['remarks' => 'nullable|string']);
        $result = $this->attendanceService->handleLeaveDecision($id, 'approved', $request->remarks);

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Leave approved successfully.',
            'data' => $result['data'],
        ]);
    }

    /**
     * Reject a leave application.
     */
    public function reject(Request $request, $id)
    {
        $request->validate(['remarks' => 'nullable|string']);
        $result = $this->attendanceService->handleLeaveDecision($id, 'rejected', $request->remarks);

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Leave rejected successfully.',
            'data' => $result['data'],
        ]);
    }
}
