<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcurementRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_name',
        'quantity',
        'estimated_cost',
        'status',
        'requested_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
