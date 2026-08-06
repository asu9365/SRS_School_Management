<?php

namespace App\Repositories;

use App\Models\TeacherProfile;

class TeacherProfileRepository extends BaseRepository
{
    public function __construct(TeacherProfile $profile)
    {
        $this->model = $profile;
    }

    /**
     * Fetch teacher profile by teacher user ID.
     */
    public function getProfileByTeacherId($teacherId)
    {
        return $this->model->where('teacher_id', $teacherId)->first();
    }
}
