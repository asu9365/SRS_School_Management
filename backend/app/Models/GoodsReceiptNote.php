<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoodsReceiptNote extends Model
{
    use HasFactory;

    protected $table = 'goods_receipt_notes';

    protected $fillable = [
        'purchase_order_id',
        'received_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'received_date' => 'date',
        ];
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }
}
