<?php

namespace App\Repositories;

use App\Models\Attendance;

class AttendanceRepository extends BaseRepository
{
    public function __construct(Attendance $attendance)
    {
        $this->model = $attendance;
    }

    /**
     * Get attendance records with filters.
     */
    public function getFilteredAttendance(array $filters)
    {
        $query = $this->model->newQuery();

        if (!empty($filters['class_room_id'])) {
            $query->where('class_room_id', $filters['class_room_id']);
        }

        if (!empty($filters['section_id'])) {
            $query->where('section_id', $filters['section_id']);
        }

        if (!empty($filters['date'])) {
            $query->where('date', $filters['date']);
        }

        return $query->get();
    }

    /**
     * Find a student's attendance on date.
     */
    public function findRecord($userId, $date)
    {
        return $this->model->where('user_id', $userId)
            ->where('date', $date)
            ->first();
    }
}
