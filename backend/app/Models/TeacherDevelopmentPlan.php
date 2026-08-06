<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherDevelopmentPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'goal_description',
        'target_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'target_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
