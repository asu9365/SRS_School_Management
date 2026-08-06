<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentHealth extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'health_score',
        'label',
        'reliability_index',
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}
