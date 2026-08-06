<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tables = [
            'users', 'students', 'teachers', 'appointments', 
            'attendances', 'assessments', 'marks', 'notices', 
            'updates', 'homework', 'messages', 'notifications',
            'competencies', 'student_competencies', 'portfolio_items', 'behavior_records'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName) && !Schema::hasColumn($tableName, 'school_id')) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = [
            'users', 'students', 'teachers', 'appointments', 
            'attendances', 'assessments', 'marks', 'notices', 
            'updates', 'homework', 'messages', 'notifications',
            'competencies', 'student_competencies', 'portfolio_items', 'behavior_records'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName)) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropForeign(['school_id']);
                    $table->dropColumn('school_id');
                });
            }
        }
    }
};
