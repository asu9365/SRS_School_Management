<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentWellbeing extends Model
{
    use HasFactory;

    protected $table = 'student_wellbeing';

    protected $fillable = [
        'student_id',
        'happiness_index',
        'social_index',
        'counselor_notes',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
