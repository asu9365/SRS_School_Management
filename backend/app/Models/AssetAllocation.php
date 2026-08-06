<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'item_name',
        'quantity',
        'allocated_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'allocated_at' => 'datetime',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
}
