<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibraryIssueRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'library_book_id',
        'student_id',
        'issued_at',
        'return_due_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
            'return_due_date' => 'date',
        ];
    }

    public function book()
    {
        return $this->belongsTo(LibraryBook::class, 'library_book_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
