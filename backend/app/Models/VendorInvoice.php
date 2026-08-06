<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_order_id',
        'invoice_number',
        'amount',
        'status',
    ];

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }
}
