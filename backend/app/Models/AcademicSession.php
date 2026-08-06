<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicSession extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_current',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
        ];
    }

    public function terms()
    {
        return $this->hasMany(Term::class)->orderBy('sequence');
    }

    public function classTeacherAssignments()
    {
        return $this->hasMany(ClassTeacherAssignment::class);
    }

    public function subjectTeacherAssignments()
    {
        return $this->hasMany(SubjectTeacherAssignment::class);
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
     * Scope to get the current active session.
     */
    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }
}
