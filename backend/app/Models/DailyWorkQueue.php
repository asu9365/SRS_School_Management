<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyWorkQueue extends Model
{
    use HasFactory;

    protected $table = 'daily_work_queues';

    protected $fillable = [
        'title',
        'assigned_to',
        'priority',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
