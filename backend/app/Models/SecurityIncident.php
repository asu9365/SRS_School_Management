<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityIncident extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'severity',
        'reported_at',
    ];

    protected function casts(): array
    {
        return [
            'reported_at' => 'datetime',
        ];
    }
}
