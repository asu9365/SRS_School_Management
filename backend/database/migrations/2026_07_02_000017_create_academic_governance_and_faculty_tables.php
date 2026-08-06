<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.2: Principal Workspace - Academic Governance & Faculty Observation Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('academic_policies')) {
            Schema::create('academic_policies', function (Blueprint $table) {
                $table->id();
                $table->integer('passing_criteria_percentage')->default(40);
                $table->integer('attendance_lock_hours')->default(24);
                $table->string('grade_scale')->default('10-point Scale');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('curriculum_plans')) {
            Schema::create('curriculum_plans', function (Blueprint $table) {
                $table->id();
                $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
                $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
                $table->integer('total_lessons')->default(150);
                $table->date('target_completion_date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('curriculum_progress')) {
            Schema::create('curriculum_progress', function (Blueprint $table) {
                $table->id();
                $table->foreignId('plan_id')->constrained('curriculum_plans')->onDelete('cascade');
                $table->integer('lessons_completed')->default(0);
                $table->date('actual_completion_date')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('department_statistics')) {
            Schema::create('department_statistics', function (Blueprint $table) {
                $table->id();
                $table->string('department_name');
                $table->integer('faculty_count')->default(0);
                $table->decimal('average_gpa', 4, 2)->default(0.00);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_observations')) {
            Schema::create('teacher_observations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->foreignId('observer_id')->constrained('users')->onDelete('cascade');
                $table->decimal('score', 4, 2)->default(0.00);
                $table->text('remarks');
                $table->date('observation_date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_promotions')) {
            Schema::create('teacher_promotions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('from_role');
                $table->string('to_role');
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->text('recommendation_notes')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_promotions');
        Schema::dropIfExists('teacher_observations');
        Schema::dropIfExists('department_statistics');
        Schema::dropIfExists('curriculum_progress');
        Schema::dropIfExists('curriculum_plans');
        Schema::dropIfExists('academic_policies');
    }
};
