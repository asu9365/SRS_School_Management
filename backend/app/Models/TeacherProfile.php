<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'bio',
        'skills',
        'portfolio_links',
    ];

    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'portfolio_links' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
