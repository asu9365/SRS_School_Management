<?php

namespace App\Repositories;

use App\Models\AcademicSession;

class AcademicSessionRepository extends BaseRepository
{
    public function __construct(AcademicSession $session)
    {
        $this->model = $session;
    }

    /**
     * Get sessions ordered by date.
     */
    public function getOrderedSessions()
    {
        return $this->model->with('terms')
            ->orderByDesc('start_date')
            ->get();
    }

    /**
     * Reset other sessions from current status.
     */
    public function resetCurrentSessionsExcept($id)
    {
        $this->model->where('is_current', true)
            ->where('id', '!=', $id)
            ->update(['is_current' => false]);
    }

    /**
     * Get active current session.
     */
    public function getCurrentSession()
    {
        return $this->model->current()->with('terms')->first();
    }
}
