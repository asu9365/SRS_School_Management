<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowSla extends Model
{
    use HasFactory;

    protected $table = 'workflow_sla';

    protected $fillable = [
        'workflow_definition_id',
        'escalation_hours',
        'priority',
    ];

    public function definition()
    {
        return $this->belongsTo(WorkflowDefinition::class, 'workflow_definition_id');
    }
}
