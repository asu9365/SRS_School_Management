<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherObservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'observer_id',
        'score',
        'remarks',
        'observation_date',
    ];

    protected function casts(): array
    {
        return [
            'observation_date' => 'date',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function observer()
    {
        return $this->belongsTo(User::class, 'observer_id');
    }
}
