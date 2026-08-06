<?php

namespace App\Repositories;

use App\Models\StudentIntervention;

class StudentInterventionRepository extends BaseRepository
{
    public function __construct(StudentIntervention $intervention)
    {
        $this->model = $intervention;
    }

    /**
     * Get intervention logs for student.
     */
    public function getInterventionsForStudent($studentId)
    {
        return $this->model->with('assignedStaff')
            ->where('student_id', $studentId)
            ->orderByDesc('start_date')
            ->get();
    }
}
