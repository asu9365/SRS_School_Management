<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeatMatrix extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_room_id',
        'capacity',
        'filled_seats',
    ];

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }
}
