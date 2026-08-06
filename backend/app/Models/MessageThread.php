<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageThread extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'thread_id');
    }
}
