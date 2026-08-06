<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiWebhook extends Model
{
    use HasFactory;

    protected $fillable = [
        'target_url',
        'event_type',
        'is_active',
        'secret',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function logs()
    {
        return $this->hasMany(ApiWebhookLog::class, 'webhook_id');
    }
}
