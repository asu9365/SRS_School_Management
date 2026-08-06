<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurriculumProgress extends Model
{
    use HasFactory;

    protected $table = 'curriculum_progress';

    protected $fillable = [
        'plan_id',
        'lessons_completed',
        'actual_completion_date',
    ];

    protected function casts(): array
    {
        return [
            'actual_completion_date' => 'date',
        ];
    }

    public function plan()
    {
        return $this->belongsTo(CurriculumPlan::class, 'plan_id');
    }
}
