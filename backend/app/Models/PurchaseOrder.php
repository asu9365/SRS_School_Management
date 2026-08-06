<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'details',
        'total_amount',
        'status',
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
