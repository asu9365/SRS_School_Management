<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClassAssignment extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'student_id',
        'class_room_id',
        'section_id',
        'academic_session_id',
        'roll_number',
        'school_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}
