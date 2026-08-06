<?php

namespace App\Repositories;

use App\Models\LessonPlan;

class LessonPlanRepository extends BaseRepository
{
    public function __construct(LessonPlan $lessonPlan)
    {
        $this->model = $lessonPlan;
    }

    /**
     * Get lesson plans.
     */
    public function getLessonPlansForTeacher($teacherId, array $filters = [])
    {
        $query = $this->model->with(['classRoom', 'section', 'subject'])
            ->where('teacher_id', $teacherId);

        if (!empty($filters['class_room_id'])) {
            $query->where('class_room_id', $filters['class_room_id']);
        }

        if (!empty($filters['subject_id'])) {
            $query->where('subject_id', $filters['subject_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderByDesc('date')->get();
    }
}
