<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherAward extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'award_name',
        'organization',
        'date_received',
    ];

    protected function casts(): array
    {
        return [
            'date_received' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
