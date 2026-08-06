<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'name',
        'code',
        'class_room_id',
        'type',
        'description',
        'school_id',
    ];

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }

    public function subjectTeacherAssignments()
    {
        return $this->hasMany(SubjectTeacherAssignment::class);
    }

    public function timetableSlots()
    {
        return $this->hasMany(TimetableSlot::class);
    }
}
