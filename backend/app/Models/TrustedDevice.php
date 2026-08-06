<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrustedDevice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'device_name',
        'ip_address',
        'is_trusted',
    ];

    protected function casts(): array
    {
        return [
            'is_trusted' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
