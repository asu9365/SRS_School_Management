<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'name',
        'numeric_level',
        'description',
        'school_id',
    ];

    public function sections()
    {
        return $this->hasMany(Section::class, 'class_room_id');
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class, 'class_room_id');
    }

    public function classTeacherAssignments()
    {
        return $this->hasMany(ClassTeacherAssignment::class, 'class_room_id');
    }

    public function studentClassAssignments()
    {
        return $this->hasMany(StudentClassAssignment::class, 'class_room_id');
    }

    public function timetableSlots()
    {
        return $this->hasMany(TimetableSlot::class, 'class_room_id');
    }

    /**
     * Get the display name with section count.
     */
    public function getFullNameAttribute(): string
    {
        return $this->name . ' (' . $this->sections()->count() . ' sections)';
    }
}
