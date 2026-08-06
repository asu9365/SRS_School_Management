<?php

namespace App\Http\Controllers;

use App\Models\TimetableSlot;
use App\Services\TimetableService;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    protected $timetableService;

    public function __construct(TimetableService $timetableService)
    {
        $this->timetableService = $timetableService;
    }

    /**
     * Get timetable for a class/section.
     */
    public function index(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'academic_session_id' => 'nullable|exists:academic_sessions,id',
        ]);

        $grouped = $this->timetableService->getTimetableForClass(
            $request->class_room_id,
            $request->section_id,
            $request->academic_session_id
        );

        return response()->json([
            'success' => true,
            'data' => $grouped,
        ]);
    }

    /**
     * Get timetable for a specific teacher.
     */
    public function teacherTimetable(Request $request, $teacherId)
    {
        $grouped = $this->timetableService->getTimetableForTeacher($teacherId, $request->academic_session_id);

        return response()->json([
            'success' => true,
            'data' => $grouped,
        ]);
    }

    /**
     * Create or update a timetable slot.
     */
    public function store(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:users,id',
            'day' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'room_number' => 'nullable|string',
            'academic_session_id' => 'required|exists:academic_sessions,id',
        ]);

        $slot = $this->timetableService->createSlot($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Timetable slot created successfully.',
            'data' => $slot->load(['subject', 'teacher']),
        ], 201);
    }

    /**
     * Bulk create timetable slots.
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'slots' => 'required|array|min:1',
            'slots.*.class_room_id' => 'required|exists:class_rooms,id',
            'slots.*.section_id' => 'required|exists:sections,id',
            'slots.*.subject_id' => 'required|exists:subjects,id',
            'slots.*.teacher_id' => 'required|exists:users,id',
            'slots.*.day' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'slots.*.start_time' => 'required|date_format:H:i',
            'slots.*.end_time' => 'required|date_format:H:i',
            'slots.*.room_number' => 'nullable|string',
            'slots.*.academic_session_id' => 'required|exists:academic_sessions,id',
        ]);

        $created = $this->timetableService->createBulkSlots($request->slots);

        return response()->json([
            'success' => true,
            'message' => count($created) . ' timetable slots created successfully.',
            'data' => $created,
        ], 201);
    }

    /**
     * Update a timetable slot.
     */
    public function update(Request $request, TimetableSlot $timetableSlot)
    {
        $request->validate([
            'subject_id' => 'sometimes|exists:subjects,id',
            'teacher_id' => 'sometimes|exists:users,id',
            'day' => 'sometimes|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i',
            'room_number' => 'nullable|string',
        ]);

        $updated = $this->timetableService->updateSlot($timetableSlot->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Timetable slot updated successfully.',
            'data' => $updated->load(['subject', 'teacher']),
        ]);
    }

    /**
     * Delete a timetable slot.
     */
    public function destroy(TimetableSlot $timetableSlot)
    {
        $this->timetableService->deleteSlot($timetableSlot->id);

        return response()->json([
            'success' => true,
            'message' => 'Timetable slot deleted successfully.',
        ]);
    }

    /**
     * Clear entire timetable for a class/section in a session.
     */
    public function clear(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'academic_session_id' => 'required|exists:academic_sessions,id',
        ]);

        $deleted = $this->timetableService->clearClassTimetable(
            $request->class_room_id,
            $request->section_id,
            $request->academic_session_id
        );

        return response()->json([
            'success' => true,
            'message' => "{$deleted} timetable slots cleared.",
        ]);
    }
}

