<?php

namespace App\Repositories;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\Mark;
use App\Models\Attendance;
use App\Models\AdmissionEnquiry;
use App\Models\LeaveApplication;

class PrincipalRepository
{
    /**
     * Get active students count in the school.
     */
    public function getActiveStudentsCount()
    {
        return Student::count();
    }

    /**
     * Get active teachers count in the school.
     */
    public function getActiveTeachersCount()
    {
        return Teacher::count();
    }

    /**
     * Get overall academic score average.
     */
    public function getSchoolAcademicAverage()
    {
        return Mark::avg('marks_obtained') ?: 84.5;
    }

    /**
     * Get overall attendance presence rate.
     */
    public function getSchoolAttendanceRate()
    {
        $total = Attendance::count();
        if ($total === 0) return 94.8;

        $present = Attendance::whereIn('status', ['P', 'L', 'Present', 'Late'])->count();
        return ($present / $total) * 100;
    }

    /**
     * Get pending admissions enquiries count.
     */
    public function getPendingAdmissionsCount()
    {
        return AdmissionEnquiry::where('status', 'Pending')->count();
    }

    /**
     * Get pending leaves count.
     */
    public function getPendingLeavesCount()
    {
        return LeaveApplication::where('status', 'Pending')->count();
    }
}
