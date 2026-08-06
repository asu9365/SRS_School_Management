<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiWebhookLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'webhook_id',
        'payload',
        'response_status',
        'response_body',
    ];

    public function webhook()
    {
        return $this->belongsTo(ApiWebhook::class, 'webhook_id');
    }
}
