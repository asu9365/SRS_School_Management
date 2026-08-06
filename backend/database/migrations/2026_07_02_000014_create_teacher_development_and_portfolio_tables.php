<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12.10: Teacher Professional Development & Portfolio Databases
     */
    public function up(): void
    {
        if (!Schema::hasTable('teacher_certifications')) {
            Schema::create('teacher_certifications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('certification_name');
                $table->string('issuing_organization');
                $table->date('issue_date');
                $table->date('expiry_date')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_portfolios')) {
            Schema::create('teacher_portfolios', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('specialization');
                $table->integer('experience_years')->default(0);
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_awards')) {
            Schema::create('teacher_awards', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('award_name');
                $table->string('organization');
                $table->date('date_received');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_publications')) {
            Schema::create('teacher_publications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->string('title');
                $table->string('publisher');
                $table->date('publish_date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('teacher_development_plans')) {
            Schema::create('teacher_development_plans', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
                $table->text('goal_description');
                $table->date('target_date');
                $table->enum('status', ['pending', 'completed'])->default('pending');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_development_plans');
        Schema::dropIfExists('teacher_publications');
        Schema::dropIfExists('teacher_awards');
        Schema::dropIfExists('teacher_portfolios');
        Schema::dropIfExists('teacher_certifications');
    }
};
