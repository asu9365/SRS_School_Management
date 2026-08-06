<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentIntervention extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'student_id',
        'goal',
        'assigned_to',
        'status', // pending, active, completed
        'start_date',
        'completion_date',
        'notes',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'completion_date' => 'date',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function assignedStaff()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
