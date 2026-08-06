<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentAnalytic extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'class_room_id',
        'section_id',
        'average_score',
        'pass_rate',
        'highest_score',
        'lowest_score',
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
