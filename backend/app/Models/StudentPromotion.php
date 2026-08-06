<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPromotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'from_class_id',
        'to_class_id',
        'promoted_at',
    ];

    protected function casts(): array
    {
        return [
            'promoted_at' => 'datetime',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
