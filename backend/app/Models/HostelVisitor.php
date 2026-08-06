<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostelVisitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'visitor_name',
        'relationship',
        'visit_date',
    ];

    protected function casts(): array
    {
        return [
            'visit_date' => 'date',
        ];
    }

    public function resident()
    {
        return $this->belongsTo(Student::class, 'resident_id');
    }
}
