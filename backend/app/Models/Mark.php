<?php

namespace App\Models;

use App\Traits\BelongsToSchool;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    use BelongsToSchool;

    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'user_id',
        'marks_obtained',
        'teacher_feedback',
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
