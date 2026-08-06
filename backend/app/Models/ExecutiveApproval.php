<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExecutiveApproval extends Model
{
    use HasFactory;

    protected $fillable = [
        'requested_by',
        'action_name',
        'status',
        'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'approved_at' => 'datetime',
        ];
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
