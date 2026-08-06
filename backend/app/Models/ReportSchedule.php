<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_definition_id',
        'recipient_email',
        'cron_expression',
        'status',
    ];

    public function definition()
    {
        return $this->belongsTo(ReportDefinition::class, 'report_definition_id');
    }
}
