<?php

namespace App\Repositories;

use App\Models\LeaveApplication;

class LeaveApplicationRepository extends BaseRepository
{
    public function __construct(LeaveApplication $leave)
    {
        $this->model = $leave;
    }

    /**
     * Get leaves with user relation.
     */
    public function getLeavesWithUser(array $filters = [])
    {
        $query = $this->model->with('user');

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderByDesc('created_at')->get();
    }
}
