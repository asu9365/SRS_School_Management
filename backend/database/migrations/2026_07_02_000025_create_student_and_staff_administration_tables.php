<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.2: Administration Workspace - Student & Staff Administration Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('student_promotions')) {
            Schema::create('student_promotions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->foreignId('from_class_id')->constrained('class_rooms')->onDelete('cascade');
                $table->foreignId('to_class_id')->constrained('class_rooms')->onDelete('cascade');
                $table->timestamp('promoted_at')->useCurrent();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('employee_service_histories')) {
            Schema::create('employee_service_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
                $table->string('designation');
                $table->string('department');
                $table->date('start_date');
                $table->date('end_date')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('user_permissions')) {
            Schema::create('user_permissions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('permission_name');
                $table->boolean('is_granted')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('elective_subjects')) {
            Schema::create('elective_subjects', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
                $table->string('status')->default('Enrolled');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('elective_subjects');
        Schema::dropIfExists('user_permissions');
        Schema::dropIfExists('employee_service_histories');
        Schema::dropIfExists('student_promotions');
    }
};
