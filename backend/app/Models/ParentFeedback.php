<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentFeedback extends Model
{
    use HasFactory;

    protected $table = 'parent_feedbacks';

    protected $fillable = [
        'parent_id',
        'message',
        'rating',
        'status',
    ];

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
}
