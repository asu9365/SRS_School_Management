<?php

namespace App\Listeners;

use App\Events\StudentRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class InitializeStudent360 implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     */
    public function handle(StudentRegistered $event)
    {
        $student = $event->student;

        // Business Logic: Initialize Student360 metrics or dispatch welcome email
        Log::info("Student registered event handled for: {$student->Fname} {$student->Lname} (ID: {$student->id})");

        // Here we can initialize base behavior records, or dispatch templates
    }
}
