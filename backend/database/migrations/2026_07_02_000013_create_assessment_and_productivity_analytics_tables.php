<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12.9.3: Assessment & Productivity Analytics Database Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('assessment_analytics')) {
            Schema::create('assessment_analytics', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assessment_id')->constrained('assessments')->onDelete('cascade');
                $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
                $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
                $table->decimal('average_score', 5, 2)->default(0);
                $table->decimal('pass_rate', 5, 2)->default(0);
                $table->decimal('highest_score', 5, 2)->default(0);
                $table->decimal('lowest_score', 5, 2)->default(0);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('question_statistics')) {
            Schema::create('question_statistics', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assessment_id')->constrained('assessments')->onDelete('cascade');
                $table->string('question_number');
                $table->integer('correct_count')->default(0);
                $table->integer('incorrect_count')->default(0);
                $table->integer('skipped_count')->default(0);
                $table->string('difficulty_index')->default('Moderate');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('learning_outcomes')) {
            Schema::create('learning_outcomes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
                $table->string('outcome_code');
                $table->text('outcome_description');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('assessment_healths')) {
            Schema::create('assessment_healths', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assessment_id')->constrained('assessments')->onDelete('cascade');
                $table->decimal('health_score', 5, 2)->default(0);
                $table->string('label')->default('Good');
                $table->decimal('reliability_index', 5, 2)->default(0);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_productivities')) {
            Schema::create('teacher_productivities', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->integer('classes_conducted')->default(0);
                $table->integer('homework_published')->default(0);
                $table->integer('lessons_planned')->default(0);
                $table->integer('lessons_completed')->default(0);
                $table->decimal('compliance_percentage', 5, 2)->default(100);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_productivities');
        Schema::dropIfExists('assessment_healths');
        Schema::dropIfExists('learning_outcomes');
        Schema::dropIfExists('question_statistics');
        Schema::dropIfExists('assessment_analytics');
    }
};
