<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentRiskProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'risk_level',
        'risk_factors',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
