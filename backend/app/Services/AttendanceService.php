<?php

namespace App\Services;

use App\Repositories\AttendanceRepository;
use App\Repositories\TeacherAttendanceRepository;
use App\Repositories\LeaveApplicationRepository;
use App\Models\AcademicSession;
use Illuminate\Support\Facades\Gate;

class AttendanceService
{
    protected $attendanceRepository;
    protected $teacherAttendanceRepository;
    protected $leaveRepository;
    protected $timelineService;

    public function __construct(
        AttendanceRepository $attendanceRepository,
        TeacherAttendanceRepository $teacherAttendanceRepository,
        LeaveApplicationRepository $leaveRepository,
        TimelineService $timelineService
    ) {
        $this->attendanceRepository = $attendanceRepository;
        $this->teacherAttendanceRepository = $teacherAttendanceRepository;
        $this->leaveRepository = $leaveRepository;
        $this->timelineService = $timelineService;
    }

    // --- Student Daily Attendance ---

    /**
     * Mark daily attendance for a student.
     */
    public function markStudentAttendance(array $data)
    {
        $userId = $data['user_id'];
        $date = $data['date'] ?? now()->toDateString();

        // Check if there is an existing record
        $existing = $this->attendanceRepository->findRecord($userId, $date);

        if ($existing) {
            // Check Cutoff rule: locked after 24 hours of creation unless Admin/Principal
            $createdAt = $existing->created_at;
            if (now()->diffInHours($createdAt) > 24) {
                // Ensure auth user has principal/admin roles
                if (!auth()->user()->hasAnyRole(['Super Admin', 'Admin', 'Principal'])) {
                    return [
                        'success' => false,
                        'message' => 'Attendance is locked. Only Admin or Principal can modify records older than 24 hours.'
                    ];
                }
            }

            // Update record
            $existing->update([
                'status' => $data['status'],
                'remarks' => $data['remarks'] ?? null,
            ]);

            // Timeline log
            if ($data['status'] === 'A' || $data['status'] === 'L') {
                $this->timelineService->logEvent(
                    $existing->student->studentProfile->id ?? $userId,
                    'attendance',
                    'Attendance Modified',
                    "Attendance status updated to: " . ($data['status'] === 'A' ? 'Absent' : 'Late')
                );
            }

            return ['success' => true, 'data' => $existing];
        }

        // Create new record
        $record = $this->attendanceRepository->create([
            'user_id' => $userId,
            'class_room_id' => $data['class_room_id'],
            'section_id' => $data['section_id'],
            'date' => $date,
            'status' => $data['status'],
            'remarks' => $data['remarks'] ?? null,
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        return ['success' => true, 'data' => $record];
    }

    /**
     * List daily student attendance with filters.
     */
    public function getStudentAttendanceList(array $filters)
    {
        return $this->attendanceRepository->getFilteredAttendance($filters);
    }

    // --- Teacher Attendance ---

    /**
     * Mark attendance for a teacher.
     */
    public function markTeacherAttendance(array $data)
    {
        $teacherId = $data['teacher_id'];
        $date = $data['date'] ?? now()->toDateString();

        $existing = $this->teacherAttendanceRepository->findRecord($teacherId, $date);

        if ($existing) {
            $existing->update([
                'status' => $data['status'],
                'remarks' => $data['remarks'] ?? null,
            ]);
            return ['success' => true, 'data' => $existing];
        }

        $record = $this->teacherAttendanceRepository->create([
            'teacher_id' => $teacherId,
            'date' => $date,
            'status' => $data['status'],
            'remarks' => $data['remarks'] ?? null,
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        return ['success' => true, 'data' => $record];
    }

    // --- Leave Application Management ---

    /**
     * Submit leave application.
     */
    public function submitLeave(array $data)
    {
        $leave = $this->leaveRepository->create([
            'user_id' => auth()->id(),
            'type' => $data['type'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'reason' => $data['reason'],
            'status' => 'pending',
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        return ['success' => true, 'data' => $leave];
    }

    /**
     * Get leave requests list.
     */
    public function getLeaves(array $filters = [])
    {
        return $this->leaveRepository->getLeavesWithUser($filters);
    }

    /**
     * Approve or reject a leave application.
     */
    public function handleLeaveDecision($leaveId, string $status, string $remarks = null)
    {
        $leave = $this->leaveRepository->find($leaveId);
        if (!$leave) {
            return ['success' => false, 'message' => 'Leave application not found.'];
        }

        $leave->update([
            'status' => $status,
            'approved_by' => auth()->id(),
            'remarks' => $remarks,
        ]);

        // If it is a student leave, add to their timeline
        $student = \App\Models\Student::where('user_id', $leave->user_id)->first();
        if ($student) {
            $this->timelineService->logEvent(
                $student->id,
                'attendance',
                'Leave Approved',
                "Approved leave request from {$leave->start_date->format('Y-m-d')} to {$leave->end_date->format('Y-m-d')}."
            );
        }

        return ['success' => true, 'data' => $leave];
    }
}
