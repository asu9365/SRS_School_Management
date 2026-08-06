<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'title',
        'type',
        'class_id', // legacy string
        'class_room_id',
        'section_id',
        'subject', // legacy string
        'subject_id',
        'academic_session_id',
        'max_marks',
        'exam_date',
        'status', // draft, published
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'exam_date' => 'date',
        ];
    }

    public function marks()
    {
        return $this->hasMany(Mark::class);
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

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}
