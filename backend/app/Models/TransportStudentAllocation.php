<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportStudentAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'transport_route_id',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function route()
    {
        return $this->belongsTo(TransportRoute::class, 'transport_route_id');
    }
}
