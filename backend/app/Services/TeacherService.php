<?php

namespace App\Services;

use App\Repositories\TeacherRepository;

class TeacherService
{
    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository)
    {
        $this->teacherRepository = $teacherRepository;
    }

    public function queryTeachers()
    {
        return $this->teacherRepository->all();
    }

    public function createTeacher(array $data)
    {
        return $this->teacherRepository->create($data);
    }

    public function updateTeacher($id, array $data)
    {
        return $this->teacherRepository->update($id, $data);
    }

    public function deleteTeacher($id)
    {
        return $this->teacherRepository->delete($id);
    }
}
