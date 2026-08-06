<?php

namespace App\Services;

use App\Repositories\TimetableSlotRepository;
use App\Models\AcademicSession;

class TimetableService
{
    protected $timetableRepository;

    public function __construct(TimetableSlotRepository $timetableRepository)
    {
        $this->timetableRepository = $timetableRepository;
    }

    /**
     * Get class timetable grouped by day.
     */
    public function getTimetableForClass($classRoomId, $sectionId, $sessionId = null)
    {
        $sessionId = $sessionId ?? AcademicSession::current()->value('id');
        if (!$sessionId) return collect();

        return $this->timetableRepository->getClassTimetable($classRoomId, $sectionId, $sessionId)->groupBy('day');
    }

    /**
     * Get teacher timetable grouped by day.
     */
    public function getTimetableForTeacher($teacherId, $sessionId = null)
    {
        $sessionId = $sessionId ?? AcademicSession::current()->value('id');
        if (!$sessionId) return collect();

        return $this->timetableRepository->getTeacherTimetable($teacherId, $sessionId)->groupBy('day');
    }

    /**
     * Create a new slot.
     */
    public function createSlot(array $data)
    {
        return $this->timetableRepository->create($data);
    }

    /**
     * Bulk create slots.
     */
    public function createBulkSlots(array $slots)
    {
        $created = [];
        foreach ($slots as $slotData) {
            $created[] = $this->timetableRepository->create($slotData);
        }
        return $created;
    }

    /**
     * Update slot.
     */
    public function updateSlot($id, array $data)
    {
        return $this->timetableRepository->update($id, $data);
    }

    /**
     * Delete slot.
     */
    public function deleteSlot($id)
    {
        return $this->timetableRepository->delete($id);
    }

    /**
     * Clear all slots.
     */
    public function clearClassTimetable($classRoomId, $sectionId, $sessionId)
    {
        return $this->timetableRepository->clearSlots($classRoomId, $sectionId, $sessionId);
    }
}
