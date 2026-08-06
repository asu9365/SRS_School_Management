<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuardianDetail extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'student_id',
        'name',
        'relation',
        'phone',
        'email',
        'occupation',
        'address',
        'annual_income',
        'qualification',
        'is_primary',
        'user_id',
        'school_id',
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * The linked parent user account (if they have one).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
