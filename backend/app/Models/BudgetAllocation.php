<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_name',
        'fiscal_year',
        'allocated_amount',
        'spent_amount',
    ];
}
