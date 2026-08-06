<?php

namespace App\Models;

use App\Traits\BelongsToSchool;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use BelongsToSchool;

    use HasFactory;

    protected $fillable = [
        'user_id',
        'class_id',
        'date',
        'status',
        'remarks',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
