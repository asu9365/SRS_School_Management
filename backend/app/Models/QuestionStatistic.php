<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionStatistic extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'question_number',
        'correct_count',
        'incorrect_count',
        'skipped_count',
        'difficulty_index',
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}
