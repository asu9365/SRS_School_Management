<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'recipient_id',
        'title',
        'message',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }
}
