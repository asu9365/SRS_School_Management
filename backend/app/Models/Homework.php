<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use BelongsToSchool, HasFactory;

    protected $table = 'homework';

    protected $fillable = [
        'user_id', // creator (teacher)
        'class_id', // legacy string support
        'class_room_id',
        'section_id',
        'subject_id',
        'academic_session_id',
        'subject', // legacy string support
        'title',
        'description',
        'due_date',
        'max_marks',
        'category',
        'learning_objectives',
        'competencies_covered',
        'submission_type',
        'status',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function subjectRelation()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function submissions()
    {
        return $this->hasMany(HomeworkSubmission::class);
    }
}
