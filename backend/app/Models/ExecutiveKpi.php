<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExecutiveKpi extends Model
{
    use HasFactory;

    protected $fillable = [
        'kpi_name',
        'category',
        'value',
    ];
}
