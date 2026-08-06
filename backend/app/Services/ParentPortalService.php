<?php

namespace App\Services;

use App\Repositories\ParentPortalRepository;
use App\Models\Attendance;
use App\Models\Homework;
use App\Models\HomeworkSubmission;
use App\Models\Mark;
use App\Models\User;

class ParentPortalService
{
    protected $parentPortalRepository;
    protected $student360Service;

    public function __construct(
        ParentPortalRepository $parentPortalRepository,
        Student360Service $student360Service
    ) {
        $this->parentPortalRepository = $parentPortalRepository;
        $this->student360Service = $student360Service;
    }

    /**
     * Get primary child student ID or validate requested student ID.
     */
    public function getValidStudentId($parentUserId, $requestedStudentId = null)
    {
        $students = $this->parentPortalRepository->getLinkedStudents($parentUserId);
        if ($students->isEmpty()) {
            return null;
        }

        if ($requestedStudentId) {
            $exists = $students->contains('id', $requestedStudentId);
            return $exists ? $requestedStudentId : null;
        }

        return $students->first()->id;
    }

    /**
     * Compile child dashboard attendance details.
     */
    public function getAttendanceSummary($studentId)
    {
        $student = \App\Models\Student::findOrFail($studentId);
        $userId = $student->user_id;

        $attendances = Attendance::where('user_id', $userId)->get();
        $totalDays = $attendances->count();

        $presentDays = 0;
        $lateDays = 0;
        $leaveDays = 0;
        $absentDays = 0;

        foreach ($attendances as $att) {
            $status = $att->status;
            if ($status === 'P' || $status === 'Present') {
                $presentDays++;
            } elseif ($status === 'L' || $status === 'Late') {
                $lateDays++;
            } elseif ($status === 'A' || $status === 'Absent') {
                $absentDays++;
            } else {
                $leaveDays++; // Approved Leave/Half-day
            }
        }

        $presentRate = $totalDays > 0 ? (($presentDays + ($lateDays * 0.8)) / $totalDays) * 100 : 100;

        return [
            'success' => true,
            'data' => [
                'percentage' => round($presentRate, 2),
                'present' => $presentDays,
                'late' => $lateDays,
                'absent' => $absentDays,
                'leave' => $leaveDays,
                'total' => $totalDays,
            ]
        ];
    }

    /**
     * Compile child dashboard homework assignment details.
     */
    public function getAssignmentSummary($studentId)
    {
        $student = \App\Models\Student::findOrFail($studentId);
        $classRoomId = $student->currentClassAssignment->class_room_id ?? null;
        $sectionId = $student->currentClassAssignment->section_id ?? null;

        $homeworkCount = 0;
        $submissionCount = 0;
        $lateSubmissions = 0;
        $pendingAssignments = [];

        if ($classRoomId && $sectionId) {
            $homeworks = Homework::where('class_room_id', $classRoomId)
                ->where('section_id', $sectionId)
                ->where('status', 'published')
                ->get();
            
            $homeworkCount = $homeworks->count();

            if ($homeworkCount > 0) {
                $submissions = HomeworkSubmission::where('student_id', $studentId)
                    ->whereIn('homework_id', $homeworks->pluck('id'))
                    ->get();
                
                $submissionCount = $submissions->whereIn('status', ['submitted', 'graded', 'returned'])->count();
                $lateSubmissions = $submissions->where('is_late', true)->count();

                // Find homeworks that do not have a submission yet
                $submittedHwIds = $submissions->pluck('homework_id')->toArray();
                $pending = $homeworks->whereNotIn('id', $submittedHwIds);
                
                foreach ($pending as $hw) {
                    $pendingAssignments[] = [
                        'id' => $hw->id,
                        'title' => $hw->title,
                        'subject' => $hw->subjectRelation->name ?? $hw->subject,
                        'due_date' => $hw->due_date ? $hw->due_date->toDateString() : null,
                    ];
                }
            }
        }

        return [
            'success' => true,
            'data' => [
                'total' => $homeworkCount,
                'completed' => $submissionCount,
                'late' => $lateSubmissions,
                'pending' => $pendingAssignments,
                'rate' => $homeworkCount > 0 ? round(($submissionCount / $homeworkCount) * 100, 2) : 100,
            ]
        ];
    }

    /**
     * Compile child academic result performance metrics.
     */
    public function getAssessmentSummary($studentId)
    {
        $student = \App\Models\Student::findOrFail($studentId);
        $userId = $student->user_id;

        $marks = Mark::where('user_id', $userId)->with('assessment')->get();
        $academicAverage = $marks->avg('marks_obtained') ?: 0;

        $subjectScores = [];
        $totalEarned = 0;
        $totalPossible = 0;

        foreach ($marks as $mark) {
            $subjectName = $mark->assessment->subjectRelation->name ?? 'Subject';
            $maxMarks = $mark->assessment->max_marks ?? 100;
            $percentage = $maxMarks > 0 ? ($mark->marks_obtained / $maxMarks) * 100 : 0;

            $totalEarned += $mark->marks_obtained;
            $totalPossible += $maxMarks;

            $subjectScores[] = [
                'subject' => $subjectName,
                'marks' => $mark->marks_obtained,
                'max_marks' => $maxMarks,
                'percentage' => round($percentage, 2),
            ];
        }

        $overallPercentage = $totalPossible > 0 ? ($totalEarned / $totalPossible) * 100 : 0;

        return [
            'success' => true,
            'data' => [
                'average' => round($academicAverage, 2),
                'percentage' => round($overallPercentage, 2),
                'subjects' => $subjectScores,
            ]
        ];
    }

    /**
     * Compile Student360 metrics details.
     */
    public function getStudent360Summary($studentId)
    {
        return $this->student360Service->getStudent360Summary($studentId);
    }

    /**
     * Compile child invoice details.
     */
    public function getFeesSummary($studentId)
    {
        // Placeholder returning basic fees status values as described in plan_enhance6
        return [
            'success' => true,
            'data' => [
                'total_due' => 12500,
                'paid' => 8500,
                'balance' => 4000,
                'status' => 'Pending Dues',
            ]
        ];
    }
}
