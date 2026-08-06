<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherPromotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'from_role',
        'to_role',
        'status',
        'recommendation_notes',
    ];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
