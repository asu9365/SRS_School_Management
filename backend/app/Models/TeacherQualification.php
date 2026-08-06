<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherQualification extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'degree',
        'institution',
        'passing_year',
        'grade',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
