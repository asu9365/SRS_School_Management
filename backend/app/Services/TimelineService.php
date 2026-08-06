<?php

namespace App\Services;

use App\Repositories\StudentTimelineRepository;

class TimelineService
{
    protected $timelineRepository;

    public function __construct(StudentTimelineRepository $timelineRepository)
    {
        $this->timelineRepository = $timelineRepository;
    }

    /**
     * Record a student event in the timeline.
     */
    public function logEvent($studentId, string $type, string $title, string $description = null, $date = null)
    {
        return $this->timelineRepository->create([
            'student_id' => $studentId,
            'event_type' => $type,
            'title' => $title,
            'description' => $description,
            'event_date' => $date ?? now()->toDateString(),
        ]);
    }

    /**
     * Fetch all chronological events for a student.
     */
    public function getTimeline($studentId)
    {
        return $this->timelineRepository->getStudentTimeline($studentId);
    }
}
