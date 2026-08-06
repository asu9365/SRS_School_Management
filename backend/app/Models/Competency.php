<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competency extends Model
{
    use HasFactory, BelongsToSchool;
    protected $guarded = [];
}
