<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12: Teacher Workspace - Lesson Plans
     */
    public function up(): void
    {
        if (!Schema::hasTable('lesson_plans')) {
            Schema::create('lesson_plans', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade'); // links to users who are teachers
                $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
                $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
                $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
                $table->string('topic');
                $table->text('description')->nullable();
                $table->date('date');
                $table->enum('status', ['planned', 'ongoing', 'completed'])->default('planned');
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
        Schema::dropIfExists('lesson_plans');
    }
};
