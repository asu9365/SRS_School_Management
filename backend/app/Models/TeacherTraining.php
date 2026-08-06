<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherTraining extends Model
{
    use HasFactory;

    protected $table = 'teacher_training';

    protected $fillable = [
        'teacher_id',
        'course_name',
        'provider',
        'completion_date',
        'hours',
        'certificate_url',
    ];

    protected function casts(): array
    {
        return [
            'completion_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
