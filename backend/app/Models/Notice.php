<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'title',
        'content',
        'category',
        'priority',
        'target_roles',
        'publish_date',
        'expiry_date',
        'attachment_path',
        'school_id',
    ];
    
    protected function casts(): array
    {
        return [
            'target_roles' => 'array',
            'publish_date' => 'datetime',
            'expiry_date' => 'datetime',
        ];
    }
}
