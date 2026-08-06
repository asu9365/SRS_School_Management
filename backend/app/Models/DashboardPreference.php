<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DashboardPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'theme',
        'widgets_enabled',
    ];

    protected function casts(): array
    {
        return [
            'widgets_enabled' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
