<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfrastructureAsset extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_name',
        'category',
        'status',
        'location',
    ];

    public function maintenanceRequests()
    {
        return $this->hasMany(MaintenanceRequest::class, 'asset_id');
    }
}
