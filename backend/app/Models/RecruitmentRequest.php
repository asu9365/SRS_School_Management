<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitmentRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'department',
        'status',
        'requested_date',
    ];

    protected function casts(): array
    {
        return [
            'requested_date' => 'date',
        ];
    }
}
