<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequisition extends Model
{
    use HasFactory;

    protected $fillable = [
        'requested_by',
        'details',
        'budget_code',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
