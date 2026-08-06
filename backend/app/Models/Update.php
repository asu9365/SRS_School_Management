<?php

namespace App\Models;

use App\Traits\BelongsToSchool;

use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    use BelongsToSchool;

    protected $fillable = ['user_id', 'class_id', 'content'];
}
