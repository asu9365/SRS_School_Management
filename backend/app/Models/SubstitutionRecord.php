<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubstitutionRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'substitute_teacher_id',
        'class_room_id',
        'date',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function substituteTeacher()
    {
        return $this->belongsTo(Teacher::class, 'substitute_teacher_id');
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }
}
