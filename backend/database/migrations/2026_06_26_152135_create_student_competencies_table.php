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
        Schema::create('student_competencies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('competency_id');
            $table->integer('score'); // 1-5
            $table->unsignedBigInteger('teacher_id');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('competency_id')->references('id')->on('competencies')->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_competencies');
    }
};
