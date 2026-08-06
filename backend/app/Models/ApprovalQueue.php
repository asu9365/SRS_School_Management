<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApprovalQueue extends Model
{
    use HasFactory;

    protected $table = 'approval_queues';

    protected $fillable = [
        'type',
        'description',
        'status',
        'requested_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
