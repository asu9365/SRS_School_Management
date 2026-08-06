<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'passing_criteria_percentage',
        'attendance_lock_hours',
        'grade_scale',
    ];
}
