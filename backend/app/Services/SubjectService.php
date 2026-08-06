<?php

namespace App\Services;

use App\Repositories\SubjectRepository;
use App\Models\SubjectTeacherAssignment;

class SubjectService
{
    protected $subjectRepository;

    public function __construct(SubjectRepository $subjectRepository)
    {
        $this->subjectRepository = $subjectRepository;
    }

    public function listSubjects(array $filters)
    {
        return $this->subjectRepository->getFilteredSubjects($filters);
    }

    public function getSubject($id)
    {
        $subject = $this->subjectRepository->find($id);
        return $subject ? $subject->load(['classRoom', 'subjectTeacherAssignments.teacher', 'subjectTeacherAssignments.section']) : null;
    }

    public function createSubject(array $data)
    {
        return $this->subjectRepository->create($data);
    }

    public function updateSubject($id, array $data)
    {
        return $this->subjectRepository->update($id, $data);
    }

    public function deleteSubject($id)
    {
        return $this->subjectRepository->delete($id);
    }

    /**
     * Assign teacher to subject section.
     */
    public function assignTeacher(array $data)
    {
        return SubjectTeacherAssignment::updateOrCreate(
            [
                'subject_id' => $data['subject_id'],
                'class_room_id' => $data['class_room_id'],
                'section_id' => $data['section_id'],
                'academic_session_id' => $data['academic_session_id'],
            ],
            [
                'teacher_id' => $data['teacher_id'],
            ]
        );
    }

    /**
     * List all assignments.
     */
    public function getAssignments($sessionId)
    {
        return SubjectTeacherAssignment::with(['subject', 'classRoom', 'section', 'teacher'])
            ->where('academic_session_id', $sessionId)
            ->get();
    }
}
