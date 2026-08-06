<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeServiceHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'designation',
        'department',
        'start_date',
        'end_date',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
