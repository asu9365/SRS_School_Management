<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-03: Academic Structure Management
     * Core tables: academic_sessions, terms, class_rooms, sections, subjects
     */
    public function up(): void
    {
        // Academic Sessions (e.g., 2025-2026)
        Schema::create('academic_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "2025-2026"
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_current')->default(false);
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();
        });

        // Terms within a session (e.g., Term 1, Term 2)
        Schema::create('terms', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Term 1", "Mid-Term"
            $table->foreignId('academic_session_id')->constrained('academic_sessions')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->unsignedSmallInteger('sequence')->default(1); // ordering
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();
        });

        // Classes (e.g., Class 1, Class 10)
        Schema::create('class_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Class 10", "Grade 5"
            $table->unsignedSmallInteger('numeric_level'); // 1-12 for sorting
            $table->text('description')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['name', 'school_id']);
        });

        // Sections (e.g., Section A, Section B)
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "A", "B", "C"
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->unsignedSmallInteger('capacity')->default(40);
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['name', 'class_room_id']);
        });

        // Subjects (e.g., Mathematics, English)
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Mathematics"
            $table->string('code')->nullable(); // e.g., "MATH-10"
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->enum('type', ['core', 'elective', 'optional'])->default('core');
            $table->text('description')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['code', 'school_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('sections');
        Schema::dropIfExists('class_rooms');
        Schema::dropIfExists('terms');
        Schema::dropIfExists('academic_sessions');
    }
};
