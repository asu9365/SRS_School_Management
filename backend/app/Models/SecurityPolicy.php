<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_name',
        'description',
        'value',
        'is_enabled',
    ];

    protected function casts(): array
    {
        return [
            'is_enabled' => 'boolean',
        ];
    }
}
