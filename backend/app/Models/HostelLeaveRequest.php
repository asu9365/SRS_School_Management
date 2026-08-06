<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostelLeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'reason',
        'start_date',
        'end_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
