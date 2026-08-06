<?php

namespace App\Repositories;

use App\Models\Assessment;

class AssessmentRepository extends BaseRepository
{
    public function __construct(Assessment $assessment)
    {
        $this->model = $assessment;
    }

    /**
     * Get filtered assessments.
     */
    public function getFilteredAssessments(array $filters)
    {
        $query = $this->model->with(['classRoom', 'section', 'subjectRelation']);

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

        return $query->orderByDesc('exam_date')->get();
    }
}
