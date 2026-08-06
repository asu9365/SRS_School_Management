<?php

namespace App\Repositories;

use App\Models\StudentTimelineEvent;

class StudentTimelineRepository extends BaseRepository
{
    public function __construct(StudentTimelineEvent $event)
    {
        $this->model = $event;
    }

    /**
     * Get timeline events for a student.
     */
    public function getStudentTimeline($studentId)
    {
        return $this->model->where('student_id', $studentId)
            ->orderByDesc('event_date')
            ->orderByDesc('created_at')
            ->get();
    }
}
