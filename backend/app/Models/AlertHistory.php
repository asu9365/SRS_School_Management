<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlertHistory extends Model
{
    use HasFactory;

    protected $table = 'alert_history';

    protected $fillable = [
        'event_name',
        'description',
        'severity',
        'status',
    ];
}
