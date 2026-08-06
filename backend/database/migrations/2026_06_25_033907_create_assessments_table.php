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
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g. "Chapter 1 Quiz"
            $table->enum('type', ['Quiz', 'Class Test', 'Unit Test', 'Assignment', 'Practical', 'Project', 'Midterm', 'Final']);
            $table->string('class_id'); // e.g. "10-A"
            $table->string('subject'); // e.g. "Mathematics"
            $table->integer('max_marks');
            $table->date('exam_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
