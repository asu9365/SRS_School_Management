<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskRegister extends Model
{
    use HasFactory;

    protected $table = 'risk_registers';

    protected $fillable = [
        'title',
        'description',
        'category',
        'risk_level',
        'status',
    ];
}
