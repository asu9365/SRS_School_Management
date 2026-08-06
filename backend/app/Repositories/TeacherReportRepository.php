<?php

namespace App\Repositories;

use App\Models\StudentClassAssignment;
use App\Models\Mark;
use App\Models\Attendance;
use App\Models\HomeworkSubmission;
use App\Models\StudentCompetency;

class TeacherReportRepository
{
    /**
     * Get students assigned to class/section.
     */
    public function getStudentsInClass($classRoomId, $sectionId)
    {
        return StudentClassAssignment::with('student')
            ->where('class_room_id', $classRoomId)
            ->where('section_id', $sectionId)
            ->get();
    }

    /**
     * Get all marks for a class.
     */
    public function getClassMarks($classRoomId, $sectionId)
    {
        return Mark::whereHas('assessment', function ($q) use ($classRoomId, $sectionId) {
            $q->where('class_room_id', $classRoomId)
              ->where('section_id', $sectionId)
              ->where('status', 'published');
        })->get();
    }

    /**
     * Get attendance records for a class.
     */
    public function getClassAttendance($classRoomId, $sectionId)
    {
        return Attendance::where('class_room_id', $classRoomId)
            ->where('section_id', $sectionId)
            ->get();
    }

    /**
     * Get competencies evaluated in a class.
     */
    public function getClassCompetencies($classRoomId, $sectionId)
    {
        return StudentCompetency::whereHas('student', function ($q) use ($classRoomId, $sectionId) {
            $q->whereHas('currentClassAssignment', function ($sq) use ($classRoomId, $sectionId) {
                $sq->where('class_room_id', $classRoomId)
                  ->where('section_id', $sectionId);
            });
        })->with('competency')->get();
    }
}
