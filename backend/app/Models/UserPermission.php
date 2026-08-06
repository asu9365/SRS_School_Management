<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'permission_name',
        'is_granted',
    ];

    protected function casts(): array
    {
        return [
            'is_granted' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
