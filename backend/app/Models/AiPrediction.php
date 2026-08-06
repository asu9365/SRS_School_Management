<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiPrediction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category',
        'description',
        'confidence_score',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
