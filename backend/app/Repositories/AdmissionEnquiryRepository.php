<?php

namespace App\Repositories;

use App\Models\AdmissionEnquiry;

class AdmissionEnquiryRepository extends BaseRepository
{
    public function __construct(AdmissionEnquiry $enquiry)
    {
        $this->model = $enquiry;
    }

    /**
     * Get admission enquiries.
     */
    public function getEnquiries(array $filters = [])
    {
        $query = $this->model->with('classRoom');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['class_room_id'])) {
            $query->where('class_room_id', $filters['class_room_id']);
        }

        return $query->orderByDesc('created_at')->get();
    }
}
