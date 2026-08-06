<?php

namespace App\Repositories;

use App\Models\HomeworkSubmission;

class HomeworkSubmissionRepository extends BaseRepository
{
    public function __construct(HomeworkSubmission $submission)
    {
        $this->model = $submission;
    }

    /**
     * Find a student submission for a homework task.
     */
    public function findRecord($homeworkId, $studentId)
    {
        return $this->model->where('homework_id', $homeworkId)
            ->where('student_id', $studentId)
            ->first();
    }

    /**
     * Get submissions for homework.
     */
    public function getSubmissionsForHomework($homeworkId)
    {
        return $this->model->with('student')
            ->where('homework_id', $homeworkId)
            ->get();
    }
}
