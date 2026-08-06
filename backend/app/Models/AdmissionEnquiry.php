<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionEnquiry extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'class_room_id',
        'guardian_name',
        'guardian_phone',
        'guardian_email',
        'status',
        'notes',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
        ];
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }
}
