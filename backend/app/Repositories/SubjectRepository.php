<?php

namespace App\Repositories;

use App\Models\Subject;

class SubjectRepository extends BaseRepository
{
    public function __construct(Subject $subject)
    {
        $this->model = $subject;
    }

    /**
     * Get filtered subjects list.
     */
    public function getFilteredSubjects(array $filters)
    {
        $query = $this->model->with('classRoom');

        if (!empty($filters['class_room_id'])) {
            $query->where('class_room_id', $filters['class_room_id']);
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        return $query->orderBy('name')->get();
    }
}
