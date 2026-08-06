<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherPublication extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'title',
        'publisher',
        'publish_date',
    ];

    protected function casts(): array
    {
        return [
            'publish_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
