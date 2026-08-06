<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-10: Student360 Achievements & Counselor Interventions
     */
    public function up(): void
    {
        // 1. Create student_achievements table if not exists
        if (!Schema::hasTable('student_achievements')) {
            Schema::create('student_achievements', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('category'); // academic, sports, cultural, technical
                $table->date('event_date');
                $table->string('certificate_path')->nullable();
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
                $table->timestamps();
            });
        }

        // 2. Create student_interventions table if not exists
        if (!Schema::hasTable('student_interventions')) {
            Schema::create('student_interventions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->string('goal');
                $table->foreignId('assigned_to')->constrained('users')->onDelete('cascade'); // staff member
                $table->enum('status', ['pending', 'active', 'completed'])->default('pending');
                $table->date('start_date');
                $table->date('completion_date')->nullable();
                $table->text('notes')->nullable();
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_interventions');
        Schema::dropIfExists('student_achievements');
    }
};
