<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostelRoomAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'hostel_room_id',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function room()
    {
        return $this->belongsTo(HostelRoom::class, 'hostel_room_id');
    }
}
