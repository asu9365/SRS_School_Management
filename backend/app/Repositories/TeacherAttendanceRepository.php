<?php

namespace App\Repositories;

use App\Models\TeacherAttendance;

class TeacherAttendanceRepository extends BaseRepository
{
    public function __construct(TeacherAttendance $attendance)
    {
        $this->model = $attendance;
    }

    /**
     * Find teacher attendance on date.
     */
    public function findRecord($teacherId, $date)
    {
        return $this->model->where('teacher_id', $teacherId)
            ->where('date', $date)
            ->first();
    }
}
