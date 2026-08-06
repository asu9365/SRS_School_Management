<?php

namespace App\Repositories;

use App\Models\Notice;

class NoticeRepository extends BaseRepository
{
    public function __construct(Notice $notice)
    {
        $this->model = $notice;
    }

    /**
     * Get filtered notices.
     */
    public function getFilteredNotices(array $filters)
    {
        $query = $this->model->newQuery();

        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        // Active check: publish date passed and not expired
        $query->where(function ($q) {
            $q->whereNull('expiry_date')
              ->orWhere('expiry_date', '>', now());
        });

        return $query->orderByDesc('publish_date')->orderByDesc('created_at')->get();
    }
}
