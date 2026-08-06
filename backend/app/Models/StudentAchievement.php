<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAchievement extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'student_id',
        'title',
        'description',
        'category', // academic, sports, cultural, technical
        'event_date',
        'certificate_path',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
