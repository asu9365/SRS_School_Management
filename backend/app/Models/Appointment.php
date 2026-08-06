<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use BelongsToSchool, HasFactory;

    protected $fillable = [
        'parent_id',
        'teacher_id',
        'status', // Pending, Approved, Rejected, Completed
        'scheduled_at',
        'meeting_link',
        'meeting_mode', // offline, online, telephone
        'notes',
        'action_items',
        'academic_session_id',
        'school_id',
        // Legacy guest fields
        'SName',
        'Class',
        'GName',
        'number',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
        ];
    }

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }

    public function actionItemsRelation()
    {
        return $this->hasMany(ActionItem::class, 'appointment_id');
    }
}
