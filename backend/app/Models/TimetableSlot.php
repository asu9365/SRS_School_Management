<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimetableSlot extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'class_room_id',
        'section_id',
        'subject_id',
        'teacher_id',
        'day',
        'start_time',
        'end_time',
        'room_number',
        'academic_session_id',
        'school_id',
    ];

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}
