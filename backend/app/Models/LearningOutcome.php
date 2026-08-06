<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningOutcome extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'outcome_code',
        'outcome_description',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
