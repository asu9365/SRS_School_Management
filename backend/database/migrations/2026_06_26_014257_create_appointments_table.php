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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('teacher_id')->nullable()->constrained('teachers')->onDelete('cascade');
            $table->string('status')->default('Pending'); // Pending, Approved, Rejected, Completed
            $table->dateTime('scheduled_at')->nullable();
            $table->string('meeting_link')->nullable();
            $table->text('notes')->nullable();
            
            // Legacy fields for backward compatibility if needed, or if guest users book
            $table->string('SName')->nullable();
            $table->string('Class')->nullable();
            $table->string('GName')->nullable();
            $table->string('number')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
