<?php

namespace App\Events;

use App\Models\Student;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StudentRegistered
{
    use Dispatchable, SerializesModels;

    /**
     * @var Student
     */
    public $student;

    /**
     * Create a new event instance.
     */
    public function __construct(Student $student)
    {
        $this->student = $student;
    }
}
