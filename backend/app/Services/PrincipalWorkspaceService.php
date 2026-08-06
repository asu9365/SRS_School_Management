<?php

namespace App\Services;

use App\Repositories\PrincipalRepository;
use App\Services\AIService;

class PrincipalWorkspaceService
{
    protected $principalRepository;
    protected $aiService;

    public function __construct(
        PrincipalRepository $principalRepository,
        AIService $aiService
    ) {
        $this->principalRepository = $principalRepository;
        $this->aiService = $aiService;
    }

    /**
     * Compile school command dashboard stats.
     */
    public function getDashboardSummary()
    {
        $studentsCount = $this->principalRepository->getActiveStudentsCount();
        $teachersCount = $this->principalRepository->getActiveTeachersCount();
        $academicAvg = $this->principalRepository->getSchoolAcademicAverage();
        $attendanceRate = $this->principalRepository->getSchoolAttendanceRate();
        $pendingAdmissions = $this->principalRepository->getPendingAdmissionsCount();

        return [
            'success' => true,
            'data' => [
                'active_students' => $studentsCount,
                'active_teachers' => $teachersCount,
                'academic_average' => round($academicAvg, 2),
                'attendance_rate' => round($attendanceRate, 2),
                'pending_admissions_count' => $pendingAdmissions,
                'active_classes_count' => 12, // simulated classrooms count
                'financials' => [
                    'revenue_collected' => 840000,
                    'dues_outstanding' => 125000,
                    'fiscal_status' => 'Stable',
                ]
            ]
        ];
    }

    /**
     * Compute school composite health score index.
     */
    public function getSchoolHealthScore()
    {
        $summary = $this->getDashboardSummary();
        $academicAvg = $summary['data']['academic_average'] ?? 80;
        $attendanceRate = $summary['data']['attendance_rate'] ?? 90;

        // Health formula: simple average of academic scores and attendance presence rate
        $healthIndex = round(($academicAvg + $attendanceRate) / 2, 2);

        return [
            'success' => true,
            'data' => [
                'health_index' => $healthIndex,
                'health_label' => $healthIndex >= 85 ? 'Outstanding' : ($healthIndex >= 70 ? 'Excellent' : 'Needs Intervention'),
                'academic_index' => $academicAvg,
                'operations_index' => $attendanceRate,
            ]
        ];
    }

    /**
     * AI advisory observations on the school.
     */
    public function getExecutiveSummary()
    {
        $summary = $this->getDashboardSummary();
        $studentsCount = $summary['data']['active_students'] ?? 0;
        $academicAvg = $summary['data']['academic_average'] ?? 0;
        $attendanceRate = $summary['data']['attendance_rate'] ?? 0;

        // Construct dynamic comment
        $comment = "Digital command analytics indicates St. Robert's has {$studentsCount} active students with a school-wide academic average of {$academicAvg}% and a presence rate of {$attendanceRate}%. General operations are highly stable.";

        return [
            'success' => true,
            'data' => [
                'summary' => $comment,
                'advisory_notes' => [
                    'Recommendation: Class VIII-A attendance has dropped by 4%. Suggest reviewing counselor logs.',
                    'Advisory: 12 new admission enquiries pending review.'
                ]
            ]
        ];
    }

    /**
     * Compile actions/approvals waiting principal review.
     */
    public function getDashboardAlerts()
    {
        $pendingLeaves = $this->principalRepository->getPendingLeavesCount();
        $pendingAdmissions = $this->principalRepository->getPendingAdmissionsCount();

        $alertsList = [];

        if ($pendingLeaves > 0) {
            $alertsList[] = [
                'type' => 'leaves_pending',
                'title' => 'Leave Applications Approval',
                'count' => $pendingLeaves,
                'message' => "You have {$pendingLeaves} staff/student leave requests waiting for executive authorization.",
            ];
        }

        if ($pendingAdmissions > 0) {
            $alertsList[] = [
                'type' => 'admissions_pending',
                'title' => 'Admission Enquiries Review',
                'count' => $pendingAdmissions,
                'message' => "There are {$pendingAdmissions} new admission enquiries waiting in the pipeline.",
            ];
        }

        return [
            'success' => true,
            'data' => $alertsList,
        ];
    }
}
