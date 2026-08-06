<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentStatistic extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_name',
        'faculty_count',
        'average_gpa',
    ];
}
