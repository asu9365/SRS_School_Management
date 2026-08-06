<?php

namespace App\Services;

use App\Repositories\HomeworkRepository;
use App\Repositories\HomeworkSubmissionRepository;
use App\Models\Student;

class LmsService
{
    protected $homeworkRepository;
    protected $submissionRepository;
    protected $timelineService;

    public function __construct(
        HomeworkRepository $homeworkRepository,
        HomeworkSubmissionRepository $submissionRepository,
        TimelineService $timelineService
    ) {
        $this->homeworkRepository = $homeworkRepository;
        $this->submissionRepository = $submissionRepository;
        $this->timelineService = $timelineService;
    }

    /**
     * Create a new homework / assignment task.
     */
    public function createHomework(array $data)
    {
        $homework = $this->homeworkRepository->create([
            'user_id' => auth()->id(),
            'class_room_id' => $data['class_room_id'] ?? null,
            'section_id' => $data['section_id'] ?? null,
            'subject_id' => $data['subject_id'] ?? null,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'due_date' => $data['due_date'] ?? null,
            'max_marks' => $data['max_marks'] ?? 100,
            'category' => $data['category'] ?? 'Homework',
            'learning_objectives' => $data['learning_objectives'] ?? null,
            'competencies_covered' => $data['competencies_covered'] ?? null,
            'submission_type' => $data['submission_type'] ?? 'online',
            'status' => $data['status'] ?? 'published',
            'school_id' => auth()->user()->school_id ?? null,
            // Legacy fallbacks
            'class_id' => $data['class_id'] ?? null,
            'subject' => $data['subject'] ?? 'N/A',
        ]);

        return ['success' => true, 'data' => $homework];
    }

    /**
     * Submit homework solution by a student.
     */
    public function submitHomework($homeworkId, array $data, $file = null)
    {
        $student = Student::where('user_id', auth()->id())->first();
        if (!$student) {
            return ['success' => false, 'message' => 'Only registered student profiles can submit assignments.'];
        }

        $homework = $this->homeworkRepository->find($homeworkId);
        if (!$homework) {
            return ['success' => false, 'message' => 'Homework assignment not found.'];
        }

        $isLate = false;
        if ($homework->due_date && now()->isAfter($homework->due_date)) {
            $isLate = true;
        }

        $filePath = null;
        $fileName = null;
        if ($file) {
            $filePath = $file->store('homework-submissions/' . $homeworkId, 'public');
            $fileName = $file->getClientOriginalName();
        }

        $submission = $this->submissionRepository->updateOrCreate(
            [
                'homework_id' => $homeworkId,
                'student_id' => $student->id,
            ],
            [
                'submission_date' => now(),
                'status' => 'submitted',
                'file_path' => $filePath,
                'file_name' => $fileName,
                'external_link' => $data['external_link'] ?? null,
                'is_late' => $isLate,
                'school_id' => auth()->user()->school_id ?? null,
            ]
        );

        // Log timeline event
        $lateText = $isLate ? " (LATE Submission)" : "";
        $this->timelineService->logEvent(
            $student->id,
            'homework',
            'Homework Submitted',
            "Submitted solution for '{$homework->title}'{$lateText}."
        );

        return ['success' => true, 'data' => $submission];
    }

    /**
     * Evaluate/Grade homework submission.
     */
    public function gradeSubmission($submissionId, array $data)
    {
        $submission = $this->submissionRepository->find($submissionId);
        if (!$submission) {
            return ['success' => false, 'message' => 'Submission record not found.'];
        }

        $submission->update([
            'status' => 'graded',
            'marks_obtained' => $data['marks_obtained'],
            'grade' => $data['grade'] ?? null,
            'feedback' => $data['feedback'] ?? null,
        ]);

        // Log timeline event
        $this->timelineService->logEvent(
            $submission->student_id,
            'homework',
            'Homework Graded',
            "Awarded {$data['marks_obtained']}/{$submission->homework->max_marks} marks for '{$submission->homework->title}'."
        );

        return ['success' => true, 'data' => $submission];
    }
}
