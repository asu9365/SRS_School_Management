<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-05: LMS / Homework & FR-11: Notices & FR-13: Parent Meeting (PTM)
     */
    public function up(): void
    {
        // 1. Enhance homework table
        Schema::table('homework', function (Blueprint $table) {
            if (!Schema::hasColumn('homework', 'class_room_id')) {
                $table->foreignId('class_room_id')->nullable()->constrained('class_rooms')->onDelete('cascade')->after('class_id');
            }
            if (!Schema::hasColumn('homework', 'section_id')) {
                $table->foreignId('section_id')->nullable()->constrained('sections')->onDelete('cascade')->after('class_room_id');
            }
            if (!Schema::hasColumn('homework', 'subject_id')) {
                $table->foreignId('subject_id')->nullable()->constrained('subjects')->onDelete('cascade')->after('section_id');
            }
            if (!Schema::hasColumn('homework', 'academic_session_id')) {
                $table->foreignId('academic_session_id')->nullable()->constrained('academic_sessions')->onDelete('cascade')->after('subject_id');
            }
            if (!Schema::hasColumn('homework', 'max_marks')) {
                $table->integer('max_marks')->default(100)->after('due_date');
            }
            if (!Schema::hasColumn('homework', 'category')) {
                $table->string('category')->default('Homework')->after('max_marks');
            }
            if (!Schema::hasColumn('homework', 'learning_objectives')) {
                $table->text('learning_objectives')->nullable()->after('category');
            }
            if (!Schema::hasColumn('homework', 'competencies_covered')) {
                $table->text('competencies_covered')->nullable()->after('learning_objectives');
            }
            if (!Schema::hasColumn('homework', 'submission_type')) {
                $table->enum('submission_type', ['online', 'offline', 'link'])->default('online')->after('competencies_covered');
            }
            if (!Schema::hasColumn('homework', 'status')) {
                $table->enum('status', ['draft', 'published', 'archived'])->default('published')->after('submission_type');
            }
            if (!Schema::hasColumn('homework', 'school_id')) {
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade')->after('status');
            }
        });

        // 2. Create homework_submissions table
        if (!Schema::hasTable('homework_submissions')) {
            Schema::create('homework_submissions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('homework_id')->constrained('homework')->onDelete('cascade');
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->dateTime('submission_date');
                $table->enum('status', ['submitted', 'graded', 'returned'])->default('submitted');
                $table->string('file_path')->nullable();
                $table->string('file_name')->nullable();
                $table->string('external_link')->nullable();
                $table->decimal('marks_obtained', 5, 2)->nullable();
                $table->string('grade')->nullable();
                $table->text('feedback')->nullable();
                $table->boolean('is_late')->default(false);
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
                $table->timestamps();

                $table->unique(['homework_id', 'student_id']);
            });
        }

        // 3. Enhance notices table
        Schema::table('notices', function (Blueprint $table) {
            if (!Schema::hasColumn('notices', 'category')) {
                $table->string('category')->default('general')->after('content');
            }
            if (!Schema::hasColumn('notices', 'priority')) {
                $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium')->after('category');
            }
            if (!Schema::hasColumn('notices', 'expiry_date')) {
                $table->dateTime('expiry_date')->nullable()->after('priority');
            }
            if (!Schema::hasColumn('notices', 'attachment_path')) {
                $table->string('attachment_path')->nullable()->after('expiry_date');
            }
            if (!Schema::hasColumn('notices', 'school_id')) {
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade')->after('attachment_path');
            }
        });

        // 4. Enhance appointments table (representing PTMs)
        Schema::table('appointments', function (Blueprint $table) {
            if (!Schema::hasColumn('appointments', 'academic_session_id')) {
                $table->foreignId('academic_session_id')->nullable()->constrained('academic_sessions')->onDelete('set null')->after('scheduled_at');
            }
            if (!Schema::hasColumn('appointments', 'meeting_mode')) {
                $table->enum('meeting_mode', ['offline', 'online', 'telephone'])->default('offline')->after('academic_session_id');
            }
            if (!Schema::hasColumn('appointments', 'action_items')) {
                $table->text('action_items')->nullable()->after('meeting_mode');
            }
            if (!Schema::hasColumn('appointments', 'school_id')) {
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade')->after('action_items');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropColumn(['academic_session_id', 'meeting_mode', 'action_items', 'school_id']);
        });

        Schema::table('notices', function (Blueprint $table) {
            $table->dropColumn(['category', 'priority', 'expiry_date', 'attachment_path', 'school_id']);
        });

        Schema::dropIfExists('homework_submissions');

        Schema::table('homework', function (Blueprint $table) {
            $table->dropColumn([
                'class_room_id', 'section_id', 'subject_id', 'academic_session_id',
                'max_marks', 'category', 'learning_objectives', 'competencies_covered',
                'submission_type', 'status', 'school_id'
            ]);
        });
    }
};
