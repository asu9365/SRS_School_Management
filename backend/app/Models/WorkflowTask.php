<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'workflow_definition_id',
        'title',
        'status',
    ];

    public function definition()
    {
        return $this->belongsTo(WorkflowDefinition::class, 'workflow_definition_id');
    }
}
