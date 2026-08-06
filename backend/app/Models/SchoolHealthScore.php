<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolHealthScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'overall_score',
        'academic_index',
        'operations_index',
        'recorded_at',
    ];

    protected function casts(): array
    {
        return [
            'recorded_at' => 'datetime',
        ];
    }
}
