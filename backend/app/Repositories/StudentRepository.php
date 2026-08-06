<?php

namespace App\Repositories;

use App\Models\Student;

class StudentRepository extends BaseRepository
{
    public function __construct(Student $student)
    {
        $this->model = $student;
    }

    /**
     * Get students query builder with relations.
     */
    public function getStudentsQuery(array $filters = [])
    {
        $query = $this->model->with([
            'user', 'currentClassAssignment.classRoom', 
            'currentClassAssignment.section', 'primaryGuardian'
        ]);

        if (!empty($filters['name'])) {
            $name = $filters['name'];
            $query->where(function ($q) use ($name) {
                $q->where('Fname', 'like', "%{$name}%")
                  ->orWhere('Lname', 'like', "%{$name}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->byStatus($filters['status']);
        } else {
            $query->active();
        }

        if (!empty($filters['class_room_id'])) {
            $query->whereHas('currentClassAssignment', function ($q) use ($filters) {
                $q->where('class_room_id', $filters['class_room_id']);
                if (!empty($filters['section_id'])) {
                    $q->where('section_id', $filters['section_id']);
                }
            });
        }

        return $query;
    }
}
