<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherPortfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'specialization',
        'experience_years',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
