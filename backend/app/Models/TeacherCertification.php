<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherCertification extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'certification_name',
        'issuing_organization',
        'issue_date',
        'expiry_date',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
            'expiry_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
