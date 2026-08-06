<?php

namespace App\Repositories;

use App\Models\Appointment;

class AppointmentRepository extends BaseRepository
{
    public function __construct(Appointment $appointment)
    {
        $this->model = $appointment;
    }

    /**
     * Get appointments.
     */
    public function getFilteredAppointments(array $filters)
    {
        $query = $this->model->with(['parent.studentProfile', 'teacher']);

        if (!empty($filters['parent_id'])) {
            $query->where('parent_id', $filters['parent_id']);
        }

        if (!empty($filters['teacher_id'])) {
            $query->where('teacher_id', $filters['teacher_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderByDesc('scheduled_at')->get();
    }
}
