<?php

namespace App\Services;

use App\Repositories\TeacherWorkspaceRepository;
use App\Repositories\LessonPlanRepository;
use App\Models\Homework;
use App\Models\HomeworkSubmission;
use App\Models\StudentClassAssignment;
use App\Models\User;

class TeacherWorkspaceService
{
    protected $workspaceRepository;
    protected $lessonPlanRepository;

    public function __construct(
        TeacherWorkspaceRepository $workspaceRepository,
        LessonPlanRepository $lessonPlanRepository
    ) {
        $this->workspaceRepository = $workspaceRepository;
        $this->lessonPlanRepository = $lessonPlanRepository;
    }

    /**
     * Compile teacher dashboard data.
     */
    public function getDashboardSummary($teacherId)
    {
        $dayOfWeek = now()->format('l'); // Sunday, Monday, etc.
        $todayClasses = $this->workspaceRepository->getTimetableSlotsForTeacher($teacherId, $dayOfWeek);
        
        $assignedSubjects = $this->workspaceRepository->getSubjectTeacherAssignments($teacherId);

        // Homework pending evaluation
        $subjectIds = $assignedSubjects->pluck('subject_id');
        $homeworks = Homework::whereIn('subject_id', $subjectIds)->get();
        
        $pendingSubmissions = HomeworkSubmission::whereIn('homework_id', $homeworks->pluck('id'))
            ->where('status', 'submitted')
            ->count();

        // Tasks / Alerts
        $alerts = [];
        if ($pendingSubmissions > 0) {
            $alerts[] = [
                'type' => 'grading_pending',
                'title' => 'Pending Evaluation',
                'message' => "You have {$pendingSubmissions} student assignment submissions waiting to be graded.",
            ];
        }

        if ($todayClasses->isEmpty()) {
            $alerts[] = [
                'type' => 'schedule_empty',
                'title' => 'No Classes Today',
                'message' => 'Your timetable indicates no scheduled classes for today.',
            ];
        }

        return [
            'success' => true,
            'data' => [
                'today_classes_count' => $todayClasses->count(),
                'assigned_subjects_count' => $assignedSubjects->count(),
                'pending_grading_count' => $pendingSubmissions,
                'today_schedule' => $todayClasses,
                'alerts' => $alerts,
                'ai_insights' => [
                    'Advisory: Class VIII-A Mathematics scores show a 10% lower average than expected. Suggest focusing Algebra exercises.',
                ]
            ]
        ];
    }

    /**
     * Resolve timetable slots for today.
     */
    public function getTodaySchedule($teacherId)
    {
        $dayOfWeek = now()->format('l');
        return $this->workspaceRepository->getTimetableSlotsForTeacher($teacherId, $dayOfWeek);
    }

    /**
     * Resolve timetable slots for the whole week.
     */
    public function getWeekSchedule($teacherId)
    {
        $slots = $this->workspaceRepository->getTimetableSlotsForTeacher($teacherId);
        
        // Group by day of week
        return $slots->groupBy('day_of_week');
    }

    /**
     * Manage Lesson Plans.
     */
    public function getLessonPlans($teacherId, array $filters = [])
    {
        return $this->lessonPlanRepository->getLessonPlansForTeacher($teacherId, $filters);
    }

    public function createLessonPlan(array $data)
    {
        $lessonPlan = $this->lessonPlanRepository->create([
            'teacher_id' => auth()->id(),
            'class_room_id' => $data['class_room_id'],
            'section_id' => $data['section_id'],
            'subject_id' => $data['subject_id'],
            'topic' => $data['topic'],
            'description' => $data['description'] ?? null,
            'date' => $data['date'],
            'status' => $data['status'] ?? 'planned',
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        return ['success' => true, 'data' => $lessonPlan];
    }

    public function updateLessonPlan($id, array $data)
    {
        $lessonPlan = $this->lessonPlanRepository->find($id);
        if (!$lessonPlan) {
            return ['success' => false, 'message' => 'Lesson plan not found.'];
        }

        $lessonPlan->update($data);

        return ['success' => true, 'data' => $lessonPlan];
    }

    /**
     * Get students list for daily class attendance grid.
     */
    public function getAttendanceGrid($classRoomId, $sectionId)
    {
        // Query active class allocations
        $assignments = StudentClassAssignment::with('student.user')
            ->where('class_room_id', $classRoomId)
            ->where('section_id', $sectionId)
            ->get();

        $studentsList = [];
        foreach ($assignments as $assign) {
            if ($assign->student) {
                $studentsList[] = [
                    'student_id' => $assign->student->id,
                    'user_id' => $assign->student->user_id,
                    'name' => $assign->student->user->name ?? '',
                    'roll_number' => $assign->roll_number,
                ];
            }
        }

        return [
            'success' => true,
            'data' => [
                'class_room_id' => $classRoomId,
                'section_id' => $sectionId,
                'students' => $studentsList,
            ]
        ];
    }
}
