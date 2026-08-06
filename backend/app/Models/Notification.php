<?php

namespace App\Models;

use App\Traits\BelongsToSchool;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use BelongsToSchool;

    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'data' => 'array',
    ];
}
