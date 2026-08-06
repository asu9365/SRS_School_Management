<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'prompt',
        'model',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function response()
    {
        return $this->hasOne(AiResponse::class, 'request_id');
    }
}
