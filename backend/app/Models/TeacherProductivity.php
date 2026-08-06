<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherProductivity extends Model
{
    use HasFactory;

    protected $table = 'teacher_productivities';

    protected $fillable = [
        'teacher_id',
        'classes_conducted',
        'homework_published',
        'lessons_planned',
        'lessons_completed',
        'compliance_percentage',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
