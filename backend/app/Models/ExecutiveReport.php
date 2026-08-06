<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExecutiveReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'file_path',
        'file_size',
        'generated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
