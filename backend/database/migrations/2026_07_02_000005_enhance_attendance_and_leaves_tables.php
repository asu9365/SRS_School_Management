<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-04: Attendance and Leave Management
     */
    public function up(): void
    {
        // Recreate attendances table with normalized foreign keys
        Schema::dropIfExists('attendances');

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
            $table->date('date');
            $table->enum('status', ['P', 'A', 'L', 'HD', 'ML', 'AL', 'OD', 'H', 'W'])->default('P');
            $table->text('remarks')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['user_id', 'date']);
        });

        // Teacher Attendance
        Schema::create('teacher_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->enum('status', ['Present', 'Absent', 'Leave', 'Half-Day', 'Official-Duty', 'Training', 'Holiday'])->default('Present');
            $table->text('remarks')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['teacher_id', 'date']);
        });

        // Leave Applications
        Schema::create('leave_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['medical', 'casual', 'sick', 'personal', 'other'])->default('casual');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('reason');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('remarks')->nullable();
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_applications');
        Schema::dropIfExists('teacher_attendances');
        Schema::dropIfExists('attendances');
    }
};
