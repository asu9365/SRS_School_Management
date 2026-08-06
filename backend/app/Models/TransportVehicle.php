<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportVehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_number',
        'model',
        'capacity',
        'status',
    ];
}
