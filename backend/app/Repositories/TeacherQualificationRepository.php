<?php

namespace App\Repositories;

use App\Models\TeacherQualification;

class TeacherQualificationRepository extends BaseRepository
{
    public function __construct(TeacherQualification $qualification)
    {
        $this->model = $qualification;
    }

    /**
     * Fetch teacher qualifications.
     */
    public function getQualificationsByTeacherId($teacherId)
    {
        return $this->model->where('teacher_id', $teacherId)->get();
    }
}
