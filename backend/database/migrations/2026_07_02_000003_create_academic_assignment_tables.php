<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-03: Academic Assignment Tables
     * Teacher-class, teacher-subject, student-class assignments + timetable
     */
    public function up(): void
    {
        // Class Teacher Assignment (one teacher per section)
        Schema::create('class_teacher_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('academic_session_id')->constrained('academic_sessions')->onDelete('cascade');
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['class_room_id', 'section_id', 'academic_session_id'], 'class_teacher_unique');
        });

        // Subject Teacher Assignment
        Schema::create('subject_teacher_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('academic_session_id')->constrained('academic_sessions')->onDelete('cascade');
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(
                ['subject_id', 'class_room_id', 'section_id', 'academic_session_id'],
                'subject_teacher_unique'
            );
        });

        // Student Class Assignment (which student is in which class/section)
        Schema::create('student_class_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
            $table->foreignId('academic_session_id')->constrained('academic_sessions')->onDelete('cascade');
            $table->string('roll_number')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(
                ['student_id', 'academic_session_id'],
                'student_class_session_unique'
            );
        });

        // Timetable Slots
        Schema::create('timetable_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->enum('day', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
            $table->time('start_time');
            $table->time('end_time');
            $table->string('room_number')->nullable();
            $table->foreignId('academic_session_id')->constrained('academic_sessions')->onDelete('cascade');
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timetable_slots');
        Schema::dropIfExists('student_class_assignments');
        Schema::dropIfExists('subject_teacher_assignments');
        Schema::dropIfExists('class_teacher_assignments');
    }
};
