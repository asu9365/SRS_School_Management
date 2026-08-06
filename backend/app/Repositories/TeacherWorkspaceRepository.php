<?php

namespace App\Repositories;

use App\Models\TimetableSlot;
use App\Models\SubjectTeacherAssignment;
use App\Models\ClassTeacherAssignment;

class TeacherWorkspaceRepository
{
    /**
     * Get timetable slots for teacher.
     */
    public function getTimetableSlotsForTeacher($teacherId, $dayOfWeek = null)
    {
        $query = TimetableSlot::with(['classRoom', 'section', 'subject'])
            ->where('teacher_id', $teacherId);

        if ($dayOfWeek) {
            $query->where('day_of_week', $dayOfWeek);
        }

        return $query->orderBy('start_time')->get();
    }

    /**
     * Get subject assignments for teacher.
     */
    public function getSubjectTeacherAssignments($teacherId)
    {
        return SubjectTeacherAssignment::with(['classRoom', 'section', 'subject'])
            ->where('user_id', $teacherId)
            ->get();
    }

    /**
     * Get class teacher assignments for teacher.
     */
    public function getClassTeacherAssignments($teacherId)
    {
        return ClassTeacherAssignment::with(['classRoom', 'section'])
            ->where('user_id', $teacherId)
            ->get();
    }
}
