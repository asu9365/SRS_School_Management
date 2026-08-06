<?php

namespace App\Repositories;

use App\Models\TimetableSlot;

class TimetableSlotRepository extends BaseRepository
{
    public function __construct(TimetableSlot $slot)
    {
        $this->model = $slot;
    }

    /**
     * Get timetable slots grouped by day for a class/section.
     */
    public function getClassTimetable($classRoomId, $sectionId, $sessionId)
    {
        return $this->model->with(['subject', 'teacher'])
            ->where('class_room_id', $classRoomId)
            ->where('section_id', $sectionId)
            ->where('academic_session_id', $sessionId)
            ->orderByRaw("FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')")
            ->orderBy('start_time')
            ->get();
    }

    /**
     * Get timetable slots grouped by day for a teacher.
     */
    public function getTeacherTimetable($teacherId, $sessionId)
    {
        return $this->model->with(['subject', 'classRoom', 'section'])
            ->where('teacher_id', $teacherId)
            ->where('academic_session_id', $sessionId)
            ->orderByRaw("FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')")
            ->orderBy('start_time')
            ->get();
    }

    /**
     * Clear all timetable slots for class/section in a session.
     */
    public function clearSlots($classRoomId, $sectionId, $sessionId)
    {
        return $this->model->where('class_room_id', $classRoomId)
            ->where('section_id', $sectionId)
            ->where('academic_session_id', $sessionId)
            ->delete();
    }
}
