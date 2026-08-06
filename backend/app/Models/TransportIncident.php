<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportIncident extends Model
{
    use HasFactory;

    protected $fillable = [
        'transport_vehicle_id',
        'description',
        'severity',
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
