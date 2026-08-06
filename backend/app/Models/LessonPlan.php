<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonPlan extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'teacher_id',
        'class_room_id',
        'section_id',
        'subject_id',
        'topic',
        'description',
        'date',
        'status', // planned, ongoing, completed
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
