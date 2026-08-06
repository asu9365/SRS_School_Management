<?php

namespace App\Repositories;

use App\Models\StudentAchievement;

class StudentAchievementRepository extends BaseRepository
{
    public function __construct(StudentAchievement $achievement)
    {
        $this->model = $achievement;
    }

    /**
     * Get student achievements list.
     */
    public function getAchievementsForStudent($studentId)
    {
        return $this->model->where('student_id', $studentId)
            ->orderByDesc('event_date')
            ->get();
    }
}
