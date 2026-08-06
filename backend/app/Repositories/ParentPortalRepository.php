<?php

namespace App\Repositories;

use App\Models\GuardianDetail;
use App\Models\Student;

class ParentPortalRepository
{
    /**
     * Get students linked to a parent's user account.
     */
    public function getLinkedStudents($parentUserId)
    {
        $studentIds = GuardianDetail::where('user_id', $parentUserId)->pluck('student_id');
        
        return Student::with(['currentClassAssignment.classRoom', 'currentClassAssignment.section'])
            ->whereIn('id', $studentIds)
            ->get();
    }
}
