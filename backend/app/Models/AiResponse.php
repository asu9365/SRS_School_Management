<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'response_content',
        'response_time_ms',
    ];

    public function request()
    {
        return $this->belongsTo(AiRequest::class, 'request_id');
    }
}
