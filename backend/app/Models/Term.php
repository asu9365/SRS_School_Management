<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Term extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'name',
        'academic_session_id',
        'start_date',
        'end_date',
        'sequence',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}
