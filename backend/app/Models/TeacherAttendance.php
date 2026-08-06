<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherAttendance extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'teacher_id',
        'date',
        'status',
        'remarks',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
