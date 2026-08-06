<?php

namespace App\Repositories;

use App\Models\ClassRoom;

class ClassRoomRepository extends BaseRepository
{
    public function __construct(ClassRoom $classRoom)
    {
        $this->model = $classRoom;
    }

    /**
     * Get classes with sections ordered by hierarchy.
     */
    public function getClassesWithSections()
    {
        return $this->model->with('sections')
            ->orderBy('numeric_level')
            ->get();
    }
}
