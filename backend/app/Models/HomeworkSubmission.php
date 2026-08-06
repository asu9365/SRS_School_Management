<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeworkSubmission extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'homework_id',
        'student_id',
        'submission_date',
        'status',
        'file_path',
        'file_name',
        'external_link',
        'marks_obtained',
        'grade',
        'feedback',
        'is_late',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'submission_date' => 'datetime',
            'is_late' => 'boolean',
        ];
    }

    public function homework()
    {
        return $this->belongsTo(Homework::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
