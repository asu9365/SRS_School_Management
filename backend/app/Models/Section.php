<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'name',
        'class_room_id',
        'capacity',
        'school_id',
    ];

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }

    public function classTeacherAssignment()
    {
        return $this->hasOne(ClassTeacherAssignment::class);
    }

    public function studentClassAssignments()
    {
        return $this->hasMany(StudentClassAssignment::class);
    }

    public function timetableSlots()
    {
        return $this->hasMany(TimetableSlot::class);
    }

    /**
     * Get enrolled student count for the current session.
     */
    public function getEnrolledCountAttribute(): int
    {
        $currentSession = AcademicSession::current()->first();
        if (!$currentSession) return 0;

        return $this->studentClassAssignments()
            ->where('academic_session_id', $currentSession->id)
            ->count();
    }
}
