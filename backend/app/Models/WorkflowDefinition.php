<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowDefinition extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'trigger_event',
        'status',
    ];
}
