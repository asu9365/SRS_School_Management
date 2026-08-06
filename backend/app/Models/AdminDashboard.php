<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminDashboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'theme',
        'layout_preferences',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
