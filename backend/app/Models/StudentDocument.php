<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentDocument extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'student_id',
        'type',
        'title',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
        'notes',
        'uploaded_by',
        'school_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
