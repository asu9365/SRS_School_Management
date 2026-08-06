<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-02: Admissions Pipeline + Student 360 Timeline
     */
    public function up(): void
    {
        // Admission Enquiries Workflow
        Schema::create('admission_enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->string('guardian_name');
            $table->string('guardian_phone', 20);
            $table->string('guardian_email');
            $table->enum('status', ['enquiry', 'applied', 'approved', 'rejected'])->default('enquiry');
            $table->text('notes')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();
        });

        // Student Timeline Events (powers Student 360 timeline)
        Schema::create('student_timeline_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('event_type'); // e.g. admission, attendance, homework, behavior, promotion, document
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('event_date');
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_timeline_events');
        Schema::dropIfExists('admission_enquiries');
    }
};
