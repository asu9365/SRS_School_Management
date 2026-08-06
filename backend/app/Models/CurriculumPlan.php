<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurriculumPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'class_room_id',
        'total_lessons',
        'target_completion_date',
    ];

    protected function casts(): array
    {
        return [
            'target_completion_date' => 'date',
        ];
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function progress()
    {
        return $this->hasMany(CurriculumProgress::class, 'plan_id');
    }
}
