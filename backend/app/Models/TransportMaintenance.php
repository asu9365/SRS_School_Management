<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportMaintenance extends Model
{
    use HasFactory;

    protected $table = 'transport_maintenances';

    protected $fillable = [
        'transport_vehicle_id',
        'maintenance_details',
        'cost',
        'date',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function vehicle()
    {
        return $this->belongsTo(TransportVehicle::class, 'transport_vehicle_id');
    }
}
