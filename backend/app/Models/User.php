<?php

namespace App\Models;

use App\Traits\BelongsToSchool;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use BelongsToSchool, HasFactory, Notifiable, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'school_id',
        'phone',
        'avatar',
        'is_active',
        'failed_login_attempts',
        'locked_until',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'failed_login_attempts',
        'locked_until',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'locked_until' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    // --- Profile Relationships ---

    public function studentProfile()
    {
        return $this->hasOne(Student::class);
    }

    public function teacherProfile()
    {
        return $this->hasOne(Teacher::class);
    }

    // --- Academic Relationships ---

    /**
     * Classes where this user is the class teacher.
     */
    public function classTeacherAssignments()
    {
        return $this->hasMany(ClassTeacherAssignment::class, 'teacher_id');
    }

    /**
     * Subjects assigned to this teacher.
     */
    public function subjectTeacherAssignments()
    {
        return $this->hasMany(SubjectTeacherAssignment::class, 'teacher_id');
    }

    /**
     * Timetable slots for this teacher.
     */
    public function timetableSlots()
    {
        return $this->hasMany(TimetableSlot::class, 'teacher_id');
    }

    // --- Account Locking ---

    /**
     * Check if the account is currently locked.
     */
    public function isLocked(): bool
    {
        return $this->locked_until !== null && $this->locked_until->isFuture();
    }

    /**
     * Increment failed login attempts and lock if threshold reached.
     */
    public function incrementFailedAttempts(): void
    {
        $this->increment('failed_login_attempts');

        if ($this->failed_login_attempts >= 5) {
            $this->update([
                'locked_until' => now()->addMinutes(30),
            ]);
        }
    }

    /**
     * Reset failed login attempts on successful login.
     */
    public function resetFailedAttempts(): void
    {
        $this->update([
            'failed_login_attempts' => 0,
            'locked_until' => null,
        ]);
    }
}

