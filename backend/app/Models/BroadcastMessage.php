<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BroadcastMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'title',
        'message',
        'target_audience',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
