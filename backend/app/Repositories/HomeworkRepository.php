<?php

namespace App\Repositories;

use App\Models\Homework;

class HomeworkRepository extends BaseRepository
{
    public function __construct(Homework $homework)
    {
        $this->model = $homework;
    }

    /**
     * Get homework list with filters.
     */
    public function getFilteredHomework(array $filters)
    {
        $query = $this->model->with(['classRoom', 'section', 'subjectRelation', 'teacher']);

        if (!empty($filters['class_room_id'])) {
            $query->where('class_room_id', $filters['class_room_id']);
        }

        if (!empty($filters['section_id'])) {
            $query->where('section_id', $filters['section_id']);
        }

        if (!empty($filters['subject_id'])) {
            $query->where('subject_id', $filters['subject_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderByDesc('created_at')->get();
    }
}
