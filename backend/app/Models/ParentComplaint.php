<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentComplaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'subject',
        'description',
        'status',
        'resolved_at',
    ];

    protected function casts(): array
    {
        return [
            'resolved_at' => 'datetime',
        ];
    }

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
}
