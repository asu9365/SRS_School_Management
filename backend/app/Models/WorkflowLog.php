<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'workflow_definition_id',
        'log_message',
    ];

    public function definition()
    {
        return $this->belongsTo(WorkflowDefinition::class, 'workflow_definition_id');
    }
}
