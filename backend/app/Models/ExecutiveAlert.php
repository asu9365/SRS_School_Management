<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExecutiveAlert extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'message',
        'is_resolved',
    ];

    protected function casts(): array
    {
        return [
            'is_resolved' => 'boolean',
        ];
    }
}
