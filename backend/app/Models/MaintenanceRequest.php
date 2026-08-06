<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'description',
        'status',
        'reported_by',
    ];

    public function asset()
    {
        return $this->belongsTo(InfrastructureAsset::class, 'asset_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }
}
