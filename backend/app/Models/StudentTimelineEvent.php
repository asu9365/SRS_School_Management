<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentTimelineEvent extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'student_id',
        'event_type',
        'title',
        'description',
        'event_date',
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
