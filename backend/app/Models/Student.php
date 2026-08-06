<?php

namespace App\Models;

use App\Traits\BelongsToSchool;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use BelongsToSchool, HasFactory;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'DOB' => 'date',
            'admission_date' => 'date',
            'leaving_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Guardian details (multiple guardians per student).
     */
    public function guardians()
    {
        return $this->hasMany(GuardianDetail::class);
    }

    /**
     * Primary guardian.
     */
    public function primaryGuardian()
    {
        return $this->hasOne(GuardianDetail::class)->where('is_primary', true);
    }

    /**
     * Uploaded documents.
     */
    public function documents()
    {
        return $this->hasMany(StudentDocument::class);
    }

    /**
     * Class assignments across sessions.
     */
    public function classAssignments()
    {
        return $this->hasMany(StudentClassAssignment::class);
    }

    /**
     * Current class assignment.
     */
    public function currentClassAssignment()
    {
        return $this->hasOne(StudentClassAssignment::class)
            ->whereHas('academicSession', fn($q) => $q->where('is_current', true));
    }

    /**
     * Get the full name.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->Fname . ' ' . ($this->Mname ?? '') . ' ' . $this->Lname);
    }

    // --- Scopes ---

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }
}
