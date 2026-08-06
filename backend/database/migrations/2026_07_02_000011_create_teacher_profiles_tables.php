<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12.10: Teacher Profile & Professional Development
     */
    public function up(): void
    {
        if (!Schema::hasTable('teacher_profiles')) {
            Schema::create('teacher_profiles', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade'); // links to users who are teachers
                $table->text('bio')->nullable();
                $table->json('skills')->nullable();
                $table->json('portfolio_links')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_qualifications')) {
            Schema::create('teacher_qualifications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('degree');
                $table->string('institution');
                $table->integer('passing_year');
                $table->string('grade')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_training')) {
            Schema::create('teacher_training', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('course_name');
                $table->string('provider');
                $table->date('completion_date');
                $table->integer('hours')->default(0);
                $table->string('certificate_url')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_training');
        Schema::dropIfExists('teacher_qualifications');
        Schema::dropIfExists('teacher_profiles');
    }
};
