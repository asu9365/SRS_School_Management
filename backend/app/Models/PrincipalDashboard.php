<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrincipalDashboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'layout_config',
    ];

    protected function casts(): array
    {
        return [
            'layout_config' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
