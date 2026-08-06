<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12.5: Enhance assessments with normalized class, section, subject, and session relationships.
     */
    public function up(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            if (!Schema::hasColumn('assessments', 'class_room_id')) {
                $table->foreignId('class_room_id')->nullable()->constrained('class_rooms')->onDelete('cascade')->after('class_id');
            }
            if (!Schema::hasColumn('assessments', 'section_id')) {
                $table->foreignId('section_id')->nullable()->constrained('sections')->onDelete('cascade')->after('class_room_id');
            }
            if (!Schema::hasColumn('assessments', 'subject_id')) {
                $table->foreignId('subject_id')->nullable()->constrained('subjects')->onDelete('cascade')->after('section_id');
            }
            if (!Schema::hasColumn('assessments', 'academic_session_id')) {
                $table->foreignId('academic_session_id')->nullable()->constrained('academic_sessions')->onDelete('cascade')->after('subject_id');
            }
            if (!Schema::hasColumn('assessments', 'status')) {
                $table->enum('status', ['draft', 'published'])->default('published')->after('exam_date');
            }
            if (!Schema::hasColumn('assessments', 'school_id')) {
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade')->after('status');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->dropColumn([
                'class_room_id', 'section_id', 'subject_id', 'academic_session_id', 'status', 'school_id'
            ]);
        });
    }
};
