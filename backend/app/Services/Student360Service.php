<?php

namespace App\Services;

use App\Repositories\StudentTimelineRepository;
use App\Repositories\StudentAchievementRepository;
use App\Repositories\StudentInterventionRepository;
use App\Models\Student;
use App\Models\User;
use App\Models\Mark;
use App\Models\Attendance;
use App\Models\Homework;
use App\Models\HomeworkSubmission;
use App\Models\StudentCompetency;
use App\Models\BehaviorRecord;
use App\Models\Appointment;

class Student360Service
{
    protected $timelineRepository;
    protected $achievementRepository;
    protected $interventionRepository;
    protected $timelineService;

    public function __construct(
        StudentTimelineRepository $timelineRepository,
        StudentAchievementRepository $achievementRepository,
        StudentInterventionRepository $interventionRepository,
        TimelineService $timelineService
    ) {
        $this->timelineRepository = $timelineRepository;
        $this->achievementRepository = $achievementRepository;
        $this->interventionRepository = $interventionRepository;
        $this->timelineService = $timelineService;
    }

    /**
     * Compile student 360 profile and run Student Success Index (SSI) calculation.
     */
    public function getStudent360Summary($studentId)
    {
        $student = Student::with(['currentClassAssignment.classRoom', 'currentClassAssignment.section'])->findOrFail($studentId);
        $userId = $student->user_id;

        // 1. Academics (45% Weight)
        $marks = Mark::where('user_id', $userId)->with('assessment')->get();
        $academicAverage = $marks->avg('marks_obtained') ?: 0;
        
        // Scale to 0-100 based on assessment max marks if available
        $scaledAcademic = 0;
        $marksCount = $marks->count();
        if ($marksCount > 0) {
            $totalPossible = 0;
            $totalEarned = 0;
            foreach ($marks as $mark) {
                $maxMarks = $mark->assessment->max_marks ?? 100;
                $totalPossible += $maxMarks;
                $totalEarned += $mark->marks_obtained;
            }
            $scaledAcademic = $totalPossible > 0 ? ($totalEarned / $totalPossible) * 100 : 0;
        }

        // 2. Attendance (20% Weight)
        $attendances = Attendance::where('user_id', $userId)->get();
        $attendancePercentage = 0;
        $totalDays = $attendances->count();
        if ($totalDays > 0) {
            $presentValue = 0;
            foreach ($attendances as $att) {
                if ($att->status === 'P' || $att->status === 'Present') {
                    $presentValue += 1.0;
                } elseif ($att->status === 'L' || $att->status === 'Late') {
                    $presentValue += 0.8; // Late is partial presence
                } elseif ($att->status === 'HD' || $att->status === 'Half-Day') {
                    $presentValue += 0.5;
                }
            }
            $attendancePercentage = ($presentValue / $totalDays) * 100;
        }

        // 3. Assignment Completion Rate (10% Weight)
        // Find how many homework assignments apply to this student's class and section
        $classRoomId = $student->currentClassAssignment->class_room_id ?? null;
        $sectionId = $student->currentClassAssignment->section_id ?? null;

        $homeworkCount = 0;
        $submissionCount = 0;
        $assignmentCompletionRate = 0;

        if ($classRoomId && $sectionId) {
            $homeworks = Homework::where('class_room_id', $classRoomId)
                ->where('section_id', $sectionId)
                ->where('status', 'published')
                ->get();
            
            $homeworkCount = $homeworks->count();
            if ($homeworkCount > 0) {
                $submissions = HomeworkSubmission::where('student_id', $studentId)
                    ->whereIn('homework_id', $homeworks->pluck('id'))
                    ->whereIn('status', ['submitted', 'graded', 'returned'])
                    ->get();
                $submissionCount = $submissions->count();
                $assignmentCompletionRate = ($submissionCount / $homeworkCount) * 100;
            }
        }

        // 4. Competency Mastery (10% Weight)
        $competencies = StudentCompetency::where('student_id', $studentId)
            ->with(['competency', 'teacher'])
            ->get();
        $competencyMastery = 0;
        $compCount = $competencies->count();
        if ($compCount > 0) {
            // score is 1-5 scale
            $competencyMastery = ($competencies->avg('score') / 5) * 100;
        }

        // 5. Achievements (5% Weight)
        $achievements = $this->achievementRepository->getAchievementsForStudent($studentId);
        $achievementsCount = $achievements->count();
        $achievementScore = min(100, $achievementsCount * 20); // 5 certificates reaches 100%

        // 6. Behavior Score (5% Weight)
        $behaviorRecords = BehaviorRecord::where('student_id', $studentId)->get();
        $positiveBehaviorCount = $behaviorRecords->where('type', 'Positive')->count();
        $negativeBehaviorCount = $behaviorRecords->where('type', 'Needs Improvement')->count();
        
        $behaviorScore = 50 + ($positiveBehaviorCount * 10) - ($negativeBehaviorCount * 10);
        $behaviorScore = max(0, min(100, $behaviorScore));

        // 7. Parent Engagement Score (5% Weight)
        // Calculated via parent PTM appointments completion rate
        $ptmRecords = Appointment::where('parent_id', $userId)
            ->orWhereHas('parent', function ($q) use ($userId) {
                $q->where('id', $userId);
            })
            ->get();
        
        $ptmCount = $ptmRecords->count();
        $ptmCompleted = $ptmRecords->where('status', 'Completed')->count();
        $parentEngagementScore = $ptmCount > 0 ? ($ptmCompleted / $ptmCount) * 100 : 75; // Default 75% if no meetings scheduled yet

        // Composite SSI Calculation
        $successIndex = ($scaledAcademic * 0.45) +
                        ($attendancePercentage * 0.20) +
                        ($assignmentCompletionRate * 0.10) +
                        ($competencyMastery * 0.10) +
                        ($achievementScore * 0.05) +
                        ($behaviorScore * 0.05) +
                        ($parentEngagementScore * 0.05);

        // Risk Category mapping
        $riskCategory = 'Good';
        if ($successIndex >= 90) {
            $riskCategory = 'Outstanding';
        } elseif ($successIndex >= 75) {
            $riskCategory = 'Excellent';
        } elseif ($successIndex >= 60) {
            $riskCategory = 'Good';
        } elseif ($successIndex >= 40) {
            $riskCategory = 'Needs Improvement';
        } else {
            $riskCategory = 'High Risk';
        }

        // Timeline
        $timeline = $this->timelineRepository->getStudentTimeline($studentId);

        // Counselor Interventions
        $interventions = $this->interventionRepository->getInterventionsForStudent($studentId);

        return [
            'success' => true,
            'data' => [
                'student' => $student,
                'academics' => [
                    'marks' => $marks,
                    'average' => $academicAverage,
                    'score' => round($scaledAcademic, 2),
                ],
                'attendance' => [
                    'percentage' => round($attendancePercentage, 2),
                    'total' => $totalDays,
                ],
                'assignments' => [
                    'total' => $homeworkCount,
                    'completed' => $submissionCount,
                    'rate' => round($assignmentCompletionRate, 2),
                ],
                'competencies' => $competencies,
                'competencyScore' => round($competencyMastery, 2),
                'achievements' => $achievements,
                'behavior' => [
                    'positive' => $positiveBehaviorCount,
                    'negative' => $negativeBehaviorCount,
                    'score' => $behaviorScore,
                ],
                'parentEngagement' => [
                    'total_meetings' => $ptmCount,
                    'completed_meetings' => $ptmCompleted,
                    'score' => round($parentEngagementScore, 2),
                ],
                'successIndex' => round($successIndex, 2),
                'riskCategory' => $riskCategory,
                'interventions' => $interventions,
                'timeline' => $timeline,
            ]
        ];
    }

    /**
     * Add student achievement and trigger timeline log.
     */
    public function addAchievement(array $data)
    {
        $achievement = $this->achievementRepository->create([
            'student_id' => $data['student_id'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'category' => $data['category'],
            'event_date' => $data['event_date'],
            'certificate_path' => $data['certificate_path'] ?? null,
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        $this->timelineService->logEvent(
            $data['student_id'],
            'achievements',
            'Achievement Earned',
            "Earned certificate: '{$data['title']}' (Category: " . ucfirst($data['category']) . ")."
        );

        return ['success' => true, 'data' => $achievement];
    }

    /**
     * Record counselor intervention plan.
     */
    public function createIntervention(array $data)
    {
        $intervention = $this->interventionRepository->create([
            'student_id' => $data['student_id'],
            'goal' => $data['goal'],
            'assigned_to' => $data['assigned_to'] ?? auth()->id(),
            'status' => 'pending',
            'start_date' => $data['start_date'] ?? now()->toDateString(),
            'notes' => $data['notes'] ?? null,
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        $this->timelineService->logEvent(
            $data['student_id'],
            'counseling',
            'Intervention Scheduled',
            "Scheduled intervention goal: '{$data['goal']}'."
        );

        return ['success' => true, 'data' => $intervention];
    }

    /**
     * Update counselor intervention plan.
     */
    public function updateIntervention($id, array $data)
    {
        $intervention = $this->interventionRepository->find($id);
        if (!$intervention) {
            return ['success' => false, 'message' => 'Intervention record not found.'];
        }

        $intervention->update($data);

        if (!empty($data['status']) && $data['status'] === 'completed') {
            $intervention->update(['completion_date' => now()]);
            
            $this->timelineService->logEvent(
                $intervention->student_id,
                'counseling',
                'Intervention Completed',
                "Completed counselor intervention goal: '{$intervention->goal}'."
            );
        }

        return ['success' => true, 'data' => $intervention];
    }
}
